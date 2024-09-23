import React, { useState, useEffect } from 'react';
import TasksList from './TasksList';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm'; // Añadimos el nuevo formulario de edición
import axios from 'axios';
import './App.css'; // Importa el archivo CSS

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // Estado para la tarea que se está editando

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTaskToList = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error eliminando tarea:', error);
    }
  };

  // Función para seleccionar una tarea a editar
  const editTask = (task) => {
    setTaskToEdit(task);
  };

  // Función para actualizar la tarea en el estado y en el servidor
  const updateTask = async (updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? response.data : task))
      );
      setTaskToEdit(null); // Reseteamos la tarea que se está editando
    } catch (error) {
      console.error('Error actualizando tarea:', error);
    }
  };

  return (
    <div className="App">
      <h1>Gestor de Tareas</h1>
      <AddTaskForm onTaskAdded={addTaskToList} />
      {taskToEdit ? (
        <EditTaskForm task={taskToEdit} onTaskUpdated={updateTask} />
      ) : (
        <TasksList tasks={tasks} onDeleteTask={deleteTask} onEditTask={editTask} />
      )}
    </div>
  );
}

export default App;

