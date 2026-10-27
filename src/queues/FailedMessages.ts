import AWS from "aws-sdk"
import QueuesInterface from "./QueuesInterface"
import { SQSEvent } from "aws-lambda"
import { MessageParamsType } from "../types/QueueTypes"
import { ErrorException } from "../util/ErrorException"
import { MessageBodyType } from "src/types/ValidatorTypes"

export default class FailedMessages implements QueuesInterface {
  // SQS Object
  private sqs = new AWS.SQS({
    apiVersion: process.env.AWS_SQS_API_VERSION,
    region: process.env.AWS_SQS_REGION,
    endpoint: `https://sqs.${process.env.AWS_SQS_REGION}.amazonaws.com`,
  })

  /**
   * Set queueUrl from QUEUE_FAILURES_URL environment variable
   * This variable is defined during serverless deploy under "environment" section of serverless.yml
   */
  private queueUrl = process.env.QUEUE_FAILURES_URL || ""

  /**
   * Set Queue Delay of a message in seconds (300 seconds = 5 minutes)
   */
  private queueDelay = 0

  /**
   * sendMessage method sends the message to message-relay-messages-failures queue
   * @param message partner message to send to queue
   * @param delay represents delivery delay in seconds that range from 0 - 900 (15 mins max)
   */
  async sendMessage(message: MessageBodyType) {
    try {
      console.log("[Queues/FailedMessages] Failed Message: ", message)
      const messageParams: MessageParamsType = {
        MessageBody: JSON.stringify(message),
        DelaySeconds: this.queueDelay,
        QueueUrl: this.queueUrl,
      }

      const response = await this.sqs.sendMessage(messageParams).promise()
      console.log(
        `[Queues/FailedMessages] Failed message sent to ${this.queueUrl} successfully. MessageID: ${response.MessageId}`
      )
    } catch (error) {
      throw ErrorException({
        message: error,
        status: 500,
        retryMessage: null,
      })
    }
  }

  /**
   * processMessage method will process the message records (tbd)
   * @param event
   */
  async processMessages(event: SQSEvent) {
    // try {
    //     console.log('Event Records: ', event.Records)
    //     for (const record of event.Records) {
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
  }
}
