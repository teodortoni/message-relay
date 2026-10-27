import { APIGatewayProxyResult } from "aws-lambda"

export type FormattedResponseType = {
  message: object
  status: number
}

/**
 * Returns the correctly formatted response that is necessary for any lambda function.
 * Without the formatted response the lambda function will return a "Internal Server Error"
 * @param responseData
 */
export const formattedResponse = (responseData: FormattedResponseType): APIGatewayProxyResult => {
  const { message, status } = responseData
  return {
    statusCode: status,
    body: JSON.stringify(message),
  }
}
