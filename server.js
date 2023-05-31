const WebSocket = require('ws').Server;
const http = require('http')


 // Replace with your desired port number

const server = http.createServer((req, res) => {
	if (req.url === '/favicon.ico') {
	  // Handle the request for favicon.ico
	  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
	  res.end();
	} else {
	  // Handle other requests
	  res.writeHead(404);
	  res.end();
	}
  });

const wss = new WebSocket({ server });
  
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
