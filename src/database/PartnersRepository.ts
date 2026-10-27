import { createConnection } from "./Client"
import { v4 as uuid } from "uuid"
import * as _ from "lodash"
import { DateTime } from "aws-sdk/clients/devicefarm"

export type PartnerBody = {
  type: string
  version: string
  destination: object
  sync: string
  syncdel: string
}

export type Partner = {
  id: string
  type: string
  version: string
  destination: object | any
  sync: string
  syncdel: string
  created_at: DateTime
  updated_at: DateTime
}

export default class PartnersRepository {
  /**
   * Database client connection
   */
  private connection

  /**
   * Partner record
   */
  private partner: Partner = {
    id: "",
    type: "",
    version: "",
    destination: "",
    sync: "",
    syncdel: "",
    created_at: new Date(),
    updated_at: new Date(),
  }

  /**
   * The database entity this repository manages
   */
  private entity = "partners"

  /**
   * Entity's field
   */
  private field: string = ""

  /**
   * Partner identifier (id or type)
   */
  private identifier: string = ""

  /**
   * Parameters to update partner record
   */
  private updateParams: PartnerBody = {
    type: "",
    version: "",
    destination: {},
    sync: "",
    syncdel: "",
  }

  /**
   * Specifies the action taken against the entity partners
   * Ex. get, update, create, delete
   */
  private entityAction: string = ""

  /**
   * Returns partners types
   */
  async getPartnersTypes() {
    try {
      this.connection = await createConnection()
      const [results] = await this.connection.execute(
        `SELECT type FROM partners GROUP BY type ORDER BY type ASC;`
      )
      this.connection.end()
      return _.map(results, (res) => {
        return res.type
      })
    } catch (error) {
      this.connection.end()
      console.error("[PartnersRepository] Method: getPartnersTypes. ", error)
    }
  }

  /**
   * Sets class variables identifier and field
   * @param identifier Partner identifier (id or type)
   */
  setIdentifierAndField(identifier: string) {
    this.identifier = identifier
    this.field = /^([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)$/i.test(identifier) ? "id" : "type"
    return this
  }

  /**
   * Sets parameters to update partner record
   * @param updateParams Parameters to update partner
   */
  setUpdateParams(updateParams: PartnerBody) {
    this.updateParams = updateParams
    return this
  }

  /**
   * Returns partner record or undefined
   */
  private async partnerExists(): Promise<void> {
    const [
      partner,
    ] = await this.connection.execute(`SELECT * FROM ${this.entity} WHERE ${this.field}= ?`, [
      this.identifier,
    ])
    this.partner = _.head(partner)
  }

  /**
   *
   * @param identifier Can be the partner ID or Type
   */
  async getPartnerByIdOrType(): Promise<Partner> {
    try {
      this.connection = await createConnection()
      await this.partnerExists()
      await this.connection.end()
      return this.partner
    } catch (error) {
      await this.connection.end()
      console.error("[PartnersRepository] Method: getById. ", error)
      return error
    }
  }

  /**
   * Stores partner in partners table
   * @param partner
   */
  async store(partner: PartnerBody) {
    try {
      this.connection = await createConnection()
      const { type, version, destination, sync, syncdel } = partner
      const [
        result,
      ] = await this.connection.execute(
        `INSERT INTO ${this.entity} (id, type, version, destination, sync, syncdel) VALUES (?, ?, ?, ?, ?, ?);`,
        [uuid(), type, version, destination, sync, syncdel]
      )

      console.log("[PartnersRepository] Partner Stored In DB with data", partner)
      await this.connection.end()
      return result.affectedRows === 1
        ? "Partner created successfully."
        : "Partner could not be created."
    } catch (error) {
      await this.connection.end()
      console.error("[PartnersRepository] Method: store. ", error)
      if (error.code === "ER_DUP_ENTRY") {
        return `Partner with type ${partner.type} already exists.`
      }
      return error.message
    }
  }

  /**
   * Returns array of new update parameters
   * @param partner Partner to be updated
   */
  private getUpdateParams() {
    const { type, version, destination, sync, syncdel } = this.updateParams
    return [
      type || this.partner.type,
      version || this.partner.version,
      destination || this.partner.destination,
      sync || this.partner.sync,
      syncdel || this.partner.syncdel,
      this.identifier,
    ]
  }

  /**
   * Updates partner by id or type
   */
  async processPartnerUpdate() {
    try {
      this.connection = await createConnection()
      await this.verifyPartner()
      return await this.updatePartner()
    } catch (error) {
      await this.connection.end()
      console.error("[PartnersRepository] Method: updatePartnerByIdOrType. ", error)
      return error.message
    }
  }

  private async verifyPartner() {
    await this.partnerExists()
    if (!this.partner) {
      throw new Error(`No partner found with identifier: ${this.identifier}`)
    }
  }

  private async updatePartner() {
    const [result] = await this.connection.execute(
      `UPDATE partners SET type= ?, version= ?, destination= ?, sync= ?, syncdel= ? WHERE ${this.field}= ?;`,
      this.getUpdateParams()
    )
    await this.connection.end()

    if (result.affectedRows === 1 && result.changedRows === 1) {
      console.log(
        `[PartnersRepository] Partner identified by ${this.field}=${this.identifier} was updated with params: `,
        this.updateParams
      )
      return "Partner updated."
    }
    return "Partner did not update as there were no changes."
  }

  async processPartnerDelete() {
    try {
      this.connection = await createConnection()
      await this.verifyPartner()
      return await this.deletePartner()
    } catch (error) {
      await this.connection.end()
      console.error("[PartnersRepository] Method: deletePartnerByIdOrType. ", error)
      return error.message
    }
  }

  private async deletePartner() {
    const [result] = await this.connection.execute(`DELETE FROM partners WHERE ${this.field}= ?`, [
      this.identifier,
    ])

    await this.connection.end()
    if (result.affectedRows === 1) {
      console.log(
        `[PartnersRepository] Partner identified by ${this.field}=${this.identifier} was deleted successfully.`
      )
      return "Partner deleted."
    }
    return "Partner could not get deleted."
  }
}
