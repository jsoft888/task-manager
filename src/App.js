import React, { useState } from 'react';

function Task({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEdit = () => {
    onEdit(task.id, editedDescription);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => onToggle(task.id)}
          />
          {task.description}
          <button onClick={() => onDelete(task.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

function ListTask({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

function AddTask({ onAdd }) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAdd({
        id: Date.now(),
        description: newTask,
        isDone: false,
      });
      setNewTask('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [showDone, setShowDone] = useState(false);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (taskId, editedDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, description: editedDescription } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = showDone
    ? tasks
    : tasks.filter((task) => !task.isDone);

  return (
    <div>
      <h1>Task List</h1>
      <AddTask onAdd={addTask} />
      <div>
        <label>
          Show Done:
          <input
            type="checkbox"
            checked={showDone}
            onChange={() => setShowDone(!showDone)}
          />
        </label>
      </div>
      <ListTask
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;
