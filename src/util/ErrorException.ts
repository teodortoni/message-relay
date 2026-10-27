export type ErrorExceptionType = {
  message: string
  status: number
  retryMessage: string | null
}

/**
 * This method is used to create an ErrorException to be used when needed throughout this project
 * @param data
 */
export const ErrorException = (data: ErrorExceptionType) => {
  const { message, status, retryMessage } = data
  return {
    error: true,
    message,
    status,
    retryMessage,
  }
}
