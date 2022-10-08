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
import {
    create
} from 'lodash'

const taskArray = [];


//creates div containing the form for a new task and the add task button
function createFormAndAddTaskWrapper() {
    const ele = document.createElement('div');
    ele.classList.add('add-wrapper');
    // const addTaskBtn = createAddTaskBtn();
    const newTaskFormWrapper = newTaskForm();
    const modal = editModal();

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    ele.appendChild(modal);
    ele.appendChild(newTaskFormWrapper);
    // ele.appendChild(addTaskBtn);
    return ele;
}
//creates the div for the add Task button
//modal
function createAddTaskModal() {
    const addTaskModal = document.createElement('div');
    addTaskBtn.classList.add('add-task-btn', 'unselectable');
    addTaskBtn.innerHTML += '<i class="fa-solid fa-plus"></i> Add task';
    return addTaskBtn;

}

function setTasks(taskArray) {
    //gets the array of tasks from storage then displays them in the task list
    // const taskArr = Storage.getTaskList();
    const tasksList = document.getElementById('tasks-list');
    while (tasksList.firstChild) {
        tasksList.removeChild(tasksList.firstChild)
    }
    taskArray.forEach((task) => {
        addTask(task);
    })
}

function addTask(taskObj) {
    //receives as object
    const urgency = taskObj.urgency;
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
    let date = cleanDate(taskObj.date)
    task.innerHTML =
        `<div class='task-left'>
        <div id='task-completion-btn'><i class='task-icon fa-solid fa-circle-check'></i></div>
        <div class='task-name-date-wrapper'>
            <div id='task-name'>${taskObj.taskName}</div>
        </div>
    </div>
    <div class='task-right'>
        <div id='task-date-wrapper'>
            <div id='task-date'>${date[0]}</div>
            <div>${date[1]}</div>
        </div>
    <span class='x' id='toggle-description-icon'>
        <i class='task-icon fa-solid fa-circle-chevron-down'></i>
    </span>
    <div class='task-icon' id='task-remove-btn'><i class='fa-solid fa-trash'></i></div>
    </div>`;


    const coloredBorderDiv = document.createElement('div');
    coloredBorderDiv.classList.add('colored-border', urgency)

    // Dropdown description
    const taskDescriptionWrapper = document.createElement('div');
    taskDescriptionWrapper.classList.add('task-description-wrapper')
    taskDescriptionWrapper.appendChild(createEditBtn(urgency, taskObj));


    const taskDescription = document.createElement('div');
    taskDescription.classList.add('task-description');

    //doesnt allow event listener for some reason?
    // taskDescription.appendChild(createEditBtn(urgency));

    taskDescription.innerHTML += `<div class='task-description-text'>${taskObj.description}</div>`;
    taskDescriptionWrapper.appendChild(taskDescription);

    // ${format(new Date(taskArray[i].getDate()), 'MM/dd/yyyy')}</div><
    const tasksWrapper = document.createElement('div');
    tasksWrapper.classList.add('task-wrapper');
    tasksWrapper.appendChild(task);

    //append the square to the container 
    // taskContainer.appendChild(completionSquare);

    //apend the taskWrapper to the container
    taskContainer.appendChild(tasksWrapper);
    createRemoveTaskBtn(taskObj, taskContainer);
    createCompletionBtn(taskObj, taskContainer);
    if (Storage.getCompletion(taskObj)) {
        const taskName = taskContainer.querySelector('#task-name')
        taskName.classList.add('strike');
        taskContainer.classList.add('complete');
    }
    // toggleComplete()
    //append the entire line to the tasksList
    tasksList.appendChild(taskContainer);
    tasksList.appendChild(coloredBorderDiv);
    tasksList.appendChild(taskDescriptionWrapper);
    const allIcons = task.querySelectorAll('.task-icon');
    //changes border-color of task
    setUrgencyColor(tasksWrapper, allIcons, urgency);
    // const icon = task.querySelector('#toggle-description-icon');
    toggleDropdown(urgency, tasksWrapper, taskDescriptionWrapper);
}

function createCompletionBtn(taskObj, taskContainer) {
    const taskCompletionBtn = taskContainer.querySelector('#task-completion-btn');
    taskCompletionBtn.addEventListener('click', () => {
        toggleComplete(taskObj, taskContainer);
    })
}

function toggleComplete(taskObj, taskContainer) {
    const taskName = taskContainer.querySelector('#task-name')
    if (!Storage.getCompletion(taskObj)) {
        taskName.classList.add('strike');
        taskContainer.classList.add('complete');
        Storage.setCompletion(taskObj, true);
    } else {
        taskName.classList.remove('strike');
        taskContainer.classList.remove('complete');
        Storage.setCompletion(taskObj, false);
    }
}


