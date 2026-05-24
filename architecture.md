# SmartPark AI Architecture

## Overview

SmartPark AI is designed as a modular full-stack solution with separate frontend, backend, AI service, and IoT simulator.

- `client/` — React app built with Vite.
- `server/` — Express API with MongoDB persistence, JWT auth, Socket.IO, MQTT integration, and Swagger docs.
- `ai-service/` — FastAPI microservice with AI endpoints for slot detection, traffic prediction, and routing.
- `iot-simulator/` — Lightweight MQTT publisher that simulates sensors and enables real-time backend updates.

## Key modules

- Authentication: role-based JWT support for users and admins.
- Parking Slot Management: CRUD-style APIs and live status updates.
- Booking & Payment: booking flows with UPI-style payment simulation.
- AI: slot detection, prediction, and route optimization endpoints.
- Real-time: Socket.IO + MQTT for live sensor and slot changes.

## Deployment

The stack can be deployed locally using Docker Compose, or each service may be deployed separately to Render/Vercel. The frontend can be hosted on Vercel, the backend on Render, and the AI service as a separate Render web service.
