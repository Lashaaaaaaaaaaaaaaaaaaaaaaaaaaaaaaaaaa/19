// import { useState } from "react"

// const Tasks = ({ onFormSubmit }) => {
//   const [checked, setChecked] = useState(false);
//   const [task, setTask] = useState('');

//   const onSubmit = (e) => {
//     e.preventDefault();
//     onFormSubmit(task, checked);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input 
//           type="text"
//           placeholder="Enter Task"
//           onChange={(e) => setTask(e.target.value)}
//         />
//         <label>
//           <input 
//             type="checkbox"
//             checked={checked}
//             onChange={() => setChecked(!checked)}
//           />{' '}
//           Mark as completed   
//         </label>
//         <button type="submit">Add Task</button>  
//       </form>
//     </div>
//   );
// };

// export default Tasks



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tasks = ({ onFormSubmit }) => {
  const [task, setTask] = useState('');
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(task, checked);
    navigate('/');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default Tasks;
