import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { RiHeartAdd2Fill } from "react-icons/ri";

const priorities = [
  { name: "Low", color: "text-green-600" },
  { name: "Medium", color: "text-yellow-600" },
  { name: "High", color: "text-red-600" },
];

const AddTaskForm = ({ onAddTask }) => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddTask({
      title: text,
      description,
      due_date: dueDate,
      priority
    });
    setText("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-3 border border-purple-300 rounded-xl"
        placeholder=" Task Title"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-3 border border-purple-300 rounded-xl"
        placeholder="📝 Description"
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-3 border border-purple-300 rounded-xl"
      />
      <Listbox value={priority} onChange={setPriority}>
        <div className="relative">
          <Listbox.Button className="w-full p-3 border border-purple-300 rounded-xl text-left">
            <span className={priorities.find(p => p.name === priority)?.color}>
              {priority}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-purple-500" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg">
            {priorities.map((p) => (
              <Listbox.Option
                key={p.name}
                value={p.name}
                className={({ active }) =>
                  `cursor-pointer px-4 py-2 ${active ? "bg-purple-100" : ""}`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`${p.color} block truncate`}>{p.name}</span>
                    {selected && (
                      <span className="absolute inset-y-0 right-4 flex items-center text-purple-600">
                        <CheckIcon className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      <div className="sm:col-span-2">
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 text-white px-6 py-3 font-bold rounded-xl w-full flex items-center justify-center gap-2 text-lg hover:scale-105"
        >
          <RiHeartAdd2Fill className="text-2xl" />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
