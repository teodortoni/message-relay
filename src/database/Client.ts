import mysql from "mysql2"
import AWS from "aws-sdk"

// Just for local tests
// import dotenv from "dotenv"
// dotenv.config()

// Create a Secrets Manager client
const client = new AWS.SecretsManager({
  region: process.env.AWS_SQS_REGION,
})

export const createConnection = async () => {
  try {
    const { SecretString } = await client
      .getSecretValue({ SecretId: `${process.env.SECRET_ID}` })
      .promise()

    if (SecretString) {
      const secret = JSON.parse(SecretString || "")
      const connectionConfigs = {
        host: secret.host,
        port: secret.port,
        user: secret.username,
        password: secret.password,
        database: secret.dbClusterIdentifier,
      }
      return mysql.createConnection(connectionConfigs).promise()
    }
  } catch (error) {
    console.error("[Client] Method: createConnection. ", error)
  }
}
