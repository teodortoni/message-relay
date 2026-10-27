# Database

[Go Back](../README.md "Back to README page")

This project stores design-time and runtime metadata in a relational database so it can keep a record of successful and failed deliveries and maintain the partner registry.

## Components

- Client.ts: creates the DB connection using environment variables and secret management.
- FailedMessagesRepository.ts: stores failed payloads for troubleshooting and replay.
- MessagesRepository.ts: stores successful message records.
- PartnersRepository.ts: stores destination configuration for each partner and message type.

## Typical schema

```sql
CREATE TABLE partners (
  id varchar(36) NOT NULL PRIMARY KEY,
  type varchar(20) NOT NULL UNIQUE,
  version varchar(10) NOT NULL,
  destination json NOT NULL,
  sync varchar(10) DEFAULT NULL,
  syncdel varchar(10) DEFAULT NULL,
  created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at datetime(6) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6)
);
```

The database layer is intentionally configurable so it can work with AWS-managed services or a local MySQL-compatible database.
