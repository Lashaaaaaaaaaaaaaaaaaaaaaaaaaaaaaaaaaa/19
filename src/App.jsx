// import { useEffect, useState } from "react";
// import Tasks from "./components/Tasks";
// import TaskItem from "./components/TaskItem";

// function App() {
//   const API_KEY = 'V2vGABbPukrRyOO3EQp-vO4UCMaPqIIsf0PxnFMmghZqw4GwvA';
//   const [taskList, setTaskList] = useState([]);

//   const onFormSubmit = (task, checked) => {
//     fetch('/api/v1/taskList', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${API_KEY}`,
//       },
//       body: JSON.stringify([{ task, checked}]),
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error('Failed to create response');
//       return res.json();
//     })
//     .then((data) =>
//       setTaskList((prev) => [
//         ...prev,
//         { task: data.items[0].task, checked: data.items[0].checked, id: data.items[0]._uuid },
//       ])
//     )
//     .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetch('/api/v1/taskList', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${API_KEY}`,
//       },
//     })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Failed to get response');
//       }
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);

//       setTaskList(data.items.map(task => {
//         return (
//           { task: task.task, checked: task.checked, id: task._uuid}
//         )
//       }))
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }, []);

//   return (
//     <div>
//       <Tasks onFormSubmit={onFormSubmit} />
//       {taskList.map((task) => (
//         <TaskItem task={task.task} prevStatus={task.checked} key={task.id} id={task.id}/>
//       ))}
//     </div>
//   );
// }

// export default App;




import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Tasks from './components/Tasks';
import TaskItem from './components/TaskItem';

function App() {
  const API_KEY = 'V2vGABbPukrRyOO3EQp-vO4UCMaPqIIsf0PxnFMmghZqw4GwvA';
  const [taskList, setTaskList] = useState([]);

  const onFormSubmit = (task, checked) => {
    fetch('/api/v1/taskList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([{ task, checked }]),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create response');
        return res.json();
      })
      .then((data) =>
        setTaskList((prev) => [
          ...prev,
          {
            task: data.items[0].task,
            checked: data.items[0].checked,
            id: data.items[0]._uuid,
          },
        ])
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch('/api/v1/taskList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to get response');
        }
        return res.json();
      })
      .then((data) => {
        setTaskList(
          data.items.map((task) => {
            return { task: task.task, checked: task.checked, id: task._uuid };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <div>
        <h1>Task Manager</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new">Add New Task</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                {taskList.map((task) => (
                  <Link key={task.id} to={`/task/${task.id}`}>
                    <h3>{task.task}</h3>
                  </Link>
                ))}
              </div>
            }
          />
          <Route path="/new" element={<Tasks onFormSubmit={onFormSubmit} />} />
          <Route path="/task/:id" element={<TaskItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
