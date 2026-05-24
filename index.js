import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import 'express-async-errors';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import slotRoutes from './routes/slotRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import sensorRoutes from './routes/sensorRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { mqttClient } from './utils/mqttClient.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

connectDb();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartPark AI API',
      version: '1.0.0',
      description: 'Smart parking backend with AI and real-time features.'
    }
  },
  apis: ['./routes/*.js']
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sensors', sensorRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SmartPark AI backend' });
});

app.use(errorHandler);

io.on('connection', socket => {
  console.log('Socket connected', socket.id);
  socket.on('subscribeSlotUpdates', () => {
    console.log('Client subscribed to slot updates');
  });
  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
  });
});

mqttClient.on('message', (topic, message) => {
  if (topic.startsWith('smartpark/sensors')) {
    const payload = JSON.parse(message.toString());
    io.emit('sensorUpdate', payload);
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`SmartPark AI backend listening on ${PORT}`);
});

export default app;
