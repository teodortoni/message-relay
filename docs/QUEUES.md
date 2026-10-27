# Queues

[Go Back](../README.md "Back to README page")

This project uses SQS to decouple ingestion from downstream delivery. The workflow is intentionally queue-based so a message can be retried, audited, and processed asynchronously.

## Intake queue

This queue receives incoming payloads from the API Gateway receiver and hands them to the processor for validation and dispatch.

## Failure queue

This queue retains messages that fail validation or downstream delivery so they can be inspected and retried or escalated as needed.
