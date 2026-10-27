import PartnerRepository from "../src/database/PartnersRepository"
import fs from "fs"

const partnerRepo = new PartnerRepository()

export const migratePartners = async () => {
  try {
    console.log("-> Start Partners Migration")
    console.time("-> MigrationDuration")

    // Execution here
    const partnerJson = JSON.parse(fs.readFileSync("py/mb-type-config.json", { encoding: "utf8" }))

    for (const partner of partnerJson) {
      const { type, version, dest: destination, syncdel, sync } = partner
      await partnerRepo.store({ type, version, destination, sync, syncdel })
    }
    console.timeEnd("-> MigrationDuration")
    console.log("\n")
  } catch (error) {
    console.error(error)
  }
}
