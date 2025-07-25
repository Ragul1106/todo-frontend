import { motion } from "framer-motion";
import { MdDescription, MdOutlineLabelImportant } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
    return (
        <motion.li
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="border border-purple-200 rounded-xl p-4 bg-white/80 shadow-md hover:shadow-lg transition duration-300"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className={`text-lg font-bold ${task.is_completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {task.task_name}
                    </h3>
                    {task.description && (
                        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <MdDescription />
                            <span>Description: {task.description}</span>
                        </p>
                    )}
                    {task.due_date && (
                        <p className="text-sm text-purple-700 mt-1 flex items-center gap-1">
                            <HiCalendarDateRange />
                            <span>Date: {new Date(task.due_date).toLocaleString()}</span>
                        </p>
                    )}
                    <p
                        className={`text-sm font-semibold mt-1 flex items-center gap-1 ${task.priority === "High"
                                ? "text-red-500"
                                : task.priority === "Medium"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                            }`}
                    >
                        <MdOutlineLabelImportant />
                        <span>Priority: {task.priority}</span>
                    </p>

                </div>
                <div className="flex flex-col gap-2 items-end">
                    <button
                        onClick={() => onToggleComplete(task)}
                        className="text-xs cursor-pointer text-green-700 hover:underline"
                    >
                        {task.is_completed ? " ↪ Undo" : "✔️ Done"}
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-xs cursor-pointer mt-10 text-red-700 hover:underline"
                    >
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </motion.li>
    );
};

export default TaskItem;