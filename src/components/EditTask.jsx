import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = ({ taskList, updateTask, deleteTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const foundTask = taskList.find((t) => t._uuid === id);
    if (foundTask) {
      setTask(foundTask);
    }
  }, [id, taskList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task);
    navigate("/");
  };

  const handleDelete = () => {
    deleteTask(id);
    navigate("/");
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
        <input
          type="text"
          value={task.assigneeName}
          onChange={(e) => setTask({ ...task, assigneeName: e.target.value })}
        />
        <input
          type="date"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => setTask({ ...task, isCompleted: !task.isCompleted })}
          />
          Mark as Completed
        </label>
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={handleDelete} style={{ color: 'red' }}>Delete Task</button>
    </div>
  );
};

export default EditTask;
