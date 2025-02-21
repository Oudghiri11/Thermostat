import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io'; // Importation spécifique pour la classe Server

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

let temperatureData = [{ time: '10:00', temp: 30 }]; // Simulation de données

io.on('connection', (socket) => {
  console.log('Client connecté');

  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
});

// Route pour récupérer les données
app.get('/api/temperature', (req, res) => {
  res.json(temperatureData);
});

// Route pour définir une nouvelle température cible
app.post('/api/set-temperature', (req, res) => {
  console.log('Nouvelle température cible:', req.body.targetTemp);
  res.sendStatus(200);
});

// Simulation de nouvelles températures toutes les 5 secondes
setInterval(() => {
  const newTemp = {
    time: new Date().toLocaleTimeString(),
    temp: Math.random() * 10 + 20,
  };
  temperatureData.push(newTemp);
  io.emit('newTemp', newTemp);
}, 5000);

server.listen(5000, () => console.log('Serveur lancé sur le port 5000'));
