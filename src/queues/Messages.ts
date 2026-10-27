import AWS from "aws-sdk"
import QueuesInterface from "./QueuesInterface"
import { SQSEvent, SQSRecord } from "aws-lambda"
import { MessageParamsType, DeleteMessageParamsType } from "../types/QueueTypes"
import { MessageBodyType } from "../types/ValidatorTypes"
import axios from "axios"
import PartnerValidator from "../util/PartnerValidator"
import * as _ from "lodash"
import { ErrorException } from "../util/ErrorException"
import MessagesRepository from "../database/MessagesRepository"
import FailedMessagesRepository from "../database/FailedMessagesRepository"
import { Partner } from "../database/PartnersRepository"

export default class Messages implements QueuesInterface {
  /**
   * Sets SQS Object
   */
  private sqs = new AWS.SQS({
    apiVersion: process.env.AWS_SQS_API_VERSION,
    region: process.env.AWS_SQS_REGION,
    endpoint: `https://sqs.${process.env.AWS_SQS_REGION}.amazonaws.com`,
  })

  /**
   * Set queueUrl from QUEUE_URL environment variable
   * This variable is defined during serverless deploy under "environment" section of serverless.yml
   */
  private queueUrl = process.env.QUEUE_URL ? process.env.QUEUE_URL : ""

  /**
   * Set Queue Delay of a message in seconds (300 seconds = 5 minutes)
   */
  private queueDelay = 0

  /**
   * 'Content-Type': 'application/json' should always be present
   */
  private httpHeaders = { "Content-Type": "application/json" }

  /**
   * Single record iterated from event.Records sent by the queue
   * Contains the body with the message
   */
  private eventRecordBody

  /**
   * Single record iterated from partner's destination section
   * Contains destination host, path and headers
   */
  private destination

  /**
   * Destination partner endpoint where message will be sent
   */
  private destinationPartnerEndpoint

  /**
   * Final message that will be sent to the destination partner endpoint
   */
  private destinationMessage

  /**
   * Partner validator
   */
  private partnerValidator = new PartnerValidator()

  /**
   * sendMessage method sends the message to message-relay-messages queue
   * @param message partner message to send to queue
   * @param delay represents delivery delay in seconds that range from 0 - 900 (15 mins max)
   */
  async sendMessage(message: MessageBodyType) {
    try {
      console.log("[Queues/Messages] Message: ", message)
      const messageParams: MessageParamsType = {
        MessageBody: JSON.stringify(message),
        DelaySeconds: this.queueDelay,
        QueueUrl: this.queueUrl,
      }

      const response = await this.sqs.sendMessage(messageParams).promise()

      console.log("[Queues/Messages] Queue Send Message Response: ", response)
      return response.MessageId
    } catch (error) {
      throw ErrorException({
        message: error,
        status: 500,
        retryMessage: null,
      })
    }
  }

  /**
   * deleteMessage method delete the message from message-relay-messages queue
   */
  async deleteMessage() {
    try {
      console.log("[Queues/Messages] Message: ", this.eventRecordBody)
      const messageParams: DeleteMessageParamsType = {
        QueueUrl: this.queueUrl,
        ReceiptHandle: this.eventRecordBody.receiptHandle,
      }

      const response = await this.sqs.deleteMessage(messageParams).promise()

      console.log("[Queues/Messages] Queue Delete Message Response: ", response)
      // return response.MessageId
    } catch (error) {
      throw ErrorException({
        message: error,
        status: 500,
        retryMessage: null,
      })
    }
  }

  /**
   * processMessages method receives the records sent from queue, iterates over them
   * and processes each record message by validating the partner and sends the
   * message in the record to the destination partner
   * @param event
   */
  async processMessages(event: SQSEvent) {
    try {
      console.time("[Queues/Messages] ProcessMessageDuration")
      console.log("[Queues/Messages] Event Records: ", event.Records)
      for (const eventRecord of event.Records) {
        this.eventRecordBody =
          typeof JSON.parse(eventRecord.body) === "string"
            ? JSON.parse(JSON.parse(eventRecord.body))
            : JSON.parse(eventRecord.body)
        this.eventRecordBody.receiptHandle = eventRecord.receiptHandle

        // If count received is greater than 3 don't process message and delete from queue
        if (parseInt(eventRecord.attributes.ApproximateReceiveCount, 10) > 3) {
          // For MP-4331
          // Instead of deleting the message either send it to failedMessagesQueue or
          // Put it on a counter per partner so I can measure how many messages failed
          // for the particular partner during the threshold interval

          await this.deleteMessage()
          continue
        }

        await this.processDestinationPartner()
      }
      console.timeEnd("[Queues/Messages] ProcessMessageDuration")
    } catch (error) {
      // If any error with failed message throw ErrorException so message is sent to failures queue
      if (error.retryMessage) {
        console.error(error.message)
        await this.storeFailedMessageToDatabase(error.retryMessage)
        throw ErrorException(error)
      } else {
        console.log(error)
      }
    }
  }

