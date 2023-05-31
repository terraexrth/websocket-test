const WebSocket = require('ws').Server;
const http = require('http')


const wss = new WebSocket({ port: 5000 }); // Replace with your desired port number

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const position = JSON.parse(message);
      console.log('Received position:', position);
      // Broadcast the position to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(position));
        }
      });
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
