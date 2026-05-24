# SmartPark AI

SmartPark AI is a full-stack Smart Parking Management System built with React, Node.js, MongoDB, and a Python AI microservice. It delivers real-time parking slot monitoring, booking, route optimization, AI-powered CCTV detection, and analytics.

## Architecture

- `client/` — React + Vite frontend with Tailwind, Framer Motion, Leaflet, and Charts.
- `server/` — Express backend with JWT auth, Socket.IO, Swagger docs, and REST APIs.
- `ai-service/` — Python FastAPI microservice for parking slot detection, route optimization, and traffic prediction.
- `iot-simulator/` — Simulated sensor data publisher using MQTT.

## Quick start

1. Install dependencies for each service:
   - `cd smartpark-ai/server && npm install`
   - `cd smartpark-ai/client && npm install`
   - `cd smartpark-ai/ai-service && pip install -r requirements.txt`

2. Create `.env` files from examples.
3. Launch the stack:
   - `docker compose up --build`

## Services

- Backend API: `http://localhost:5000`
- Frontend: `http://localhost:5173`
- AI service: `http://localhost:8000`
- MQTT broker: `mqtt://localhost:1883`

## Notes

- The AI service includes a stubbed YOLOv8-like detector for demo purposes.
- Use the admin account from sample data for dashboard access.

## Deployment guide

- For local development, use `docker compose up --build`.
- Frontend can be deployed to Vercel by pointing it at the backend API URL.
- Backend and AI microservice can be deployed as separate web services on Render.
- Use Render environment variables for `MONGO_URI`, `JWT_SECRET`, `AI_SERVICE_URL`, and `MQTT_URL`.

## Folder structure

```text
smartpark-ai/
├── client/
├── server/
├── ai-service/
├── iot-simulator/
├── docs/
├── README.md
├── docker-compose.yml
```
