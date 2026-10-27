import axios from "axios"
import PartnersController from "../src/controllers/Partners"
import * as _ from "lodash"

const record = {
  messageId: "cc37e294-b3d8-411b-b9c8-252dbb2dd939",
  receiptHandle:
    "AQEBSZsKwc153iKsUpWPRWhQqxrkUtXyYIrP3ht7yGy0DhC3J1pxsrO50SBptv88iw9knm9aVOpZDeH1zJFx5UVhV/sJNM3Op6R6K/10yy/9G51mwiEX5pX5oztlMuVLOLk0octPwqpVBeqVLVsEj16BtlXVQu2YJufqb8qP4CBQFRF/9rp0Lr/kb9IfLfGMyjvIqrefMK5pwJU0o/+d+rmDV/vfTry7tKEO0ep5HlgXEBgb+ME8sqQt5jEyyeXOAIIgvO6n2bQFKABAsKZuw4q73UQ/Q85EyMVTif3Q8nTW/KQastGL+Qt3EbCv5+C8E1is47gNKxQIksdprYr4kxt/kk56rlb/7vdyEdhGB5WfK6t5ToWo0oQJtHFCWSXCI0bA",
  body:
    '"{\\n    \\"msgid\\": \\"NXT513_1lang_test3_Ntwk\\",\\n    \\"data\\": {\\n        \\"diceId\\": \\"85642\\",\\n        \\"status\\": \\"UPDATED_VOD\\",\\n        \\"timestamp\\": \\"1562159047\\",\\n        \\"bucketKey\\": \\"s3://example-bucket/series/N/NXT_31/NXT-2019_1948/NXT513_1lang_test3_Ntwk/\\",\\n        \\"message\\": \\"message received via DE Redshift\\"\\n    },\\n    \\"type\\": \\"dice2mass\\",\\n    \\"version\\": \\"v1\\"\\n}"',
  attributes: [Object],
  messageAttributes: {},
  md5OfBody: "5ec12925c6d342377c837325946ca37e",
  eventSource: "aws:sqs",
  eventSourceARN: "arn:aws:sqs:us-east-1:665827550306:message-relayQueue",
  awsRegion: "us-east-1",
}

const partnersController = new PartnersController({ identifier: "dice2mass", body: {} })
partnersController
  .getPartner()
  .then((partner) => {
    for (const dest of partner.destination) {
      const destUrl = `https://${dest.host}${dest.path}`
      console.log(destUrl)
      axios
        .post(destUrl, JSON.stringify(record.body))
        .then((res) => {
          console.log("axios response: ", res)
        })
        .catch((err) => {
          console.log("axios error: ", err)
        })
    }
  })
  .catch((err) => {
    console.error(err)
  })
