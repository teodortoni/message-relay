import PartnersRepository, { PartnerBody } from "../src/database/PartnersRepository"

import dotenv from "dotenv"
dotenv.config()

const host = `${process.env.DEMO_DESTINATION_API_ID}.execute-api.us-east-1.amazonaws.com/demo`

const partnerRepo = new PartnersRepository()

const newPartner: PartnerBody = {
  type: "freighter2corvette",
  version: "v1",
  destination: [
    {
      host,
      path: "/destination",
      header: "{}",
    },
    {
      host,
      path: "/destination2",
      header: "{}",
    },
  ],
  sync: "",
  syncdel: "",
}

const identifier = "aa6fd133-ff33-47c0-a909-29837349ac06" // id
// const identifier = "corvette2freighter" // type

// Create new partner
// partnerRepo
//   .store(newPartner)
//   .then((created) => {
//     console.log(created ? "Partner created" : "Partner wasn't created")
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// Get partner by id or type
// partnerRepo
//   .getPartnerByIdOrType(identifier)
//   .then((partner) => {
//     if (partner) {
//       console.log("Partner ID: ", partner.id)
//       console.log("Partner Type: ", partner.type)
//       console.log("Partner Version: ", partner.version)
//       console.log("Partner Destination: ", partner.destination)
//       console.log("Partner Created At: ", partner.created_at)
//     } else {
//       console.log(`No partner found with identifier: ${identifier}`)
//     }
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// Update partner
// let updatePartner: PartnerType = newPartner
// updatePartner.type = "freighter2corvette"
// updatePartner.version = "v3"
// partnerRepo
//   .updatePartnerByIdOrType(identifier, updatePartner)
//   .then((updated) => {
//     if (updated) {
//       console.log("Partner updated.")
//     } else {
//       console.log("Partner didn't update")
//     }
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// Delete partner
// partnerRepo.deletePartnerByIdOrType(identifier).then((deleted) => {
//   console.log(deleted ? "Partner deleted" : "Partner didn't get deleted")
// })
