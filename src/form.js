import {
    Task
} from './task.js'
import {
    addTask
} from './dom-manipulation.js'
import {
    Storage
} from './storage.js'

function newTaskForm() {
    //creates the form to add a task
    const newTaskFormWrapper = document.createElement('div');
    newTaskFormWrapper.classList.add('new-task-form-wrapper', 'hidden');
    newTaskFormWrapper.innerHTML = '<form id ="taskForm" onsubmit="return false" action="#"><label for="taskName">Task:</label><input type="text" id="taskName" name="taskName" required><label for="description">Description:</label><textarea name="description" id="description" rows="3"></textarea><label for="date">Date:</label><input type="date" onfocus="this.showPicker()" id="date" name="date" required ><label for="urgency">Urgency:</label><select name="urgency" id="urgency" required><option value="" >--Please select an option--</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select><div class="form-button-wrapper"><input class="form-button" type="submit" value="Add"><input id="cancel-btn" class="form-button" type="reset" value="Cancel"></div></form>';

    //date picker causes an issue with dates

    //adds the event listener to the form submission to get input values
    const form = newTaskFormWrapper.querySelector('form');
    getFormInputs(form);
    return newTaskFormWrapper;
}


function getFormInputs(form) {
    form.addEventListener('submit', function () {

        //date picker causes an issue with dates something to do with UTC


        //gets the user input from form and creates a new task
        const formData = new FormData(form);
        const formProps = Object.fromEntries(formData);
        console.log(formProps);
        //need to create a new Task Object
        const newTask = new Task(formProps);
        newTask.date = fixDate(newTask.date);
        // this needs to get active project 
        // newTask.setProjectID(Storage.getProjectID())
        newTask.setProjectID(Storage.getActiveProject())
        Storage.addTask(newTask);
        // addTask(newTask);

        // clear the values of the form

        // hide the form
        const addTaskBtn = document.querySelector('.add-task-btn');
        const newTaskFormWrapper = document.querySelector('.new-task-form-wrapper');
        if (addTaskBtn.classList.contains('hidden'))
            addTaskBtn.classList.remove('hidden');
        newTaskFormWrapper.classList.add('hidden');
    })
}


function fixDate(taskDate) {
    let date = new Date(taskDate);
    date = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate());
    console.log('Fix Date ' + date);
    return date;
    // this needs to get active proj
}

export {
    newTaskForm,
    getFormInputs
}