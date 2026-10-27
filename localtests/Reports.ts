import { createConnection } from "../src/database/Client"
import * as fs from "fs"
import * as path from "path"
import * as exposedWweidsData from "./data/Example_API.json"

export default class Reports {
  connection

  txtFiles = {
    sentWweids: path.join(__dirname, "data/sentWweids.txt"),
    notSentWweids: path.join(__dirname, "data/notSentWweids.txt"),
    exposedWweids: path.join(__dirname, "data/exposedWweids.txt"),
    notExposedWweids: path.join(__dirname, "data/notExposedWweids.txt"),
  }

  sentWweids: any = []
  notSentWweids: any = []
  exposedWweids: any = []
  notExposedWweids: any = []

  async generateReport() {
    try {
      await this.getAssetIdsSentToPartner("partner-demo")
      this.getExposedWweids()
      this.getNotExposedWweIds()
    } catch (error) {
      console.error(error)
    }
  }

  async getWweidsSentToPartner(partner) {
    try {
      this.connection = await createConnection()
      const [rows, fields] = await this.connection.query(
        `SELECT * from messages WHERE type="${partner}" ORDER BY ut DESC`
      )
      for (var i = 0; i < rows.length; i++) {
        const messageData = JSON.parse(rows[i].data)
        // console.log(messageData.id)
        if (this.sentWweids.indexOf(messageData.id) === -1) {
          this.sentWweids.push(messageData.id)
        }
      }
      this.connection.end()
      console.log(`Sent ExampleID #: ${this.sentWweids.length}`)
      this.createFile("sentWweids")
    } catch (error) {
      console.error(error)
    }
  }

  truncateFile = (file) => {
    try {
      if (fs.existsSync(this.txtFiles[file])) {
        fs.truncateSync(this.txtFiles[file])
      }
    } catch (error) {
      console.error(error)
    }
  }

  createFile = (file) => {
    if (this[file].length === 0) {
      return
    }

    this.truncateFile(file)

    try {
      this[file].forEach((assetId) => {
        fs.appendFileSync(this.txtFiles[file], `${assetId},\r\n`)
      })
    } catch (error) {
      console.error(error)
    }
  }

  getExposedWweids() {
    try {
      for (const key in exposedWweidsData) {
        const assetId = exposedWweidsData[key]["Example Id"]
        if (assetId !== undefined) {
          if (/^([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)$/i.test(assetId)) {
            if (this.exposedWweids.indexOf(assetId) === -1 && assetId.indexOf("__Clone__") === -1) {
              this.exposedWweids.push(assetId)
            }
          }
        }
      }
      console.log(`Exposed ExampleID #: ${this.exposedWweids.length}`)
      this.createFile("exposedWweids")
    } catch (error) {
      console.error(error)
    }
  }

  getNotExposedWweIds() {
    try {
      this.exposedWweids.forEach((assetId) => {
        if (this.sentWweids.indexOf(assetId) === -1) {
          if (this.notSentWweids.indexOf(assetId) === -1) {
            this.notSentWweids.push(assetId)
          }
        }
      })
      console.log(`Not sent ExampleID #: ${this.notSentWweids.length}`)
      this.createFile("notSentWweids")
      this.sentWweids.forEach((assetId) => {
        if (this.exposedWweids.indexOf(assetId) === -1) {
          if (this.notExposedWweids.indexOf(assetId) === -1) {
            this.notExposedWweids.push(assetId)
          }
        }
      })
      console.log(`Not exposed ExampleID #: ${this.notExposedWweids.length}`)
      this.createFile("notExposedWweids")
    } catch (error) {
      console.error(error)
    }
  }
}

new Reports().generateReport()
// new Reports().getExposedWweids()
