export default function sidebar() {
    //sidebar
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

    //sidebar Wrapper so I can force margins

    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.classList.add('sidebar-wrapper');

    sidebarWrapper.appendChild(createTasks());
    sidebarWrapper.appendChild(createProjects());

    sidebar.appendChild(sidebarWrapper);
    return sidebar;
}


function createTasks() {
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('sidebar-li-wrapper');
    taskWrapper.appendChild(createTasksHeading());
    taskWrapper.appendChild(createTasksList());
    return taskWrapper;
}

function createTasksHeading() {
    //Tasks
    const tasksHeading = document.createElement('div');
    tasksHeading.classList.add('sidebar-heading');
    tasksHeading.innerHTML = "View";
    return tasksHeading;
}

function createTasksList() {
    const tasksIconArray = ["fa-list", "fa-list-check", "fa-calendar-day", "fa-calendar-week", "fa-calendar-days"];
    const tasksArray = ["All tasks", "Completed tasks", "Today", "This week", "This month"];


    // creates the task ul and appends every default task
    const taskList = document.createElement('ul');
    taskList.classList.add('sidebar-content');

    const taskBtnArray = ['all-tasks', 'completed-tasks', 'today-btn', 'week-btn', 'month-btn']

    for (let i = 0; i < tasksArray.length; i++) {
        let task = document.createElement('li');
        let icon = document.createElement('i');
        // if(i == 0)
        // {
        //  task.id = "all-tasks"
        // }
        task.id = taskBtnArray[i];
        icon.classList.add("fa-solid", tasksIconArray[i]);
        task.appendChild(icon);
        task.innerHTML += tasksArray[i];
        taskList.appendChild(task);
    }

    return taskList;
}


function createProjects() {
    const projectWrapper = document.createElement('div');
    projectWrapper.classList.add('project-wrapper');

    projectWrapper.appendChild(createProjectsHeading());
    projectWrapper.appendChild(createProjectList());
    projectWrapper.appendChild(AddProjectMenu());
    return projectWrapper;
}

function createProjectsHeading() {
    //Projects
    const projectHeading = document.createElement('div');
    projectHeading.classList.add('sidebar-heading');
    projectHeading.innerHTML = "Projects";
    return projectHeading;
}

function createProjectList() {
    const projectList = document.createElement('ul');
    projectList.classList.add('project-list')
    projectList.classList.add('sidebar-content');

    // this creates the initial list
    // for (let i = 0; i < projectsArray.length; i++) {
    //     let project = document.createElement('li');
    //     let icon = document.createElement('i');
    //     icon.classList.add("fa-solid", projectsIconArray[i]);
    //     project.appendChild(icon);
    //     project.innerHTML += projectsArray[i];
    //     const newProjectCloseIcon = document.createElement('i');
    //     newProjectCloseIcon.classList.add('fa-solid', 'fa-xmark', 'close-mark')
    //     project.appendChild(newProjectCloseIcon);
    //     projectList.appendChild(project);
    // }

    return projectList;
}


function AddProjectMenu() {

    const projectAddWrapper = document.createElement('div');
    projectAddWrapper.classList.add('project-add-wrapper', 'sidebar-content');

    const projectAddBtn = document.createElement('li');
    projectAddBtn.setAttribute('id', "project-add-btn");

    const projectIcon = document.createElement('i');
    projectIcon.classList.add('fa-solid', 'fa-plus');

    projectAddBtn.appendChild(projectIcon);
    projectAddBtn.innerHTML += "Add Project";

    const newProjectName = document.createElement('div');
    newProjectName.setAttribute('id', 'newProject');
    newProjectName.innerHTML = '<form id="projectForm" onsubmit="return false" action="#"><input type="text" id="projectName" name="projectName" required><div class="project-form-button-wrapper"><input id="project-submit-btn" class="project-form-button" type="submit" value="Add"><input id="project-cancel-btn" class="project-form-button" type="reset" value="Cancel"></div></input>'
    newProjectName.classList.add('hidden');


    projectAddWrapper.appendChild(projectAddBtn);
    projectAddWrapper.appendChild(newProjectName);
    return projectAddWrapper;
}
