import {
    format
} from 'date-fns'
import {
    Task
} from './task.js'
import {
    newTaskForm,
    getFormInputs
} from './form.js'

// const testTask = new Task("Garbage", "Take out the trash", new Date(), "Urgent");
// const testTask2 = new Task("Christmas", "Christmas Day", new Date('December 25, 2022'), "Urgent", false);
const taskArray = [];
// taskArray.push(testTask);

//creates div containing the form for a new task and the add task button
function createFormAndAddTaskWrapper() {
    const ele = document.createElement('div');
    ele.classList.add('add-wrapper');
    const addTaskBtn = createAddTaskBtn();
    const newTaskFormWrapper = newTaskForm();
    ele.appendChild(newTaskFormWrapper);
    ele.appendChild(addTaskBtn);
    return ele;
}
//creates the div for the add Task button
function createAddTaskBtn() {
    const addTaskBtn = document.createElement('div');
    addTaskBtn.classList.add('add-task-btn', 'unselectable');
    addTaskBtn.innerHTML += '<i class="fa-solid fa-plus"></i> Add task';
    return addTaskBtn;

}

function addTask(newTask) {
    taskArray.push(newTask);
    createTaskObject(newTask);
}


function createTaskObject(x) {
    const tasksList = document.getElementById('tasks-list');
    const task = document.createElement('div');
    task.classList.add('task');
    let date = cleanDate(x.getDate())
    task.innerHTML = `<div class='task-left'><span class='x' id='completed-icon'><i class='fa-solid fa-circle'></i></span>
    <div id='task-name'>${x.getTaskName()}</div></div><div class='task-right'><div id='task-date'>${date}</div></div>`;

    // Dropdown descriptiono
    const taskDescriptionWrapper = document.createElement('div');
    taskDescriptionWrapper.classList.add('task-description-wrapper')
    taskDescriptionWrapper.innerHTML = `<div class="task-description">${x.getDescription()}</div>`

    // ${format(new Date(taskArray[i].getDate()), 'MM/dd/yyyy')}</div><
    const tasksWrapper = document.createElement('div');
    tasksWrapper.classList.add('task-wrapper');
    tasksWrapper.appendChild(task);
    // tasksWrapper.appendChild(taskDescriptionWrapper);


    tasksList.appendChild(tasksWrapper);
    tasksList.appendChild(taskDescriptionWrapper);
    //changes border-color of task
    setUrgencyColor(tasksWrapper, x.getUrgency());
    const icon = document.querySelector('#completed-icon');
    toggleIcon(icon);
}

//populate initial task list
function populateTaskList() {
    window.addEventListener("load", () => {
        //Circle(Completed) Name Description Date Priority Edit
        // dayText.innerHTML += format(new Date(), 'eeee');
        for (let i = 0; i < taskArray.length; i++) {
            createTaskObject(taskArray[i]);
        }
    })
}

function cleanDate(date) {
    date = format(new Date(date.replaceAll('-', ', ')), 'MM/dd/yy');
    return date;
}

function setUrgencyColor(taskWrapper, urgency) {
    taskWrapper.classList.add(`${urgency}`);
}

function toggleIcon(icon) {
    const svg = document.createElement('i');
    icon.addEventListener('click', () => {
        svg.setAttribute('class', "");
        icon.innerHTML = "";
        if (icon.classList.contains('x')) {
            svg.classList.add('fa-solid', 'fa-circle-check');
            icon.classList.remove('x');
        } else {
            svg.classList.add('fa-solid', 'fa-circle');
            icon.classList.add('x');
        }
        icon.appendChild(svg);
    })
}


function eventListeners() {
    window.addEventListener("load", () => {
        // when add task button is clicked unhide the new task form
        const addTaskBtn = document.querySelector('.add-task-btn')
        const newTaskFormWrapper = document.querySelector('.new-task-form-wrapper');
        addTaskBtn.addEventListener('click', () => {
            if (newTaskFormWrapper.classList.contains('hidden'))
                newTaskFormWrapper.classList.remove('hidden');
            addTaskBtn.classList.add("hidden");
        })


        //when either submit or cancel button is clicked hide the form show the add task button
        document.getElementById('cancel-btn').addEventListener("click", () => {
            if (addTaskBtn.classList.contains('hidden'))
                addTaskBtn.classList.remove('hidden');
            newTaskFormWrapper.classList.add('hidden');
        })
    })
}


populateTaskList();
eventListeners();
export {
    createFormAndAddTaskWrapper,
    addTask
};