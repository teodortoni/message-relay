import { createConnection } from "../src/database/Client"

export const createTables = async () => {
  try {
    console.log("-> Start Table Creation")
    console.time("-> TableCreationDuration")
    const connection = await createConnection()

    // Drop Messages Table If Exists
    console.log("-> Drop Messages Table")
    const dropMessagesTable = "DROP TABLE IF EXISTS `messages`;"
    await connection.query(dropMessagesTable)

    // Create Messages Table
    console.log("-> Create Messages Table")
    const createMessagesTable = "CREATE TABLE IF NOT EXISTS `messages` LIKE `mb_msg_log`;"
    await connection.query(createMessagesTable)

    // Drop Messages Table If Exists
    console.log("-> Drop Failed Messages Table")
    const dropFailedMessagesTable = "DROP TABLE IF EXISTS `failed_messages`;"
    await connection.query(dropFailedMessagesTable)

    // Create Failed Messages Table
    console.log("-> Create Failed Messages Table")
    const createFailedMessagesTable =
      "CREATE TABLE IF NOT EXISTS `failed_messages` LIKE `mb_msg_log`;"
    await connection.query(createFailedMessagesTable)

    // Drop Partners Table If Exists
    console.log("-> Drop Partners Table")
    const dropPartnersTable = "DROP TABLE IF EXISTS `partners`;"
    await connection.query(dropPartnersTable)

    // Create Partners Table
    console.log("-> Create Partners Table")
    const createPartnersTable =
      "CREATE TABLE IF NOT EXISTS partners (`id` VARCHAR(36) NOT NULL, `type` VARCHAR(20) NOT NULL UNIQUE, `version` VARCHAR(10) NOT NULL, `destination` JSON NOT NULL CHECK(JSON_VALID(`destination`)), `sync` VARCHAR(10) NULL, `syncdel` VARCHAR(10) NULL, `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` DATETIME(6) NULL ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY(`id`)) ENGINE=InnoDB"
    await connection.query(createPartnersTable)

    connection.end()
    console.timeEnd("-> TableCreationDuration")
    console.log("\n")
  } catch (error) {
    console.error(error)
  }
}
