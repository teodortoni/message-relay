const jsonString = {
  Records: [
    {
      messageId: "5ee67699-3fb6-43d4-bc0f-f5742e74d8cd",
      receiptHandle:
        "AQEB8K5ltecgffKcEMPh8t2g+DnPMXxb61h/FeRVOGXo6vLhTVcd9uBCH44aFPoyHxNwwRdOGJ9mBXvM3nLz0teaYvpyb4rMP7ylq9PqcoD0HSiopMH8cp97kGfxOssmsJhVopQvUEpZQlwccqTdKdyhnxz5AGqZiyGF+u/3Kb25hbJtLgZNMgV3TZXre9W1647SjuDNSwes4f5z+gGRcG+zzIlYuOr3jYOKQEweGnXRhgcess5qBLE6isxjZGhbYmJFCjSg1xLvhFq6p00C3fhvxTAa8U/HlFf4H2ImV5oUIrcIh3ZtJZr4IEEZkWrWHdLEYPqj9CwXyt5ZJMY4B/0aMAH5Rbvba3XGetHhS+IVIPGPsBBuq0o0CpQ9877Un7/PMecW+iG1FeJy1vZ3ENs3Fw==",
      body:
        '"{\\n    \\"msgid\\": \\"NXT513_1lang_test3_Ntwk\\",\\n    \\"data\\": {\\n        \\"diceId\\": \\"85642\\",\\n        \\"status\\": \\"UPDATED_VOD\\",\\n        \\"timestamp\\": \\"1562159047\\",\\n        \\"bucketKey\\": \\"s3://example-bucket/series/N/NXT_31/NXT-2019_1948/NXT513_1lang_test3_Ntwk/\\",\\n        \\"message\\": \\"message received via DE Redshift\\"\\n    },\\n    \\"type\\": \\"dice2mass\\",\\n    \\"version\\": \\"v1\\"\\n}"',
      attributes: [Object],
      messageAttributes: {},
      md5OfBody: "5ec12925c6d342377c837325946ca37e",
      eventSource: "aws:sqs",
      eventSourceARN: "arn:aws:sqs:us-east-1:665827550306:message-relayQueue",
      awsRegion: "us-east-1",
    },
  ],
}

const jsObject = {
  msgid: "NXT513_1lang_test3_Ntwk",
  data: {
    diceId: "85642",
    status: "UPDATED_VOD",
    timestamp: "1562159047",
    bucketKey: "s3://example-bucket/series/N/NXT_31/NXT-2019_1948/NXT513_1lang_test3_Ntwk/",
    message: "message received via DE Redshift",
  },
  type: "dice2mass",
}

const eventBody = JSON.parse(JSON.parse(jsonString.Records[0].body))

console.log(typeof eventBody)
console.log(eventBody)

console.log(JSON.stringify(JSON.stringify(jsObject)))