function createRemoveTaskBtn(taskObj, taskContainer) {
    //btn to remove a task
    const taskRemoveBtn = taskContainer.querySelector('#task-remove-btn');
    taskRemoveBtn.addEventListener('click', () => {
        removeTask(taskObj, taskContainer);
    })
}

//needs to send the object to Storage
function removeTask(taskObj, taskContainer) {
    //removes the div
    taskContainer.remove();
    Storage.removeTask(taskObj);
}

function cleanDate(date) {
    let newDate = [];
    newDate[0] = format(new Date(date), 'MM/dd');
    newDate[1] = format(new Date(date), 'yyyy');
    return newDate;
}

function setUrgencyColor(taskWrapper, allIcons, urgency) {
    taskWrapper.classList.add(`${urgency}`);
    for (let i = 0; i < allIcons.length; i++) {
        allIcons[i].classList.add(`${urgency}`);
    }
}

function toggleDropdown(urgency, taskWrapper, taskDescriptionWrapper) {
    const icon = taskWrapper.querySelector('#toggle-description-icon');
    let view;
    icon.addEventListener('click', () => {
        if (icon.classList.contains('x')) {
            icon.innerHTML = `<i class='task-icon fa-solid fa-circle-chevron-up ${urgency}'></i>`
            icon.classList.remove('x');
            taskWrapper.style.borderRadius = '15px 15px 0px 0px';
            taskWrapper.style.borderBottom = "none";
            taskDescriptionWrapper.style.borderRadius = '0px 0px 15px 15px';
            view = 'flex';
        } else {
            icon.innerHTML = `<i class='task-icon fa-solid fa-circle-chevron-down ${urgency}'></i>`
            icon.classList.add('x');
            taskWrapper.style.borderRadius = '15px';
            taskWrapper.style.borderBottom = "3px solid black";
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

function createEditBtn(urgency, taskObj) {
    const editBtn = document.createElement('button');
    editBtn.id = 'edit-btn';
    editBtn.classList.add('hidden-btn');
    editBtn.addEventListener('click', () => {
        populateEditModal(taskObj);
        showEditModal();
        Storage.setEditTaskID(taskObj.taskID);
    })

    const emptyCircle = document.createElement('i');
    emptyCircle.classList.add('clickthrough', 'task-icon', 'fa-solid', 'fa-circle', urgency, 'empty-circle');

    const pencil = document.createElement('i');
    pencil.classList.add('clickthrough', 'task-icon', 'fa-solid', 'fa-pencil', 'urgency', 'pencil');

    editBtn.appendChild(pencil);
    editBtn.appendChild(emptyCircle);
    editBtn.appendChild(pencil);
    return editBtn;
}

function populateEditModal(taskObj) {
    // Storage.set Dunno
    const editTaskModal = document.getElementById('edit-modal');
    editTaskModal.querySelector('#modalEditName').value = taskObj.taskName;
    editTaskModal.querySelector('#modalEditDescription').value = taskObj.description;
    editTaskModal.querySelector('#modalEditDate').value = format(new Date(taskObj.date), 'yyyy-MM-dd');
    editTaskModal.querySelector('#modalEditUrgency').value = taskObj.urgency;
}

function editModal() {
    const editTaskModal = document.createElement('div');
    editTaskModal.id = 'edit-modal';
    editTaskModal.classList.add('modal');

    console.log()
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML += `<form id="editModalTaskForm" onsubmit="return false" action="#">
    <label for="taskName">Task:</label><input type="text" id="modalEditName" name="taskName" required>
    <label for="description">Description:</label><textarea name="description" id="modalEditDescription" rows="3"></textarea
    <label for="date">Date:</label><input type="date" onfocus="this.showPicker()" id="modalEditDate" name="date" required >
    <label for="urgency">Urgency:</label><select name="urgency" id="modalEditUrgency" required><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
    <div class="form-button-wrapper"><input class="form-button" id="modal-submit-btn" type="submit" value="Edit"><input id="modal-cancel-btn" class="form-button" type="" value="Cancel"></div></form>`;

    modalContent.querySelector('#modal-cancel-btn').addEventListener("click", () => {
        {
            editTaskModal.style.display = "none";
        }
    })


    editTaskModal.appendChild(modalContent);
    return editTaskModal;
}

function showEditModal() {
    const modal = document.getElementById('edit-modal');
    modal.style.display = "flex";
}


function eventListeners() {
    window.addEventListener("load", () => {
        setProjects();
        // setTasks();
        setTasks(Storage.getTaskList());
        // setProjectID();
        // when add task button is clicked unhide the new task form
        const addTaskBtn = document.querySelector('.add-task-wrapper')
        const newTaskFormWrapper = document.querySelector('.new-task-form-wrapper');
        addTaskBtn.addEventListener('click', () => {
            if (newTaskFormWrapper.classList.contains('hidden'))
                newTaskFormWrapper.classList.remove('hidden');
        })

        //when either submit or cancel button is clicked hide the form show the add task button
        document.getElementById('cancel-btn').addEventListener("click", () => {
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
            //gets the user input from form and creates a project object
            let formData = new FormData(projectForm);
            let formProps = Object.fromEntries(formData);
            let newProject = new Project(formProps);

            //project object
            Storage.addProject(newProject);
            addProject(newProject);
        })

        const allTasks = document.getElementById("all-tasks");
        allTasks.addEventListener('click', () => {
            changeTabName("All Tasks");
            Storage.setActiveProject(0);
            // setTasks();
            //testing getting the task list so I can reuse the function for dates
            setTasks(Storage.getTaskList());
        })

        const completedTasks = document.getElementById('completed-tasks');
        completedTasks.addEventListener('click', () => {
            changeTabName("Completed Tasks");
            Storage.setActiveProject(0);
            // setTasks();
            //testing getting the task list so I can reuse the function for dates
            setTasks(Storage.getCompletedTaskList());
        })


        //Date Tabs
        const todayBtn = document.getElementById('today-btn');
        todayBtn.addEventListener('click', () => {
            changeTabName("Today");
            //display an array with the tasks by date
            Storage.setActiveDate('today')
            Storage.setActiveProject(1);
            setTasks(Storage.getTaskList());
            // setTasks();
        })

        const weekBtn = document.getElementById('week-btn');
        weekBtn.addEventListener('click', () => {
            changeTabName("This Week");
            //display an array with the tasks by date
            Storage.setActiveDate('week')
            Storage.setActiveProject(1);
            setTasks(Storage.getTaskList());
            // setTasks();
        })

        const monthBtn = document.getElementById('month-btn');
        monthBtn.addEventListener('click', () => {
            changeTabName("This Month");
            //display an array with the tasks by date
            Storage.setActiveDate('month')
            Storage.setActiveProject(1);
            setTasks(Storage.getTaskList());
            // setTasks();
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

        const editModal = document.getElementById('editModalTaskForm');
        editModal.addEventListener('submit', function () {
            const formData = new FormData(editModal);
            const formProps = Object.fromEntries(formData);
            let date = new Date(formProps.date);
            date = new Date(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate());
            formProps.date = date;
            Storage.editTask(formProps);
            const editTaskModal = document.getElementById('edit-modal');
            editTaskModal.style.display = 'none';
            setTasks(Storage.getTaskList());
        })
    })
}

function addProject(projectObj) {
    const newProject = document.createElement('li');
    setActiveProject(newProject, projectObj);
    toggleRemoveProjectBtn(newProject);
    const newProjectIcon = document.createElement('i');
    newProjectIcon.classList.add("fa-solid", "fa-folder");
    newProject.appendChild(newProjectIcon);
    let projectName = capitalizeFirstLetter(projectObj.projectName);
    newProject.innerHTML += projectName;
    // setProjects(project.getProjectName());
    const newProjectCloseIcon = removeProjectBtn(newProject, projectObj);

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

function removeProjectBtn(projectUI, projectObj) {
    //project is projectUI
    //create an invisible button to handle click events
    const hiddenBtn = document.createElement('button');
    hiddenBtn.classList.add('close-mark', 'hidden-btn');
    hiddenBtn.addEventListener('click', () => {
        removeProject(projectUI, projectObj);

        //not working
        // changeTabName("All Tasks");
        // Storage.setActiveProject(0);
        // setTasks(Storage.getTaskList());
        // console.log("Here")
    })

    //put an svg X inside the hidden button
    const newProjectCloseIcon = document.createElement('i');
    newProjectCloseIcon.classList.add('fa-solid', 'fa-xmark', 'project-xmark', 'hidden');
    hiddenBtn.appendChild(newProjectCloseIcon);
    return hiddenBtn;
}

function toggleRemoveProjectBtn(project) {
    project.addEventListener('mouseover', () => {
        project.querySelector('.project-xmark').classList.remove('hidden');
    })
    project.addEventListener('mouseleave', () => {
        project.querySelector('.project-xmark').classList.add('hidden');
    })
}

function setProjects() {
    const projectArr = Storage.projectList();
    projectArr.forEach((proj) => {
        addProject(proj);
    })
}

function removeProject(projectUI, projectObj) {
    projectUI.remove();
    Storage.removeProject(projectObj);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setActiveProject(projectUI, projectObj) {
    projectUI.addEventListener("click", () => {
        //Changes the Name of the Tab
        changeTabName(projectObj.projectName);
        Storage.setActiveProject(projectObj.projectID);
        //setTasks();
        setTasks(Storage.getTaskList());
    })
}

function changeTabName(tabName) {
    //content-title
    let title = document.querySelector('.title');
    title.textContent = capitalizeFirstLetter(tabName);
}



eventListeners();
export {
    createFormAndAddTaskWrapper,
    setTasks
};