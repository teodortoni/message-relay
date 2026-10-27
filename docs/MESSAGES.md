# Messages

[Go Back](../README.md "Back to README page")

Messages are JSON payloads with a transport identifier, a version number, a unique message ID, and a data object. The payload format is intentionally generic so it can represent many partner integrations.

```json
{
  "type": "content-ingest",
  "version": "v1",
  "msgid": "asset-001",
  "data": {
    "id": "asset-001",
    "status": "PUBLISHED",
    "timestamp": 1710000000,
    "url": "https://storage.example.com/assets/asset-001"
  }
}
```

- type: channel or integration name
- version: protocol version
- msgid: unique message identifier
- data: payload details for the specific workflow
