export default function content() {
    const contentContainer = document.createElement('div');
    contentContainer.classList.add("content-container");

    //get the task sidebar 
    const Sidebar = createSidebar();

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content-wrapper');

    contentContainer.appendChild(Sidebar);
    contentContainer.appendChild(contentWrapper);

    return contentContainer;
}

function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

    return sidebar;
}

function createTasks() {
    //All tasks
    //Today
    //This week
    //this month
    const projectWrapper = document.createElement('div');
    projectWrapper.classList.add('project-wrapper');
}


function createProjects() {
    const projectWrapper = document.createElement('div');
    projectWrapper.classList.add('project-wrapper');
}