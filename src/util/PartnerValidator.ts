import { MessageBodyType } from "../types/ValidatorTypes"
import { ErrorException } from "./ErrorException"
import PartnersController from "../controllers/Partners"

export default class PartnerValidator {
  /**
   * Message coming from the queue
   */
  private message: any = undefined

  /**
   * Partner
   */
  private partner: any = undefined

  /**
   * Sets class variable message
   * @param message
   */
  setMessage(message: MessageBodyType) {
    this.message = message
    return this
  }
  /**
   * Validates the message sent and the partner on the bases of "type" and "version"
   * Returns the partner if valid and undefined if not
   * @param message
   */
  async validate() {
    try {
      await this.throwEmptyMessageError()
      return this.partner
    } catch (error) {
      throw ErrorException({
        message: error.message,
        status: error.status || 500,
        retryMessage: error.retryMessage || null,
      })
    }
  }

  private async throwEmptyMessageError() {
    if (this.message === null) {
      throw ErrorException({
        message: "[PartnerValidator] Method: throwEmptyMessage. No event body provided",
        status: 500,
        retryMessage: null,
      })
    }

    await this.validateRequiredParams()
  }

  private async validateRequiredParams() {
    const required = ["msgid", "type", "version", "data"]
    for (const el of required) {
      if (!this.message.hasOwnProperty(el)) {
        throw ErrorException({
          message: `[PartnerValidator] Method: validateRequiredParams. No "${el}" property provided in event.body, Event Body: ${JSON.stringify(
            this.message
          )}`,
          status: 500,
          retryMessage: JSON.stringify(this.message),
        })
      }
    }

    await this.verifyPartner()
  }

  private async verifyPartner() {
    const partnersController = new PartnersController({ identifier: this.message.type, body: {} })
    this.partner = await partnersController.getPartner()
    if (this.partner === undefined) {
      throw ErrorException({
        message: `[PartnerValidator] Method: verifyPartner. Partner with type "${this.message.type}" does not exist in the database. Aborting.`,
        status: 500,
        retryMessage: JSON.stringify(this.message),
      })
    }

    this.verifyPartnerVersion()
  }

  verifyPartnerVersion() {
    if (this.partner.version !== this.message.version) {
      throw ErrorException({
        message: `[PartnerValidator] Method: verifyPartnerVersion. This version: "${this.message.version}" is not supportted by this API.`,
        status: 500,
        retryMessage: JSON.stringify(this.message),
      })
    }
  }
}
