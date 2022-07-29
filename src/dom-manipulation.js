import { format } from 'date-fns'
import {Task} from './task.js'

// const testTask = new Task("Garbage", "Take out the trash", new Date(), "Urgent", false);
// const testTask2 = new Task("Christmas", "Christmas Day", new Date('December 25, 2022'), "Urgent", false);
// const taskArray = [testTask, testTask2];
const taskArray = [];

//creates div containing the form for a new task and the add task button
function addTask() {
    const ele = document.createElement('div');

    const addTaskBtn = createAddTaskBtn();
    const newTaskFormWrapper = newTaskForm();
    addTaskBtn.addEventListener('click', () => {
        if(newTaskFormWrapper.classList.contains('hidden'))
        newTaskFormWrapper.classList.remove('hidden');
        addTaskBtn.classList.add("hidden");
    })

   newTaskFormWrapper.querySelectorAll('button').forEach(button => {
    button.addEventListener("click", () => {
        if(addTaskBtn.classList.contains('hidden'))
            addTaskBtn.classList.remove('hidden');
        newTaskFormWrapper.classList.add('hidden');
    })
  })
    ele.appendChild(newTaskFormWrapper);
    ele.appendChild(addTaskBtn);

    return ele;
}
//creates the div for the add Task button
function createAddTaskBtn() {
    const addTaskBtn = document.createElement('div');
    addTaskBtn.classList.add('task', 'add-task-btn');
    addTaskBtn.innerHTML+='<i class="fa-solid fa-plus"></i> Add task';
    return addTaskBtn;

}

function newTaskForm() {
    //creates the form
    const newTaskFormWrapper = document.createElement('div');
    newTaskFormWrapper.classList.add('new-task-form-wrapper', 'hidden');
    newTaskFormWrapper.innerHTML = '<form onsubmit="return false" action="#"><label for="taskName">Task:</label><input type="text" id="taskName" name="taskName"><label for="description">Description</label><textarea name="description" id="description" rows="3"></textarea><label for="date">Date</label><input type="date" onfocus="this.showPicker()" id="date" name="date"><label for="urgency">Urgency</label><select name="urgency" id="urgencyt"><option value="">--Please select an option--</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select><div class="form-buttons"><input type="submit" value="Submit"><input type="submit" value="Submit"><div></form>';

    // const btn = newTaskFormWrapper.querySelector("#submit-btn");
    //adds the event listener to the form submission to get input values
    const form = newTaskFormWrapper.querySelector('form');
    getFormInputs(form);

    return newTaskFormWrapper;
}


function getFormInputs(form) {
    form.addEventListener('submit', function() {
        const formData = new FormData(form);
        //formProps is an array of all of the data from the form
        const formProps = Object.fromEntries(formData);
        const newTask = new Task(formProps);
        console.log(newTask);

    })
}


// function addTasktoTaskList(form) {
//     form.addEventListener('submit', function() {
//         console.log("Work");
//     })
// }

function populateTaskList() {
    const tasksList = document.createElement('div');
    tasksList.classList.add('tasks-list');
    tasksList.setAttribute('id', 'tasks-list')

    //Circle(Completed) Name Description Date Priority Edit
    // dayText.innerHTML += format(new Date(), 'eeee');
    for (let i = 0; i < taskArray.length; i++) {
        const task = document.createElement('div');
        task.classList.add('task');
        task.innerHTML= `<div class='task-left'><i class='fa-regular fa-circle' id='completed-icon'></i>
        <div id='task-name'>${taskArray[i].getTitle()}</div></div><div class='task-right'><div id='task-date'>${format(new Date(taskArray[i].getDate()), 'MM/dd/yyyy')}</div></div>`;
        const tasksWrapper = document.createElement('div');
        tasksWrapper.classList.add('task-wrapper');
        tasksWrapper.appendChild(task);
        tasksList.appendChild(tasksWrapper);
    }

    return tasksList;

}


export {populateTaskList, addTask};