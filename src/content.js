import {format} from 'date-fns'
import {createFormAndAddTaskWrapper} from './dom-manipulation.js';
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
    contentWrapper.appendChild(createFormAndAddTaskWrapper());

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
    title.classList.add('title');
    title.textContent = "All Tasks";
    contentTitle.appendChild(title);


    const dateWrapper = document.createElement('div');
    dateWrapper.classList.add('date-wrapper');

    const dayText = document.createElement('div');
    dayText.innerHTML += format(new Date(), 'eeee');

    const dayDate = document.createElement('div');
    dayDate.innerHTML += format(new Date(), 'MM/dd');

    dateWrapper.appendChild(dayDate);
    dateWrapper.appendChild(dayText);

    contentTitle.appendChild(dateWrapper);
    contentHeadingWrapper.appendChild(contentTitle);
    return contentHeadingWrapper;
}
