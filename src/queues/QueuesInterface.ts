import { APIGatewayProxyEvent, SQSEvent } from "aws-lambda"
import { MessageBodyType } from "src/types/ValidatorTypes"

export default interface QueuesInterface {
  sendMessage(event: MessageBodyType)
  processMessages(event: SQSEvent)
}
