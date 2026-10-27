import { SQSHandler, SQSEvent, Context } from "aws-lambda"
import Messages from "../queues/Messages"
import FailedMessages from "../queues/FailedMessages"

const messagesQueue = new Messages()
const failedMessagesQueue = new FailedMessages()

/**
 * This is the handler of the processor lambda function
 * @param event The event triggered from the queue
 * @param context The context sent from the queue
 */
export const processor: SQSHandler = async (event: SQSEvent, context: Context): Promise<void> => {
  try {
    await messagesQueue.processMessages(event)
  } catch (error) {
    if (error.retryMessage) {
      await failedMessagesQueue.sendMessage(error.retryMessage)
    } else {
      console.error("[Processor] Error: ", error)
    }
  }
}
