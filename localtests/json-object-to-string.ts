const knots2dice = {
  type: "knots2dice",
  version: "v1",
  msgid: "DCHiRaw1415_10_Ntwk",
  data: {
    id: "DCHiRaw1415_10_Ntwk",
    action: "CREATE",
    timestamp: 1594092225,
    url:
      "s3://example-bucket/supp/R/Raw_19/Raw-2020_2284/Raw1415_Ntwk/supp/DCHiRaw1415_10_Ntwk/TeoTestingFromPostman",
  },
}

console.log("Stringified knots2dice json object: ", JSON.stringify(knots2dice))

const knots2mass = {
  type: "knots2mass",
  version: "v1",
  msgid: "DCExRaw1415_01_Ntwk",
  data: {
    id: "DCExRaw1415_01_Ntwk",
    action: "UPDATE",
    timestamp: 1594088488,
    url: "s3://example-bucket/supp/R/Raw_19/Raw-2020_2284/Raw1415_Ntwk/supp/DCExRaw1415_01_Ntwk/",
  },
}
console.log("Stringified knots2mass json object: ", JSON.stringify(knots2mass))

const massmsg = {
  type: "massmsg",
  version: "v1",
  msgid: "NXT570_Ntwk",
  data: {
    vmsId: "189847",
    axisId: 145195,
    diceId: "155090",
    status: "PACKAGE_PUBLISHED",
    timestamp: 1594118486,
    bucketKey: "series/N/NXT_31/NXT-2020_2287/NXT570_Ntwk/NXT570_Ntwk.json",
    message: null,
    revision: {
      Massive: 1,
      Dice: 1,
      Editorial: 1,
    },
    releaseDate: "2020-07-03 02:00:00",
    assetIdSource: null,
    contentWweid: null,
    contentVersionWweid: null,
  },
}
console.log("Stringified massmsg json object: ", JSON.stringify(massmsg))

const masserr = {
  type: "masserr",
  version: "v1",
  msgid: "Example365Ricoch_Ntwk",
  data: {
    vmsId: null,
    axisId: 0,
    diceId: null,
    status: "PUBLISHING_ERROR",
    timestamp: 1593913276,
    bucketKey: null,
    message:
      "BucketKey: vod/new/Example365Ricoch_Ntwk PathToWweItem:s3://example-bucket/series/W/Example-365_321/Example-365-2020_2377/Example365Ricoch_Ntwk/FAILED. Incoming content item error:ExceptionMessage: The request channel timed out while waiting for a reply after 00:01:00. Increase the timeout value passed to the call to Request or increase the SendTimeout value on the Binding. The time allotted to this operation may have been a portion of a longer timeout. FeedEntityBucketKey: ",
    revision: {
      Massive: 1,
      Dice: 1,
      Editorial: 1,
    },
    releaseDate: null,
    assetIdSource: null,
    contentWweid: null,
    contentVersionWweid: null,
  },
}
console.log("Stringified masserr json object: ", JSON.stringify(masserr))

const createPartner = {
  type: "corvette2freighter",
  version: "v1",
  destination: [
    {
      host: "2l8ffv3ywj.execute-api.us-east-1.amazonaws.com/demo",
      path: "/destination",
    },
  ],
  sync: "false",
  syncdel: "",
}
console.log("Stringified createPartner json object: ", JSON.stringify(createPartner))
