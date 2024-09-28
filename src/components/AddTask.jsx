import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = ({ addTask }) => {
  const [name, setName] = useState('');
  const [assigneeName, setAssigneeName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { name, assigneeName, deadline, isCompleted };
    addTask(newTask);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Task Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Assignee Name" 
        value={assigneeName} 
        onChange={(e) => setAssigneeName(e.target.value)} 
      />
      <input 
        type="date" 
        value={deadline} 
        onChange={(e) => setDeadline(e.target.value)} 
      />
      <label>
        <input 
          type="checkbox" 
          checked={isCompleted} 
          onChange={() => setIsCompleted(!isCompleted)} 
        />
        Completed
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
