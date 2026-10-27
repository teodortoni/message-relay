-- Example seed data for a public-facing project
-- Replace with your own partner configuration and credentials before deployment.

CREATE TABLE IF NOT EXISTS partners (
  id varchar(36) NOT NULL,
  type varchar(20) NOT NULL,
  version varchar(10) NOT NULL,
  destination json NOT NULL,
  sync varchar(10) DEFAULT NULL,
  syncdel varchar(10) DEFAULT NULL,
  created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at datetime(6) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY type (type)
);

INSERT INTO partners (id, type, version, destination, sync, syncdel, created_at, updated_at) VALUES
  ('11111111-1111-4111-8111-111111111111', 'content-ingest', 'v1', '[{"host": "api.example.com", "path": "/ingest", "header": "{"Content-Type":"application/json"}"}]', 'false', '', NOW(), NULL),
  ('22222222-2222-4222-8222-222222222222', 'notification-delivery', 'v1', '[{"host": "notifications.example.com", "path": "/deliver", "header": "{"Authorization":"Bearer token"}"}]', 'false', '', NOW(), NULL);
