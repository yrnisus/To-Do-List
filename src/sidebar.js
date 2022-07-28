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
    tasksHeading.innerHTML = "Tasks";
    return tasksHeading;
}

function createTasksList() {
    const tasksIconArray = ["fa-list", "fa-calendar-day", "fa-calendar-week", "fa-calendar-days"];
    const tasksArray = ["All tasks", "Today", "This week", "This month"];


    // creates the task ul and appends every default task
    const taskList = document.createElement('ul');
    taskList.classList.add('sidebar-content');
    
    for(let i=0; i < tasksArray.length; i++) {
        let task = document.createElement('li');
        let icon = document.createElement('i');
        icon.classList.add("fa-solid", tasksIconArray[i]);
        task.appendChild(icon);
        task.innerHTML+= tasksArray[i];
        taskList.appendChild(task);
    }

    return taskList;
}


function createProjects() {
    const projectWrapper = document.createElement('div');
    projectWrapper.classList.add('project-wrapper');

    projectWrapper.appendChild(createProjectsHeading());
    projectWrapper.appendChild(createProjectList());
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
    const projectsArray = ["Add Project"];
    const projectsIconArray = ["fa-plus"];

    const projectList = document.createElement('ul');
    projectList.classList.add('sidebar-content');

    for(let i=0; i < projectsArray.length; i++) {
        let project = document.createElement('li');
        let icon = document.createElement('i');
        icon.classList.add("fa-solid", projectsIconArray[i]);
        project.appendChild(icon);
        project.innerHTML+= projectsArray[i];
        projectList.appendChild(project);
    }



    return projectList;
}