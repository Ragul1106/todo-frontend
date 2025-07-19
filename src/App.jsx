import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://todo-backend-qztw.onrender.com";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const loadTasks = () => {
    axios.get(`${BASE_URL}/api/tasks`)
      .then((res) => setTasks(res.data))
      .catch(() => setError("Tasks could not be loaded."));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = () => {
    if (!text.trim()) return;
    axios.post(`${BASE_URL}/api/tasks`, { title: text })
      .then(() => {
        setText("");
        loadTasks();
      })
      .catch(() => setError("Could not add task."));
  };

  const toggleComplete = (task) => {
    axios.put(`${BASE_URL}/api/tasks/${task.id}`, { completed: !task.completed })
      .then(loadTasks)
      .catch(() => setError("Could not update task."));
  };

  const deleteTask = (id) => {
    axios.delete(`${BASE_URL}/api/tasks/${id}`)
      .then(loadTasks)
      .catch(() => setError("Could not delete task."));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">To-Do List</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex mb-4 gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="Add a task"
          />
          <button className="bg-blue-500 px-4 text-white rounded" onClick={addTask}>
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center border-b p-2">
              <span className={task.completed ? "line-through text-gray-400" : ""}>
                {task.title}
              </span>
              <div className="flex gap-2">
                <button onClick={() => toggleComplete(task)} className="text-green-600 text-sm">
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-600 text-sm">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
