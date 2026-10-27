import loadtest, { LoadTestOptions } from "loadtest"

const options: LoadTestOptions = {
  // url: "https://yfkz07lp79.execute-api.us-east-1.amazonaws.com/production/v1",
  url: "https://api.example.com/v1",
  method: "POST",
  maxRequests: 5,
  body: {
    msgid: "NXT513_1lang_test3_Ntwk",
    data: {
      diceId: "85642",
      status: "MEDIABUS_TEO_TEST_POSTMAN",
      timestamp: "1562159047",
      bucketKey: "s3://example-bucket/series/N/NXT_31/NXT-2019_1948/NXT513_1lang_test3_Ntwk/",
      message: "message received via DE Redshift - TeoTestFromPostman",
    },
    type: "testmsg",
    version: "v1",
  },
}

loadtest.loadTest(options, (err, res) => {
  if (err) {
    return console.error(err)
  }
  console.log("Tests were successful: ", res)
})
