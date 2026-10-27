import { Context, Handler } from "aws-lambda"

/**
 * This handler is mainly used for testing purposes
 * Acts as the destination url that returns a 202 response
 * @param event The event triggered by the Api Gateway Endpoint
 * @param context The context sent by the Api Gateway Endpoint
 */
export const destination: Handler = async (event: any, context: Context) => {
  console.log("Event: ", event)
  console.log("Message: ", event.body)
  console.log("Context: ", context)
  return {
    statusCode: 202,
    body: JSON.stringify(event.body),
  }
}
