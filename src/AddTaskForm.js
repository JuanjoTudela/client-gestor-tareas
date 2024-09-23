import React, { useState } from 'react';
import axios from 'axios';
import './AddTaskForm.css';

// Establecemos la URL de la API directamente
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';


const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cambiamos la URL directamente
      const response = await axios.post(`${API_URL}/tasks`, { title, completed });
      console.log('Tarea añadida:', response.data);
      onTaskAdded(response.data);
    } catch (error) {
      console.error('Error añadiendo tarea:', error);
    }
    setTitle('');
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Añadir Tarea</h2>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Completada:</label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </div>
      <button type="submit">Añadir Tarea</button>
    </form>
  );
};

export default AddTaskForm;




