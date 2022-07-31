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
    //taskList is the container for every task
    const tasksList = document.getElementById('tasks-list');
    //taskContainer is an individual line, completion square with taskWrapper next to it
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    //completion square is the square you click to mark a task complete
    const completionSquare = document.createElement('div');
    completionSquare.setAttribute('id', "completion-square");

    const task = document.createElement('div');
    task.classList.add('task');
    let date = cleanDate(x.getDate())
    task.innerHTML = `<div class='task-left'><span class='x' id='completed-icon'><i class='task-icon fa-solid fa-circle-chevron-down'></i></span>
    <div class='task-name-date-wrapper'><div id='task-name'>${x.getTaskName()}</div><div id='task-date'>${date}</div></div></div><div class='task-right'><i id='empty-circle' class='task-icon fa-solid fa-circle'></i><i id='pencil' class='task-icon fa-solid fa-pencil'></i><i class='task-icon fa-solid fa-circle-xmark'></i></div>`;

    // Dropdown descriptiono
    const taskDescriptionWrapper = document.createElement('div');
    taskDescriptionWrapper.classList.add('task-description-wrapper')
    taskDescriptionWrapper.innerHTML = `<div class="task-description">${x.getDescription()}</div>`

    // ${format(new Date(taskArray[i].getDate()), 'MM/dd/yyyy')}</div><
    const tasksWrapper = document.createElement('div');
    tasksWrapper.classList.add('task-wrapper');
    tasksWrapper.appendChild(task);
    // tasksWrapper.appendChild(taskDescriptionWrapper);

    //append the square to the container 
    taskContainer.appendChild(completionSquare);
    //apend the taskWrapper to the container
    taskContainer.appendChild(tasksWrapper);
    //append the entire line to the tasksList
    tasksList.appendChild(taskContainer);
    tasksList.appendChild(taskDescriptionWrapper);
    const allIcons = task.querySelectorAll('.task-icon');
    //changes border-color of task
    setUrgencyColor(tasksWrapper, allIcons, x.getUrgency());
    // const icon = task.querySelector('#completed-icon');
    toggleIcon(x.getUrgency(), tasksWrapper, taskDescriptionWrapper);
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

function setUrgencyColor(taskWrapper, allIcons, urgency) {
    taskWrapper.classList.add(`${urgency}`);
    for(let i=0; i < allIcons.length; i++) {
        allIcons[i].classList.add(`${urgency}`);
    }
}

function toggleIcon(urgency, taskWrapper, taskDescriptionWrapper) {
    const icon = taskWrapper.querySelector('#completed-icon');
    console.log(taskWrapper);
    let view;
    icon.addEventListener('click', () => {
        if (icon.classList.contains('x')) {
            icon.innerHTML = `<i class='task-icon fa-solid fa-circle-chevron-up ${urgency}'></i>`
            icon.classList.remove('x');
            taskWrapper.style.borderRadius = '50px 50px 0px 0px';
            view = 'flex';
        } else {
            icon.innerHTML = `<i class='task-icon fa-solid fa-circle-chevron-down ${urgency}'></i>`
            icon.classList.add('x');
            taskWrapper.style.borderRadius = '50px 50px 50px 50px';
            view = 'none';
        }
        toggleDescription(view, taskDescriptionWrapper);
    })
}


// function toggleIcon(icon, urgency, taskDescriptionWrapper) {
//     icon.addEventListener('click', () => {
//         if (icon.classList.contains('x')) {
//             icon.innerHTML = `<i class='task-icon fa-solid fa-circle-chevron-up ${urgency}'></i>`
//             icon.classList.remove('x');
//             taskDescriptionWrapper.style.display = "flex";
//         } else {
//             icon.innerHTML = `<i class='task-icon fa-solid fa-circle-chevron-down ${urgency}'></i>`
//             icon.classList.add('x');
//             taskDescriptionWrapper.style.display = "none";
//         }
//     })
// }

function toggleDescription(view, taskDescriptionWrapper) {
    taskDescriptionWrapper.style.display = view;
    // console.log();
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