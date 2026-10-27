import { formattedResponse } from "../util/Response"
import PartnersRepository, { Partner, PartnerBody } from "../database/PartnersRepository"
import * as _ from "lodash"

const partnerRepo = new PartnersRepository()

export type EventParams = {
  identifier: string
  body: object | any
}

export default class PartnersController {
  /**
   * Partner identifier (could be id or type)
   */
  identifier: string

  /**
   * Partner body provided to create or update a partner
   */
  body: PartnerBody

  constructor(params: EventParams) {
    this.identifier = params.identifier
    this.body = params.body
  }

  /**
   * Throws an error if identifier is not set
   */
  private throwErrorIfNoIdentifier() {
    if (!this.identifier) {
      throw new Error("No identifier provided.")
    }
  }

  /**
   * Throws an error if body is not set
   */
  private throwErrorIfNoBody() {
    if (!this.body) {
      throw new Error("No parameters provided.")
    }
  }

  /**
   * Throws error if required params are not provided
   */
  private throwErrorIfNoRequiredBodyParams() {
    const required = ["type", "version", "destination"]
    for (const el of required) {
      if (!this.body.hasOwnProperty(el) || _.isEmpty(this.body[el])) {
        throw new Error(`Parameter ${el} is required.`)
      }
    }
  }

  /**
   * Retrieves partners types
   */
  async getPartnersTypes(): Promise<Partner> {
    return await partnerRepo.getPartnersTypes()
  }

  /**
   * Retrieves partner by id or type
   */
  async getPartner(): Promise<Partner> {
    this.throwErrorIfNoIdentifier()
    return await partnerRepo.setIdentifierAndField(this.identifier).getPartnerByIdOrType()
  }

  /**
   * Creates partner
   */
  async createPartner() {
    this.throwErrorIfNoBody()
    this.throwErrorIfNoRequiredBodyParams()
    return await partnerRepo.store(this.body)
  }

  /**
   * Updates partner
   */
  async updatePartner() {
    this.throwErrorIfNoIdentifier()
    this.throwErrorIfNoBody()
    return await partnerRepo
      .setIdentifierAndField(this.identifier)
      .setUpdateParams(this.body)
      .processPartnerUpdate()
  }

  /**
   * Deletes partner
   */
  async deletePartner() {
    this.throwErrorIfNoIdentifier()
    return await partnerRepo.setIdentifierAndField(this.identifier).processPartnerDelete()
  }
}
