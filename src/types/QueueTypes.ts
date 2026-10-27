export type attributeType = {
  [prop: string]: {
    // this is an index property, where we don't know in advance what the property will be
    DataType: "String" // this is a literal type where we tell the DataType to accept only the "String" value any other value will be rejected
    StringValue: string
  }
}

export type MessageParamsType = {
  // MessageAttributes: {
  //     [prop: string]: { // this is an index property, where we don't know in advance what the property will be
  //         DataType: 'String' // this is a literal type where we tell the DataType to accept only the "String" value any other value will be rejected
  //         StringValue: string
  //     }
  // }
  MessageBody: string
  DelaySeconds: number
  QueueUrl: string
}

export type DeleteMessageParamsType = {
  QueueUrl: string
  ReceiptHandle: string
}
