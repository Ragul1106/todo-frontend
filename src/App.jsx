import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import ErrorAlert from "./components/ErrorAlert";

const BASE_URL = "https://todo-backend-qztw.onrender.com";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const loadTasks = () => {
    axios.get(`${BASE_URL}/api/tasks`)
      .then((res) => setTasks(res.data))
      .catch(() => setError("❌ Could not load tasks"));
  };

  const addTask = (taskData) => {
    axios.post(`${BASE_URL}/api/tasks`, taskData)
      .then(loadTasks)
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

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-purple-200"
      >
        <h1 className="text-4xl font-extrabold mb-6 text-center text-purple-800 drop-shadow-sm">✨ Task Organizer</h1>
        
        {error && <ErrorAlert message={error} />}
        
        <AddTaskForm onAddTask={addTask} />
        
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
        />
      </motion.div>
    </div>
  );
};

export default App;