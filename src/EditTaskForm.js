import React, { useState } from 'react';

const EditTaskForm = ({ task, onTaskUpdated }) => {
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);

  const handleSubmit = (e) => {
    e.preventDefault();
    onTaskUpdated({ ...task, title, completed }); // Actualizamos la tarea
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Tarea</h2>
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
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditTaskForm;
