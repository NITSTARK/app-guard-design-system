# PC App Lock - API Specification

## Overview

This document describes the RESTful API for the PC App Lock application. The API provides endpoints for user authentication, app security management, file protection, notifications, analytics, and system settings.

**Base URL**: `https://api.pcapplock.com/v1`
**Authentication**: Bearer token (JWT)

---

## Authentication

### POST /auth/login
Authenticate user with credentials.

**Request Body:**
```json
{
  "method": "pin" | "password" | "biometric",
  "credentials": {
    "pin": "string",
    "password": "string",
    "biometricToken": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "avatar": "string"
    }
  }
}
```

### POST /auth/refresh
Refresh access token.

**Request Body:**
```json
{
  "refreshToken": "string"
}
```

### POST /auth/logout
Invalidate user session.

---

## User Management

### GET /user/profile
Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "name": "string",
    "avatar": "string",
    "settings": {
      "theme": "light" | "dark" | "system",
      "notifications": boolean,
      "biometricEnabled": boolean
    },
    "createdAt": "string",
    "lastLogin": "string"
  }
}
```

### PUT /user/profile
Update user profile.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "avatar": "string"
}
```

### PUT /user/settings
Update user preferences.

**Request Body:**
```json
{
  "theme": "light" | "dark" | "system",
  "notifications": boolean,
  "biometricEnabled": boolean
}
```

---

## App Security & Locking

### GET /apps
Get list of installed applications.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "icon": "string",
      "path": "string",
      "isLocked": boolean,
      "lastUsed": "string",
      "usageTime": number
    }
  ]
}
```

### PUT /apps/{appId}/lock
Lock/unlock specific application.

**Request Body:**
```json
{
  "locked": boolean,
  "schedule": {
    "enabled": boolean,
    "startTime": "string",
    "endTime": "string",
    "days": ["monday", "tuesday", ...]
  }
}
```

### GET /apps/security-status
Get overall security status.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalApps": number,
    "lockedApps": number,
    "activeThreats": number,
    "lastScan": "string",
    "securityScore": number
  }
}
```

### POST /apps/scan
Perform security scan.

**Response:**
```json
{
  "success": true,
  "data": {
    "scanId": "string",
    "status": "running" | "completed" | "failed",
    "threats": [
      {
        "type": "malware" | "suspicious" | "unauthorized",
        "app": "string",
        "severity": "low" | "medium" | "high",
        "description": "string"
      }
    ]
  }
}
```

---

## Hidden Files Management

### GET /files/hidden
Get list of hidden files.

**Query Parameters:**
- `folder`: string (optional)
- `type`: string (optional)
- `limit`: number (default: 50)
- `offset`: number (default: 0)

**Response:**
```json
{
  "success": true,
  "data": {
    "files": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "size": number,
        "path": "string",
        "encrypted": boolean,
        "createdAt": "string",
        "modifiedAt": "string"
      }
    ],
    "total": number
  }
}
```

### POST /files/hidden
Add file to hidden storage.

**Request Body (multipart/form-data):**
```json
{
  "file": "File",
  "encrypt": boolean,
  "folder": "string"
}
```

### PUT /files/hidden/{fileId}
Update hidden file properties.

**Request Body:**
```json
{
  "name": "string",
  "folder": "string",
  "encrypted": boolean
}
```

### DELETE /files/hidden/{fileId}
Remove file from hidden storage.

### GET /files/hidden/{fileId}/download
Download hidden file.

**Response:** File stream with appropriate headers.

---

## Notifications

### GET /notifications
Get user notifications.

**Query Parameters:**
- `type`: "access_request" | "file_shared" | "access_granted" (optional)
- `read`: boolean (optional)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "type": "access_request" | "file_shared" | "access_granted",
      "title": "string",
      "message": "string",
      "from": {
        "name": "string",
        "avatar": "string"
      },
      "timestamp": "string",
      "read": boolean,
      "data": {
        "fileId": "string",
        "fileName": "string",
        "deviceName": "string",
        "userId": "string"
      }
    }
  ]
}
```

### PUT /notifications/{notificationId}/read
Mark notification as read.

### PUT /notifications/read-all
Mark all notifications as read.

### DELETE /notifications/{notificationId}
Delete notification.

### POST /notifications/access-request/{notificationId}/grant
Grant access request.

### POST /notifications/access-request/{notificationId}/deny
Deny access request.

---

## Activity Logging

### GET /activity
Get user activity log.

**Query Parameters:**
- `type`: "app_access" | "file_access" | "login" | "settings_change" (optional)
- `startDate`: string (ISO date)
- `endDate`: string (ISO date)
- `limit`: number (default: 50)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "type": "app_access" | "file_access" | "login" | "settings_change",
      "description": "string",
      "timestamp": "string",
      "details": {
        "appName": "string",
        "fileName": "string",
        "ipAddress": "string",
        "userAgent": "string"
      }
    }
  ]
}
```

