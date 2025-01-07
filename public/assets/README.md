## 📋 Procedure

### 1️⃣ Rendering the task list

- The **`TaskSection`** component is a central part of the task management application, responsible for displaying and managing the list of tasks. 

- First, we need to render the task list in the UI. So, initially, we need to render a list of tasks. To do this, we create a array of tasks (objects) and we need to create a `state` variable to store the list of tasks. Then, simply we send the tasks as props to the `TaskList` component. Then `TaskList` component recieve the tasks as props and will render the list of tasks.

### 2️⃣ Adding a new task

- The `AddTaskModal` component is responsible for adding a new task to the task list.

- To add a new task, when we click the **Add Task** button, we need to open the modal. The `TaskAction` component recieve a handler function as a prop, which is used to open the modal.

- In `AddTaskModal`, there was a form with inputs for task details. When the form is submitted, the `handleSubmit` function is called. This function prevents the default form submission behavior and calls the `onSave` handler function with the task details. The `onSave` handler function is called. This function takes the **AddTaskModal's** task details and give them to the parent component.

- Then, parent component recieve the new task details and will add the task to the task list and close the modal.

    ```javascript
    const handleAddEditTask = (newTask) => {
            setTasks([...tasks, newTask]);
            setShowModal(false);
        };
    ```

### 3️⃣ Editing a task

- **_Main theme_**: As we maintain our state in the `TaskSection` (parent) component, so we need to send the a function to the `TaskLists` component. The `TaskLists` component recieve the handler function as a prop. Then, that handler function takes the current task details which we want to edit and give them to the parent component and the parent component will maintain rest of the things.

- First, as we need to edit a task, we need a handler function. The `TaskLists` component recieve a handler function as a prop, which is used to take a task to edit.

- Second, in edit button set onclick handler function for clicking and it will take an arrow function. Inside the arrow function, the handler props will be called with the task details, which means we send the particular task details to the parent component successfully.

- The parent component recieve the task details through a handler function. Now, the handler function will be written with task details as a parameter.

- But alongside, we need to send the details to `AddTaskModal` component. In that case, we can create a new `state` variable and when we wrap the tasks with setter function that means we can get the new task as its initial value and open the modal alongside. Later we can send that value as a prop to the modal component.

- After that, the the modal need to decide if the task is add or edit. To achieve this, we need a state which will decide if the task is empty or null. If empty then it will be add task and if not then it will be edit task. Another state was added the task. In that state, we declare that if the task coming from the parent component is null then it will be add task otherwise if not then it will be edit task.
    ```javascript
        const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null));
        const [task, setTask] = useState(taskToUpdate || {
            id: crypto.randomUUID(),
            title: "",
            description: "",
            tags: [],
            priority: "",
            isFavorite: false
        });
    ```

- So, as we get check state that decide the task is edit or not, we can send the checker when someone click save button and that button send the information to the parent component through a handler function. The handler function now recieve another parameter which is if the task null or not. Based on this information, the handler function will add or update the information.

### 4️⃣ Deleting a task

- For delete functionality, we need to delete an item based on its id. So, we need to get the id. In `TaskLists`component, we already found a task's all details. So, we can get the id from the task details. Now, we need to pass the id to the parent component through a handler function. The parent component recieve the id by that function and will delete the task.

- The parent component recieve the id through a handler function. Now, the handler function will be written with task id as a parameter. After that, we can use the id to filter out the tasks and if the id is not found, that means it returns false and the dom will show that items which is true.

### 5️⃣ Marking a task as favorite

- First, we need the check which task need to be marked as favorite. So, we need to pass the id to the parent component through a handler props function. The parent component recieve the id by that function.

- After that, in handler function, we check if the tasks id and the id we recieve from the handler function are same, then it will be marked as favorite otherwise not. Then, we need to toggle the tasks favorite option.

### 6️⃣ Deleting all tasks

- To delete all tasks, we need to pass the handler function from the parent component. In the parent component, we declare the functions and clear the array of tasks.

### 7️⃣ Searching a task

- **Note**: This method is not the recommendend.

- To search a task, first we need to get the data what is searched or written in the search bar. To get this data, we need to set onChange handler to the input field and to store the fild data, we need a state where the value will be stored.

- When the search button will be clicked, the handler function from parent component take the data to the parent component.

- In the parent component, we have a function which filters tasks based on a search term. It converts both the task title and search term to lowercase and checks if the title includes the search term. The filtered tasks are then updated in the state using `setTasks`. If the output returns true, then the UI will be rendered otherwise not.