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
import {
    Project
} from './project'
import {
    Storage
} from './storage'

const taskArray = [];


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
    Storage.addTask(newTask);
    setTasks();
}


function createTaskObject(x) {
    const urgency = x.getUrgency();
    //taskList is the container for every task
    const tasksList = document.getElementById('tasks-list');
    //taskContainer is an individual line, completion square with taskWrapper next to it
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    //completion square is the square you click to mark a task complete
    // const completionSquare = document.createElement('div');
    // completionSquare.setAttribute('id', "completion-square");

    const task = document.createElement('div');
    task.classList.add('task');
    let date = cleanDate(x.getDate())
    task.innerHTML = `<div class='task-left'><span class='x' id='completed-icon'><i class='task-icon fa-solid fa-circle-chevron-down'></i></span>
    <div class='task-name-date-wrapper'><div id='task-name'>${x.getTaskName()}</div><div id='task-date'>${date}</div></div></div><div class='task-right'></i><i class='task-icon fa-solid fa-circle-check'></i><i class='task-icon fa-solid fa-circle-xmark'></i></div>`;

    // Dropdown description
    const taskDescriptionWrapper = document.createElement('div');
    taskDescriptionWrapper.classList.add('task-description-wrapper')
    // taskDescriptionWrapper.innerHTML+= `<div class="task-description">${x.getDescription()}</div>`

    const taskDescription = document.createElement('div');
    taskDescription.classList.add('task-description');
    taskDescription.appendChild(createEditBtn(urgency));
    taskDescription.innerHTML += `<div class='task-description-text'>${x.getDescription()}</div>`;
    taskDescriptionWrapper.appendChild(taskDescription);

    // ${format(new Date(taskArray[i].getDate()), 'MM/dd/yyyy')}</div><
    const tasksWrapper = document.createElement('div');
    tasksWrapper.classList.add('task-wrapper');
    tasksWrapper.appendChild(task);
    // tasksWrapper.appendChild(taskDescriptionWrapper);

    //append the square to the container 
    // taskContainer.appendChild(completionSquare);

    //apend the taskWrapper to the container
    taskContainer.appendChild(tasksWrapper);
    //append the entire line to the tasksList
    tasksList.appendChild(taskContainer);
    tasksList.appendChild(taskDescriptionWrapper);
    const allIcons = task.querySelectorAll('.task-icon');
    //changes border-color of task
    setUrgencyColor(tasksWrapper, allIcons, urgency);
    // const icon = task.querySelector('#completed-icon');
    toggleDropdown(urgency, tasksWrapper, taskDescriptionWrapper);
}

function cleanDate(date) {
    date = format(new Date(date.replaceAll('-', ', ')), 'MM/dd/yy');
    return date;
}

function setUrgencyColor(taskWrapper, allIcons, urgency) {
    taskWrapper.classList.add(`${urgency}`);
    for (let i = 0; i < allIcons.length; i++) {
        allIcons[i].classList.add(`${urgency}`);
    }
}

function toggleDropdown(urgency, taskWrapper, taskDescriptionWrapper) {
    const icon = taskWrapper.querySelector('#completed-icon');
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
        toggleDescription(urgency, view, taskDescriptionWrapper);
    })
}

function toggleDescription(urgency, view, taskDescriptionWrapper) {
    taskDescriptionWrapper.querySelector('.task-description').classList.add(urgency);
    taskDescriptionWrapper.classList.add(urgency);
    taskDescriptionWrapper.style.display = view;
}

function createEditBtn(urgency) {
    // const editBtnWrapper = document.createElement('div');
    // editBtnWrapper.classList.add('edit-btn-wrapper');

    const editBtn = document.createElement('div');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = "<i id='empty-circle' class='task-icon fa-solid fa-circle'></i><i id='pencil' class='task-icon fa-solid fa-pencil'>";
    editBtn.querySelector('#empty-circle').classList.add(urgency);
    // editBtnWrapper.appendChild(editBtn)
    return editBtn;
}



function eventListeners() {
    window.addEventListener("load", () => {
        setProjects();
        setTasks();
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

        //when add project is clicked hide the add project button and show the project name field
        const projectAddBtn = document.getElementById('project-add-btn');
        projectAddBtn.addEventListener('click', () => {
            projectAddBtn.classList.add('hidden');
            const projectForm = document.getElementById('newProject')
            projectForm.classList.remove("hidden");
        })

        //checks input on submit
        projectForm.addEventListener('submit', function () {
            //gets the user input from form and creates a new project
            let formData = new FormData(projectForm);
            let formProps = Object.fromEntries(formData);
            let newProject = new Project(formProps);

            //project object
            Storage.addProject(newProject.getProjectName());
            addProject(newProject.getProjectName());
        })

        const projectCancelBtn = document.getElementById('project-cancel-btn');
        projectCancelBtn.addEventListener('click', () => {
            hideProjectAddBtn();
        })

        const projectCloseBtns = document.querySelectorAll('.close-mark');
        projectCloseBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.remove();
            })
        })
    })
}


function addProject(project) {
    const newProject = document.createElement('li');
    toggleRemoveProjectBtn(newProject);
    const newProjectIcon = document.createElement('i');
    newProjectIcon.classList.add("fa-solid", "fa-folder");
    newProject.appendChild(newProjectIcon);
    newProject.innerHTML += project;
    // setProjects(project.getProjectName());
    const newProjectCloseIcon = removeProjectBtn(newProject);

    newProject.appendChild(newProjectCloseIcon);
    document.querySelector('.project-list').insertBefore(newProject, document.getElementById('project-add-wrapper'));
    hideProjectAddBtn();
}


function hideProjectAddBtn() {
    const projectForm = document.getElementById('newProject')
    projectForm.classList.add("hidden");
    document.getElementById('project-add-btn').classList.remove('hidden');
    document.getElementById('projectName').value = "";
}

function removeProjectBtn(project) {
    //create an invisible button to handle click events
    const hiddenBtn = document.createElement('button');
    hiddenBtn.classList.add('close-mark', 'hidden-btn');
    hiddenBtn.addEventListener('click', () => {
        removeProject(project);
    })

    //put an svg X inside the hidden button
    const newProjectCloseIcon = document.createElement('i');
    newProjectCloseIcon.classList.add('fa-solid', 'fa-xmark', 'x', 'hidden');
    hiddenBtn.appendChild(newProjectCloseIcon);
    return hiddenBtn;
}

function toggleRemoveProjectBtn(project) {
    project.addEventListener('mouseover', () => {
        project.querySelector('.x').classList.remove('hidden');
    })
    project.addEventListener('mouseleave', () => {
        project.querySelector('.x').classList.add('hidden');
     })
}

  function setProjects() {
    const projectArr = Storage.projectList();
    projectArr.forEach((proj) => {
        addProject(proj);
    })
  }

  function setTasks() {
    const taskArr = Storage.getTaskList();
    console.log(taskArr[0]);
    taskArr.forEach((task) => {
        createTaskObject(task);
    })
  }

function removeProject(project) {
    project.remove();
    Storage.removeProject();
}

eventListeners();
export {
    createFormAndAddTaskWrapper,
    addTask
};