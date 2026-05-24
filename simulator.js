import mqtt from 'mqtt';

const brokerUrl = 'mqtt://localhost:1883';
const client = mqtt.connect(brokerUrl);

const sensorIds = ['S-Zone A-1', 'S-Zone A-2', 'S-Zone B-1', 'S-Zone B-2', 'S-Zone C-1'];

client.on('connect', () => {
  console.log('IoT simulator connected to MQTT broker');
  setInterval(() => {
    const payload = {
      sensorId: sensorIds[Math.floor(Math.random() * sensorIds.length)],
      occupancy: Math.random() > 0.5 ? 'occupied' : 'empty',
      timestamp: new Date().toISOString()
    };
    client.publish('smartpark/sensors/update', JSON.stringify(payload));
    console.log('Published sensor update', payload);
  }, 5000);
});

client.on('error', err => {
  console.error('MQTT error', err.message);
});
