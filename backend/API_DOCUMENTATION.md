# API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

### Register

`POST /auth/register`

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "patient"
}
```

**Response:**

```json
{
  "token": "eyJhbG...",
  "user": { ... }
}
```

### Login

`POST /auth/login`

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

## Claims

### Submit Claim

`POST /claims/submit`
_Headers: `Authorization: Bearer <token>`_

**Body:**

```json
{
  "provider": "General Hospital",
  "amount": 150.0,
  "date": "2024-12-01",
  "ipfsHash": "QmTest123..."
}
```

**Response:**

```json
{
  "msg": "Claim Submitted",
  "claimHash": "claim_123456...",
  "txHash": "0xABC..."
}
```

### Get My Claims

`GET /claims`
_Headers: `Authorization: Bearer <token>`_

**Response:**

```json
[
  {
    "id": 1,
    "provider": "General Hospital",
    "status": "Pending",
    ...
  }
]
```
