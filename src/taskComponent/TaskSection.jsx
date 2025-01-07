import { useState } from "react";

import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskLists from "./TaskLists";

const TaskSection = () => {

    const initialTasks = [
        {
            "id": crypto.randomUUID(),
            "title": "Complete project report",
            "description": "Finalize and submit the project report by the end of the week.",
            "tags": ["work", "urgent", "report"],
            "priority": "High",
            "isFavorite": true
        },
        {
            "id": crypto.randomUUID(),
            "title": "Grocery shopping",
            "description": "Buy vegetables, fruits, and snacks for the week.",
            "tags": ["personal", "shopping", "weekly"],
            "priority": "Medium",
            "isFavorite": false
        },
        {
            "id": crypto.randomUUID(),
            "title": "Read book chapter 4",
            "description": "Finish reading the fourth chapter of the current book for the book club.",
            "tags": ["personal", "reading", "book club"],
            "priority": "Low",
            "isFavorite": false
        },
        {
            "id": crypto.randomUUID(),
            "title": "Team meeting",
            "description": "Discuss project updates and upcoming deadlines with the team.",
            "tags": ["work", "meeting", "team"],
            "priority": "High",
            "isFavorite": true
        }
    ];

    const [tasks, setTasks] = useState(initialTasks);
    const [showModal, setShowModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    const handleAddEditTask = (newTask, isAdd) => {
        if (isAdd) {
            setTasks([...tasks, newTask]);
        } else {
            const updatedTasks = tasks.map(task => task.id === newTask.id ? newTask : task);
            setTasks(updatedTasks);
        }
        setShowModal(false);
    };

    const handleEditTask = (editedTask) => {
        // send edited task information to modal
        setTaskToUpdate(editedTask);
        // open modal
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setTaskToUpdate(null);
    };

    const handleDeleteTask = (taskId) => {
        const deletedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(deletedTasks);
    };

    const handleFavoriteTask = (taskId) => {
        const isFavoriteTask = tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task,
                    isFavorite: !task.isFavorite
                }
            }
            return task;
        })
        setTasks(isFavoriteTask);
    };

    const handleDeleteAllTask = () => {
        // clear all tasks - method 01
        // tasks.length = 0;
        // setTasks(tasks);

        // clear all tasks - method 02
        setTasks([]);
    };

    const handleSearchTerm = (searchTerm) => {
        const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setTasks([...filteredTasks]);
    };

    return (
        <section className="mb-20" id="tasks">
            {
                showModal &&
                <AddTaskModal
                    onCloseModal={handleCloseModal}
                    onSave={handleAddEditTask}
                    taskToUpdate={taskToUpdate}
                />
            }
            <div className="container">
                {/* <!-- Search Box --> */}
                <div className="p-2 flex justify-end">
                    <form>
                        <div className="flex">
                            <SearchTask
                                onSearch={handleSearchTerm}
                            />
                        </div>
                    </form>
                </div>
                {/* <!-- Search Box Ends --> */}
                <div
                    className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskAction
                        onAddClick={() => setShowModal(true)}
                        onDeleteAllClick={handleDeleteAllTask}
                    />
                    {
                        !tasks || tasks.length > 0 ?
                            <TaskLists
                                tasks={tasks}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                onFavorite={handleFavoriteTask}
                            /> :
                            <NoTaskFound />
                    }
                </div>
            </div>
        </section>
    )
}

export default TaskSection