  private async processDestinationPartner() {
    // Validate Destination Partner per Record
    const partner: Partner = await this.partnerValidator.setMessage(this.eventRecordBody).validate()

    for (const destination of partner.destination) {
      this.destination = destination
      await this.setDestinationMessage()
    }

    // Store message to database
    await this.storeSuccessfulMessageToDatabase()

    // Delete message from queue
    await this.deleteMessage()
  }

  private async setDestinationMessage() {
    const { data }: MessageBodyType = this.eventRecordBody

    this.destinationMessage = data
    console.log("[Queues/Messages] Destination Message: ", this.destinationMessage)

    await this.setDestinationPartnerHttpHeaders()
  }

  private async setDestinationPartnerHttpHeaders() {
    if (this.destination.header) {
      _.assign(this.httpHeaders, JSON.parse(this.destination.header))
    }
    console.log("[Queues/Messages] Headers: ", this.httpHeaders)

    await this.setDestinationPartnerEndpoint()
  }

  private async setDestinationPartnerEndpoint() {
    this.destinationPartnerEndpoint = `https://${this.destination.host}${this.destination.path}`
    console.log(`[Queues/Messages] Destination Partner URL: ${this.destinationPartnerEndpoint}`)

    await this.sendDestinationMessageToDestinationPartner()
  }

  private async sendDestinationMessageToDestinationPartner() {
    try {
      const response = await axios({
        method: "post",
        url: this.destinationPartnerEndpoint,
        data: this.destinationMessage,
        headers: this.httpHeaders,
      })
      console.log(
        `[Queues/Messages] Request status: ${response.status}, Request status text: ${response.statusText}`
      )
      // If response status is not 202 (accepted) or 200 (success) send message back to queue for retry
      if (![202, 200].includes(response.status)) {
        await this.reSendMessageToQueueForRetry()
      }
    } catch (error) {
      console.log("[Queues/Messages] Error: ", error)
      // If an error happened during post request send message back to queue for retry
      await this.reSendMessageToQueueForRetry()
    }
  }

  private async reSendMessageToQueueForRetry() {
    this.queueDelay = process.env.AWS_SQS_MESSAGE_DELAY
      ? parseInt(process.env.AWS_SQS_MESSAGE_DELAY, 10)
      : 300
    const MessageID = await this.sendMessage(this.eventRecordBody)
    console.log(
      `[Queues/Messages] Message sent to ${this.queueUrl} successfully. MessageId: ${MessageID}`
    )
  }

  /**
   * Stores message in "messages" table of mysql db
   * @param body SQSEvent record body (includes the message)
   */
  async storeSuccessfulMessageToDatabase() {
    try {
      const { msgid, type, version, data, sourceIp } = this.eventRecordBody

      const repository = new MessagesRepository()

      await repository.store({ msgid, type, version, data }, sourceIp)
    } catch (error) {
      console.error("[Queues/Messages] Method: storeSuccessfulMessageToDatabase. ", error)
    }
  }

  /**
   * Stores message in "messages" table of mysql db
   * @param body SQSEvent record body (includes the message)
   */
  async storeFailedMessageToDatabase(body: string) {
    try {
      const { msgid, type, version, data, sourceIp } =
        typeof JSON.parse(body) === "string" ? JSON.parse(JSON.parse(body)) : JSON.parse(body)

      const repository = new FailedMessagesRepository()

      await repository.store({ msgid, type, version, data }, sourceIp)
    } catch (error) {
      console.error("[Queues/Messages] Method: storeFailedMessageToDatabase. ", error)
    }
  }
}
