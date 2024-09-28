import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";

const API_KEY = 'V2vGABbPukrRyOO3EQp-vO4UCMaPqIIsf0PxnFMmghZqw4GwvA';

const App = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetch('/api/v1/taskList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then((res) => res.json())
    .then((data) => setTaskList(data.items))
    .catch((err) => console.log(err));
  }, []);


  const addTask = (newTask) => {
    fetch('/api/v1/taskList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([newTask]),
    })
    .then((res) => res.json())
    .then((data) => setTaskList((prev) => [...prev, data.items[0]]))
    .catch((err) => console.log(err));
  };
  

  const updateTask = (updatedTask) => {
    fetch(`/api/v1/taskList/${updatedTask._uuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(updatedTask),
    })
    .then(() => {
      setTaskList((prev) =>
        prev.map((task) => (task._uuid === updatedTask._uuid ? updatedTask : task))
      );
    })
    .catch((err) => console.log(err));
  };


  const deleteTask = (taskId) => {
    fetch(`/api/v1/taskList/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then(() => {
      setTaskList((prev) => prev.filter((task) => task._uuid !== taskId));
    })
    .catch((err) => console.log(err));
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList taskList={taskList} />} />
        <Route path="/add" element={<AddTask addTask={addTask} />} />
        <Route path="/edit/:id" element={<EditTask taskList={taskList} updateTask={updateTask} deleteTask={deleteTask} />} />
      </Routes>
    </Router>
  );
};

export default App;
