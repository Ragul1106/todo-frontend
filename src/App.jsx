import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { RiHeartAdd2Fill } from "react-icons/ri";

const BASE_URL = "https://todo-backend-qztw.onrender.com";
const priorities = ["Low", "Medium", "High"];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const loadTasks = () => {
    axios.get(`${BASE_URL}/api/tasks`)
      .then((res) => setTasks(res.data))
      .catch(() => setError("❌ Could not load tasks"));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = () => {
    if (!text.trim()) return;
    axios.post(`${BASE_URL}/api/tasks`, {
      title: text,
      description,
      due_date: dueDate,
      priority
    })
      .then(() => {
        setText(""); setDescription(""); setDueDate(""); setPriority("Medium");
        loadTasks();
      })
      .catch(() => setError("❌ Could not add task"));
  };

  const toggleComplete = (task) => {
    axios.put(`${BASE_URL}/api/tasks/${task.id}`, {
      title: task.task_name,
      description: task.description,
      due_date: task.due_date,
      priority: task.priority,
      is_completed: !task.is_completed
    })
      .then(loadTasks)
      .catch(() => setError("❌ Could not update task"));
  };

  const deleteTask = (id) => {
    axios.delete(`${BASE_URL}/api/tasks/${id}`)
      .then(loadTasks)
      .catch(() => setError("❌ Could not delete task"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-purple-200"
      >
        <h1 className="text-4xl font-extrabold mb-6 text-center text-purple-800 drop-shadow-sm">✨ Task Organizer</h1>

        {error && <div className="text-red-600 font-medium mb-4 text-center">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400"
            placeholder=" Task Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400"
            placeholder="📝 Description"
          />
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-600 font-medium"
          >
            {priorities.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 font-bold rounded-xl w-full transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600 flex items-center justify-center gap-2 text-lg"
          onClick={addTask}
        >
          <RiHeartAdd2Fill className="text-2xl" /> Add Task
        </button>

        <ul className="mt-8 space-y-6">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="border border-purple-200 rounded-xl p-4 bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-lg font-bold ${task.is_completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                      {task.task_name}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">🗒️ {task.description}</p>
                    )}
                    {task.due_date && (
                      <p className="text-sm text-purple-700 mt-1">📅 {new Date(task.due_date).toLocaleString()}</p>
                    )}
                    <p className={`text-sm font-semibold mt-1 ${task.priority === "High" ? "text-red-500" :
                        task.priority === "Medium" ? "text-yellow-600" :
                          "text-green-600"
                      }`}>
                      ⚡ Priority: {task.priority}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button
                      onClick={() => toggleComplete(task)}
                      className="text-xs text-green-700 cursor-pointer hover:underline"
                    >
                      {task.is_completed ? "✅ Undo" : "✔️ Done"}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-xs text-red-700 cursor-pointer hover:underline"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </div>
  );
};

export default App;
