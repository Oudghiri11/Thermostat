import { useState } from 'react';
import axios from 'axios';

export default function Settings() {
  const [targetTemp, setTargetTemp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/set-temperature', { targetTemp });
  };

  return (
    <div>
      <h1>Définir Température Cible</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={targetTemp}
          onChange={(e) => setTargetTemp(e.target.value)}
          placeholder="Température en °C"
        />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}
