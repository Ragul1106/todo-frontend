import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <ul className="mt-8 space-y-6">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TaskList;
