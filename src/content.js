import {createForm} from './dom-manipulation.js';
// import { format, formatDistance, formatRelative, subDays } from 'date-fns'



export default function content() {
    const contentContainer = document.createElement('div');
    contentContainer.classList.add("content-container");


    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content-wrapper');

    contentWrapper.appendChild(createContentHeading());
    

    //creates task list on pageload
    const tasksList = document.createElement('div');
    tasksList.classList.add('tasks-list');
    tasksList.setAttribute('id', 'tasks-list')

    contentWrapper.appendChild(tasksList);
    contentWrapper.appendChild(createForm());

    contentContainer.appendChild(contentWrapper);
    return contentContainer;
}


function createContentHeading() {
    //Creates only the heading for the content page
    //Ex Today 07/27 Wednesday
    const contentHeadingWrapper = document.createElement('div');
    contentHeadingWrapper.classList.add('content-heading-wrapper');

    let contentTitle = document.createElement('div');
    contentTitle.classList.add('content-title');
    // contentTitle.textContent = "Today";

    let title = document.createElement('div');
    title.classList.add('title', 'unselectable');
    title.textContent = "All Tasks";
    contentTitle.appendChild(title);

    const contentTitleRight = document.createElement('div');
    contentTitleRight.classList.add('content-title-right');

    const addTaskWrapper = document.createElement('div');
    addTaskWrapper.classList.add('add-task-wrapper');

    //add Task Btn
    const addTaskBtn = document.createElement('div');
    addTaskBtn.classList.add('add-btn', 'unselectable');
    addTaskBtn.innerHTML += 'Add task';

    const addTaskPlus = document.createElement('div');
    addTaskPlus.classList.add('plus-btn', 'unselectable');
    addTaskPlus.innerHTML+='<i class="fa-solid fa-plus"></i>';

    addTaskWrapper.appendChild(addTaskBtn);
    addTaskWrapper.appendChild(addTaskPlus);

    contentTitleRight.appendChild(addTaskWrapper);
    
    contentTitle.appendChild(contentTitleRight);
    contentHeadingWrapper.appendChild(contentTitle);
    return contentHeadingWrapper;
}
