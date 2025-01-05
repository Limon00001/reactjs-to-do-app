import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function AddTaskModal({ onCloseModal, onSave, taskToUpdate }) {

    const [task, setTask] = useState(taskToUpdate || {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        tags: [],
        priority: "",
        isFavorite: false
    });
    const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null));

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === "tags") {
            value = value.split(',');
        }
        setTask({
            ...task,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(task);
    };

    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                <div className="bg-[#191D26] p-9 w-[34rem] rounded-lg border border-[#FEFBFB]">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2
                            className="text-2xl font-semibold text-white"
                        >
                            { isAdd ? "Add New Task" : "Edit Task" }
                        </h2>
                        <button
                            className="text-gray-400 text-xl hover:text-white"
                            onClick={onCloseModal}
                        >
                            <IoClose />
                        </button>
                    </div>

                    <hr className="my-4 border-gray-700" />

                    {/* Form */}
                    <form
                        className="mt-4 space-y-4"
                        onSubmit={handleSubmit}
                    >
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-white">
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                className="w-full mt-1 px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#f8e9c6ba]"
                                value={task.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-white">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                className="w-full mt-1 px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#f8e9c6ba]"
                                value={task.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-14">
                            {/* Tags */}
                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-white">
                                    Tags (comma separated)
                                </label>
                                <input
                                    id="tags"
                                    name="tags"
                                    type="text"
                                    className="w-full mt-1 px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#f8e9c6ba]"
                                    value={task.tags.join(", ")} // Convert tags array to a comma-separated string for input
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Priority */}
                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-white">
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    className="w-full mt-1 px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#f8e9c6ba]"
                                    value={task.priority}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center mt-10">
                            <button
                                type="submit"
                                className="px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={() => onSave(task, isAdd)}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
