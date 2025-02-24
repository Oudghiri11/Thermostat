import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function TempTable() {
  const [data, setData] = useState([]); // État pour les données

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get('http://localhost:5000/api/temperature') // Utiliser l'URL correcte
        .then((response) => {
          const newData = response.data; // Les nouvelles données de température et d'humidité
          console.log('Données récupérées : ', newData); // Vérification des données reçues

          setData((prevData) => {
            const updatedData = [...prevData, ...newData];
            // Limiter à 20 données maximum
            return updatedData.slice(-20); // Garder seulement les 20 dernières entrées
          });
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données : ', error);
        });
    }, 10000); // Exécuter toutes les 10 secondes

    return () => clearInterval(intervalId); // Nettoyer l'intervalle à la désactivation du composant
  }, []);

  // Vérification si les données sont bien formatées avant le rendu du graphique
  if (data.length === 0) {
    return <div style={{ textAlign: 'center' }}>Chargement des données...</div>;
  }

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>Dernière Température : {data[data.length - 1]?.temp}°C</h2>

      {/* Graphique des températures */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#007bff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Tableau des données */}
      <table
        style={{ marginTop: '30px', borderCollapse: 'collapse', width: '100%' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'center' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>
              Température (°C)
            </th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Heure</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} style={{ textAlign: 'center' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {entry.temp}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {entry.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TempTable;
