import { Context, Handler } from "aws-lambda"
import * as _ from "lodash"
import { formattedResponse } from "../util/Response"
import { getIp } from "../util/Generic"
import Messages from "../queues/Messages"

const messagesQueue = new Messages()

/**
 * This is the handler of the receiver lambda function
 * @param event The event triggered from the Api Gateway Endpoint
 * @param context The context sent from the Api Gateway Endpoint
 */
export const receiver: Handler = async (event: any, context: Context) => {
  try {
    const sourceIp = getIp(event)
    console.log("[Receiver] Message sent from IP: ", sourceIp)

    throwEmptyBodyError(event.body)

    const eventBody = JSON.parse(event.body)
    eventBody.sourceIp = sourceIp

    const messageId = await messagesQueue.sendMessage(eventBody)

    const message = {
      receivedTime: new Date().toTimeString(),
      sourceIp,
      messageId,
    }

    return formattedResponse({ message, status: 200 })
  } catch (error) {
    console.log("[Receiver], Handler: receiver. ", error)
    return formattedResponse({ message: error.message, status: error.status })
  }
}

const throwEmptyBodyError = (body) => {
  if (!body || body === null) {
    throw new Error("Message body is empty.")
  }
}
