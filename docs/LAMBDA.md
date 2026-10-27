# Lambda Functions

[Go Back](../README.md "Back to README page")

The application uses AWS Lambda for three main operations:

- receiver: accepts incoming HTTP requests and stores them in the intake queue
- processor: reads queued messages, validates the partner and dispatches them to the target
- partners: exposes a CRUD API for managing partner routing configuration

## Receiver

The receiver function validates the request body, records the source IP, and enqueues the message for asynchronous processing.

## Processor

The processor validates the message against the configured partner rules and sends it to the destination URL. If the downstream endpoint fails, the message is retried using the configured queue delay.

## Partners

The partners function manages partner creation, lookup, update, and deletion through a simple API layer.
