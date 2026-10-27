# Serverless Framework

[Go Back](../README.md "Back to README page")

This project uses the Serverless Framework to define the AWS resources needed for message ingestion, queue processing, database access, and partner routing.

## Deployment

```bash
serverless deploy --verbose
# or
sls deploy -v
```

## Local testing

The localtestdata folder contains sample event payloads for the receiver, processor, and partner APIs.

```bash
serverless invoke local --function receiver --path ./localtestdata/APIGatewayProxyEvent/Knots2dice.json
serverless invoke local --function processor --path ./localtestdata/SQSEvent/ProcessorKnots2dice.json
```
