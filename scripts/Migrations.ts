import dotenv from "dotenv"
dotenv.config()

import { createTables } from "./CreateTables"
import { migratePartners } from "./MigratePartners"

const run = async () => {
  await createTables()
  await migratePartners()
}

run()
