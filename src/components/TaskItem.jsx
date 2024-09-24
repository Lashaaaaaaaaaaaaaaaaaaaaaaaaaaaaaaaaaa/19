// import { useState } from "react"

// const TaskItem = ({ task, prevStatus, key}) => {
//   const [checked, setChecked] = useState(prevStatus);
//   const [editing, setEditing] = useState(false);
//   const [editedTask, setEditedTask] = useState(task);

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleSave = () => {
//     setEditing(false);
//   };

//   return (
//     <div key={key}>
//       {editing ? (
//         <div>
//           <input
//             type="text"
//             value={editedTask}
//             onChange={(e) => setEditedTask(e.target.value)}
//         />
//         <button onClick={handleSave}>Save</button>
//       </div>        
//       ) : (
//         <div>
//           <h3>{task}</h3>
//           <input
//             type="checkbox"
//             checked={checked}
//             onChange={() => setChecked(!checked)}
//           />
//           {checked ? 'Checked' : 'Unchecked'}
//           <button onClick={handleEdit}>Edit</button>
//         </div>  
//       )}
//     </div>
//   )
// }

// export default TaskItem




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskItem = () => {
  const { id } = useParams();
  const API_KEY = 'V2vGABbPukrRyOO3EQp-vO4UCMaPqIIsf0PxnFMmghZqw4GwvA';
  const [task, setTask] = useState('');
  const [checked, setChecked] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch(`/api/v1/taskList/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTask(data.task);
        setChecked(data.checked);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSave = () => {
    fetch(`/api/v1/taskList/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ task, checked }),
    })
      .then((res) => res.json())
      .then(() => {
        setEditing(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {editing ? (
        <div>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <label>
            Completed:
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </label>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{task}</h3>
          <p>{checked ? 'Completed' : 'Not Completed'}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
