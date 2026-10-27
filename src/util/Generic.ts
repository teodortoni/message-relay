/**
 * This returns gets the IP address of the user that triggered the Api Gateway Endpoint event
 * @param event The triggered event from the Api Gateway Endpoint
 */
export const getIp = (event: any): string | void => {
  try {
    return event.requestContext.identity.sourceIp
  } catch (error) {
    console.error(`Method: getIp, error: `, error.stack)
  }
}
