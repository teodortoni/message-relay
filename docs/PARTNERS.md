# Partners

[Go Back](../README.md "Back to README page")

Partner records define how a message type is routed to one or more destinations. Each record contains a partner type, version, and a destination array with host, path, and optional headers.

## Example partner configuration

```json
{
  "type": "content-ingest",
  "version": "v1",
  "destination": [
    {
      "host": "api.example.com",
      "path": "/ingest",
      "header": "{"Content-Type":"application/json"}"
    }
  ],
  "sync": "false",
  "syncdel": ""
}
```

The partner API supports create, read, update, and delete operations using a route like `/partners/{identifier}`.
