import { format } from 'date-fns'
//What does a task have
//Title, Description, Date, Completed Status, priority
//searchable tags would be cool

class Task {
    //private variabes
    #title;
    #description;
    #date;
    #priority;
    #completed;

    constructor(title, description, date, priority, completed) {
        this.#title = title;
        this.#description = description;
        this.#date = date;
        this.#priority = priority;
        this.#completed = completed;
    }
    //public getters
        getTitle = () => this.#title;
        getDescription = () => this.#description;
        getDate = () => this.#date;
        getPriority = () => this.#priority;
        getCompleted = () => this.#completed;
}

const testTask = new Task("Garbage1", "Take out the trash", new Date(), "Urgent", false);
const taskArray = [testTask, createAddTaskBtn()];
//should always be at the end of task list

function createAddTaskBtn() {
    const addTaskBtn = document.createElement('div');
    addTaskBtn.classList.add('task', 'add-task-btn');
    addTaskBtn.innerHTML+="Add task";
    return addTaskBtn;
}

function populateTaskList() {
    const tasksList = document.createElement('div');
    tasksList.classList.add('tasks-list');
    //Circle(Completed) Name Description Date Priority Edit
    for (let i = 0; i < taskArray.length; i++) {
        const task = document.createElement('div');
        task.classList.add('task');
        task.innerHTML= `${taskArray[0].getCompleted()}`;
        tasksList.appendChild(task);
    }

    return tasksList;

}




export { Task, populateTaskList, taskArray };