### POST /activity
Log custom activity.

**Request Body:**
```json
{
  "type": "string",
  "description": "string",
  "details": object
}
```

---

## Analytics & Reports

### GET /analytics/usage
Get usage statistics.

**Query Parameters:**
- `period`: "day" | "week" | "month" | "year"
- `startDate`: string (ISO date)
- `endDate`: string (ISO date)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSessions": number,
    "averageSessionDuration": number,
    "mostUsedApps": [
      {
        "appName": "string",
        "usageTime": number,
        "sessions": number
      }
    ],
    "securityEvents": number,
    "filesAccessed": number
  }
}
```

### GET /analytics/security
Get security analytics.

**Response:**
```json
{
  "success": true,
  "data": {
    "threatsDetected": number,
    "threatsBlocked": number,
    "unauthorizedAccess": number,
    "securityScore": number,
    "riskLevel": "low" | "medium" | "high",
    "recommendations": [
      {
        "type": "string",
        "message": "string",
        "priority": "low" | "medium" | "high"
      }
    ]
  }
}
```

### POST /analytics/export
Export analytics data.

**Request Body:**
```json
{
  "format": "csv" | "json" | "pdf",
  "dataType": "usage" | "security" | "activity" | "all",
  "period": {
    "startDate": "string",
    "endDate": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "string",
    "expiresAt": "string"
  }
}
```

---

## Device Management

### GET /devices
Get connected devices.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "type": "mobile" | "desktop" | "tablet",
      "os": "string",
      "lastSeen": "string",
      "trusted": boolean,
      "permissions": ["file_access", "app_control"]
    }
  ]
}
```

### PUT /devices/{deviceId}/trust
Update device trust status.

**Request Body:**
```json
{
  "trusted": boolean,
  "permissions": ["file_access", "app_control"]
}
```

### DELETE /devices/{deviceId}
Remove device access.

---

## System Settings

### GET /settings/system
Get system configuration.

**Response:**
```json
{
  "success": true,
  "data": {
    "autoLock": {
      "enabled": boolean,
      "timeout": number
    },
    "notifications": {
      "enabled": boolean,
      "types": ["security", "access", "updates"]
    },
    "backup": {
      "enabled": boolean,
      "frequency": "daily" | "weekly" | "monthly",
      "location": "string"
    }
  }
}
```

### PUT /settings/system
Update system configuration.

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": ["Field 'email' is required"]
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

## Rate Limiting

- Authentication endpoints: 5 requests per minute
- File operations: 100 requests per minute
- General API: 1000 requests per hour

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Request limit per window
- `X-RateLimit-Remaining`: Requests remaining in window
- `X-RateLimit-Reset`: Time when rate limit resets (Unix timestamp)

---

## Webhooks

### POST /webhooks
Configure webhook endpoints for real-time events.

**Supported Events:**
- `app.locked`
- `app.unlocked`
- `threat.detected`
- `access.requested`
- `access.granted`
- `file.accessed`

**Request Body:**
```json
{
  "url": "string",
  "events": ["app.locked", "threat.detected"],
  "secret": "string"
}
```

---

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  settings: UserSettings;
  createdAt: string;
  lastLogin: string;
}
```

### Application
```typescript
interface Application {
  id: string;
  name: string;
  icon: string;
  path: string;
  isLocked: boolean;
  schedule?: LockSchedule;
  lastUsed: string;
  usageTime: number;
}
```

### HiddenFile
```typescript
interface HiddenFile {
  id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  encrypted: boolean;
  folder?: string;
  createdAt: string;
  modifiedAt: string;
}
```

### Notification
```typescript
interface Notification {
  id: string;
  type: 'access_request' | 'file_shared' | 'access_granted';
  title: string;
  message: string;
  from?: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  read: boolean;
  data?: Record<string, any>;
}
```

---

## SDK Integration

### JavaScript/TypeScript SDK
```bash
npm install @pcapplock/sdk
```

```typescript
import { PCAppLockAPI } from '@pcapplock/sdk';

const client = new PCAppLockAPI({
  baseURL: 'https://api.pcapplock.com/v1',
  apiKey: 'your-api-key'
});

// Example usage
const apps = await client.apps.list();
await client.apps.lock('app-id');
const notifications = await client.notifications.list();
```

### cURL Examples
```bash
# Login
curl -X POST https://api.pcapplock.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"method": "pin", "credentials": {"pin": "1234"}}'

# Get apps
curl -X GET https://api.pcapplock.com/v1/apps \
  -H "Authorization: Bearer YOUR_TOKEN"

# Lock an app
curl -X PUT https://api.pcapplock.com/v1/apps/app-id/lock \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"locked": true}'
```s