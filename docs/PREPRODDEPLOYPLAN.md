# Pre-Prod Deploy Plan

[Go Back](../README.md "Back to README page")

1. Validate environment variables and AWS access.
2. Confirm the queue names and IAM policies use the target deployment stage.
3. Deploy the serverless stack to a non-production stage.
4. Run API and queue smoke tests against the deployed endpoints.
5. Verify retry behavior and message persistence in the database.
6. Promote the release only after confirming logs, dashboards, and error handling.

This plan is intentionally generic so it can be reused for any partner-connected deployment.
