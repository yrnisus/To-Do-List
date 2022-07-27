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
    sidebar.appendChild(createTasks());
    return sidebar;
}

function createTasks() {
    const tasksArray = ["All tasks", "Today", "This week", "This month"];
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task-wrapper');

    // creates the task ul and appends every default task
    const taskList = document.createElement('ul');
    taskList.classList.add('sidebar-content')
    for(let i=0; i < tasksArray.length; i++) {
        let task = document.createElement('li');
        task.innerText = tasksArray[i];
        taskList.appendChild(task);
    }

    taskWrapper.appendChild(taskList);
    return taskWrapper;
}


function createProjects() {
    const projectWrapper = document.createElement('div');
    projectWrapper.classList.add('project-wrapper');
}