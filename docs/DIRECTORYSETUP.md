# Directory Setup

The project is organized around a small serverless runtime and a set of supporting modules:

- src/queues: queue processing and retry logic
- src/lambda: entry points for API Gateway and SQS-triggered functions
- src/database: persistence layer for messages and partners
- src/util: validation and helper utilities
- scripts: operational utilities and load testing helpers
- localtestdata: sample payloads for local validation

Keep environment config in a local .env file and do not commit secrets or production infrastructure values to version control.
