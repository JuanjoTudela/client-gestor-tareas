import React from 'react';
import axios from 'axios';
import './TasksList.css';

// Establecemos la URL de la API directamente
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';


const TasksList = ({ tasks, onDeleteTask, onEditTask }) => {
  const handleCheckboxChange = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    try {
      await axios.put(`${API_URL}/tasks/${task.id}`, updatedTask);
      onEditTask(updatedTask);
    } catch (error) {
      console.error('Error actualizando tarea:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(task)}
            />
            {task.title} - {task.completed ? 'Completada' : 'Pendiente'}
            <button onClick={() => onDeleteTask(task.id)}>Eliminar</button>
            <button onClick={() => onEditTask(task)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;

