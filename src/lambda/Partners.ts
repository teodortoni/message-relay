import { Handler, Context } from "aws-lambda"
import PartnersController, { EventParams } from "../controllers/Partners"
import { formattedResponse } from "../util/Response"

export const partners: Handler = async (event: any, context: Context) => {
  console.log(event)
  const partnersController = new PartnersController({
    identifier: event.pathParameters ? event.pathParameters.proxy : null,
    body: JSON.parse(event.body),
  })
  let result,
    message,
    status = 200

  try {
    switch (event.httpMethod) {
      case "GET":
        if (event.pathParameters.proxy === "types") {
          result = await partnersController.getPartnersTypes()
          message = result || "No types available"
        } else {
          result = await partnersController.getPartner()
          message = result || `No partner found with identifier: ${event.pathParameters.proxy}`
        }
        break
      case "POST":
        message = await partnersController.createPartner()
        break
      case "PUT":
        message = await partnersController.updatePartner()
        break
      case "DELETE":
        message = await partnersController.deletePartner()
        break

      default:
        status = 404
        throw new Error("404 Not found")
    }
  } catch (error) {
    message = error.message
    status = status !== 200 ? status : 500
  }

  return formattedResponse({
    message,
    status,
  })
}
