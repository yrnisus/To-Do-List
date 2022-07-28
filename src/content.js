import {format} from 'date-fns'
import Task from './task.js';
// import { format, formatDistance, formatRelative, subDays } from 'date-fns'



export default function content() {
    const contentContainer = document.createElement('div');
    contentContainer.classList.add("content-container");


    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content-wrapper');

    contentWrapper.appendChild(createContentHeading());
    contentWrapper.appendChild(createTasksList());

    contentContainer.appendChild(contentWrapper);
    return contentContainer;
}


function createContentHeading() {
    //Creates only the heading for the content page
    //Ex Today 07/27 Wednesday
    const contentHeadingWrapper = document.createElement('div');
    contentHeadingWrapper.classList.add('content-heading-wrapper');
    
    const contentTitle = document.createElement('div');
    contentTitle.classList.add('content-title');
    contentTitle.textContent = "Today";
    
    const dateWrapper = document.createElement('div');
    dateWrapper.classList.add('date-wrapper');

    const dayText = document.createElement('div');
    dayText.innerHTML+= format(new Date(), 'eeee');

    const dayDate = document.createElement('div');
    dayDate.innerHTML+= format(new Date(), 'MM/dd');

    dateWrapper.appendChild(dayDate);
    dateWrapper.appendChild(dayText);

    contentTitle.appendChild(dateWrapper);
    contentHeadingWrapper.appendChild(contentTitle);


    return contentHeadingWrapper;
}

function createTasksList() {
    const tasksList = document.createElement('div');
    tasksList.classList.add('tasks-list');

    const task = document.createElement('div');
    task.classList.add('task');
    tasksList.appendChild(task);

    return tasksList;
}


const testTask = new Task("Garbage", "Take out the trash", new Date(), "Urgent", false);
console.log(testTask.getTitle());