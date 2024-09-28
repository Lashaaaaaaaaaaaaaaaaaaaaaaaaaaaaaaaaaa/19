import { Link } from "react-router-dom";

const TaskList = ({ taskList }) => {
  return (
    <div>
      <h1>Task List</h1>
      <Link to="/add">Add New Task</Link>
      <ul>
        {taskList.map((task) => (
          <li key={task._uuid}>
            <h3>{task.name}</h3>
            <p>Assigned to: {task.assigneeName}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Status: {task.isCompleted ? 'Completed' : 'Incomplete'}</p>
            <Link to={`/edit/${task._uuid}`}>Edit Task</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
