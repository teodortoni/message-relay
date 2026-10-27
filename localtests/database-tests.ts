import MessagesRepository from "../src/database/MessagesRepository"
import FailedMessagesRepository from "../src/database/FailedMessagesRepository"
import { MessageBodyType } from "src/types/ValidatorTypes"
import * as _ from "lodash"

// import Client from "../src/database/Client"

// const client = new Client()
// const connection = client.createConnection()

// console.log("Connection: ", connection)

const message: MessageBodyType = {
  msgid: "NXT513_1lang_test3_Ntwk",
  data: {
    diceId: "85642",
    status: "UPDATED_VOD",
    timestamp: "1562159047",
    bucketKey: "s3://example-bucket/series/N/NXT_31/NXT-2019_1948/NXT513_1lang_test3_Ntwk/",
    message: "message received via DE Redshift - Teo Tests From Terminal",
  },
  type: "dice2mass",
  version: "v1",
}

const repository = new MessagesRepository()

// repository
//   .store(message, "74.201.147.136")
//   .then((res) => {
//     console.log("Result: ", res)
//   })
//   .catch((err) => {
//     console.error(err)
//   })

repository
  .get()
  .then((res) => {
    // console.log("Results: ", res)
    console.log(_.head(res).id)
    console.log(_.last(res).id)
  })
  .catch((err) => {
    console.error(err)
  })

// const fRepository = new FailedMessagesRepository()

// fRepository
//   .store(message, "74.201.147.136")
//   .then((res) => {
//     console.log("Results: ", res)
//   })
//   .catch((err) => {
//     console.error(err)
//   })
