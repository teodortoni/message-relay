import { createConnection } from "./Client"
import { MessageBodyType } from "../types/ValidatorTypes"

export default class FailedMessagesRepository {
  /**
   * Database client connection
   */
  connection

  /**
   * The database entity this repository manages
   */
  entity = "failed_messages"

  /**
   * Retrieves all messages stored in the database.
   */
  async get() {
    try {
      this.connection = await createConnection()
      const query = `SELECT * FROM ${this.entity} ORDER BY ut DESC;`
      const [rows, fields] = await this.connection.query(query)
      await this.connection.end()
      return rows
    } catch (error) {
      console.error("[FailedMessagesRepository] Method: get. ", error)
    }
  }

  /**
   * Stores the message sent by the initiator partner
   * @param message Partner message
   * @param sourceip Initiator partner's IP
   */
  async store(message: MessageBodyType, sourceip: string) {
    try {
      this.connection = await createConnection()
      const { msgid, data, type, version } = message
      const [
        affectedRows,
      ] = await this.connection.execute(
        `INSERT INTO ${this.entity} (msgid, data, type, version, sourceip) VALUES (?, ?, ?, ?, ?);`,
        [msgid || null, data || null, type || null, version || null, sourceip]
      )

      console.log("[FailedMessagesRepository] Message Stored In DB Results: ", {
        Affected_Rows: affectedRows.affectedRows,
        Insert_ID: affectedRows.insertId,
        Server_Status: affectedRows.serverStatus,
        Warning_Status: affectedRows.warningStatus,
      })

      await this.connection.end()
    } catch (error) {
      console.error("[FailedMessagesRepository] Method: store. ", error)
    }
  }
}
