// import { useEffect, useState } from "react";
// import axios from "axios";

// const BASE_URL = "https://todo-backend-qztw.onrender.com";

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [text, setText] = useState("");
//   const [error, setError] = useState("");

//   const loadTasks = () => {
//     axios.get(`${BASE_URL}/api/tasks`)
//       .then((res) => setTasks(res.data))
//       .catch(() => setError("Tasks could not be loaded."));
//   };

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const addTask = () => {
//     if (!text.trim()) return;
//     axios.post(`${BASE_URL}/api/tasks`, { title: text })
//       .then(() => {
//         setText("");
//         loadTasks();
//       })
//       .catch(() => setError("Could not add task."));
//   };

//   const toggleComplete = (task) => {
//     axios.put(`${BASE_URL}/api/tasks/${task.id}`, { completed: !task.completed })
//       .then(loadTasks)
//       .catch(() => setError("Could not update task."));
//   };

//   const deleteTask = (id) => {
//     axios.delete(`${BASE_URL}/api/tasks/${id}`)
//       .then(loadTasks)
//       .catch(() => setError("Could not delete task."));
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white w-full max-w-md rounded shadow p-6">
//         <h2 className="text-xl font-bold mb-4">To-Do List</h2>
//         {error && <div className="text-red-500 mb-2">{error}</div>}
//         <div className="flex mb-4 gap-2">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="flex-grow p-2 border rounded"
//             placeholder="Add a task"
//           />
//           <button className="bg-blue-500 px-4 text-white rounded" onClick={addTask}>
//             Add
//           </button>
//         </div>
//         <ul>
//           {tasks.map((task) => (
//             <li key={task.id} className="flex justify-between items-center border-b p-2">
//               <span className={task.completed ? "line-through text-gray-400" : ""}>
//                 {task.title}
//               </span>
//               <div className="flex gap-2">
//                 <button onClick={() => toggleComplete(task)} className="text-green-600 text-sm">
//                   {task.completed ? "Undo" : "Done"}
//                 </button>
//                 <button onClick={() => deleteTask(task.id)} className="text-red-600 text-sm">
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default App;


import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
      ...task,
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
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-800">📝 To-Do Manager</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 border rounded"
            placeholder="🧠 Task Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded"
            placeholder="📝 Description"
          />
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border rounded"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border rounded"
          >
            {priorities.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition-all duration-300"
          onClick={addTask}
        >
          ➕ Add Task
        </button>

        <ul className="mt-6 space-y-4">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-lg font-semibold ${task.is_completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                      {task.task_name}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">🗒️ {task.description}</p>
                    )}
                    {task.due_date && (
                      <p className="text-sm text-blue-700 mt-1">📅 {new Date(task.due_date).toLocaleString()}</p>
                    )}
                    <p className={`text-sm font-semibold mt-1 ${
                      task.priority === "High" ? "text-red-500" :
                      task.priority === "Medium" ? "text-yellow-600" :
                      "text-green-600"
                    }`}>
                      ⚡ Priority: {task.priority}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button
                      onClick={() => toggleComplete(task)}
                      className="text-xs text-green-700 hover:underline"
                    >
                      {task.is_completed ? "✅ Undo" : "✔️ Done"}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-xs text-red-700 hover:underline"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default App;
