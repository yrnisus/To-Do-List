import {
    indexOf
} from 'lodash';
import {
    Project
} from './project'
import {
    isToday,
    add
} from 'date-fns'

//Save names of project as an array?
let projectArray = [];
let taskArray = [];
//0 is going to be used for all tasks
//1 is going to be used for dates
let projectID = 2;
let taskID = 0;
let activeProject = 0;
let activeDate = "";
let editTaskID = 0;


function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

export class Storage {

    static start() {
        Storage.createProjectList();
        Storage.createProjectID();
        Storage.createTaskList();
        Storage.createActiveProject();
        Storage.createActiveDate();
        Storage.createTaskID();
    }

    static setProjects() {
        localStorage.setItem('projects', JSON.stringify(projectArray));
    }


    static projectList() {
        return JSON.parse(localStorage.getItem("projects"));
    }

    static createProjectList() {
        if (localStorage.projects)
            projectArray = JSON.parse(localStorage.getItem("projects"));
        else {
            localStorage.setItem('projects', JSON.stringify(projectArray));
        }
        // projectArray = JSON.parse(localStorage.getItem("projects" || "[]"));
    }


    static addProject(projectObj) {
        projectObj.projectID = Storage.getProjectID();
        projectArray.push(projectObj);
        this.setProjects();
        this.incrementProjectID();
    }

    static removeProject(projectObj) {
        let removeID = projectObj.projectID;
        //project is the projectID of the project
        projectArray.splice(projectArray.indexOf(removeID));
        //go through task array and remove all tasks with same project
        this.removeProjectTasks(removeID);
        this.setProjects();
        this.setTasks();
        this.setActiveProject(0);
    }

    static removeProjectTasks(removeID) {
        let array = JSON.parse(localStorage.getItem("tasks"));
        taskArray = array.filter(task => task.projectID != removeID);
    }

    ///project ID
    static setProjectID() {
        localStorage.setItem('currentProjectID', projectID);
    }

    static createProjectID() {
        if (localStorage.currentProjectID)
            projectID = localStorage.getItem("currentProjectID");
        else {
            localStorage.setItem('currentProjectID', projectID)
        }
    }

    static incrementProjectID() {
        projectID++;
        this.setProjectID();
    }

    static getProjectID() {
        return localStorage.getItem("currentProjectID");
    }

    //active project manipulation
    static setActiveProject(projectID) {
        localStorage.setItem('activeProjectLocalStorage', projectID);
        activeProject = projectID;
    }

    static createActiveProject() {
        //on page load always start with 0 as active project to show all tasks
        localStorage.setItem('activeProjectLocalStorage', 0);
    }

    static getActiveProject() {
        return localStorage.getItem("activeProjectLocalStorage");
    }

    // Tasks

    static createTaskID() {
        if (localStorage.currentTaskID)
            taskID = localStorage.getItem("currentTaskID");
        else {
            localStorage.setItem('currentTaskID', taskID)
        }
    }

    static getTaskID() {
        return localStorage.getItem("currentTaskID");
    }

    static incrementTaskID() {
        taskID++;
        this.setTaskID();
    }

    static setTaskID() {
        localStorage.setItem('currentTaskID', taskID);
    }

    static setTasks() {
        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }

    //receives a task object and returns the index of the task in the taskArray 
    static getTaskIndex(taskObj) {
        const taskIndex = taskArray.findIndex(object => {
            return object.taskID === taskObj.taskID;
        })
        return taskIndex
    }

    //receives taskID to then find the obj to then find the index. This is terrible code
    static getTaskObj(id) {
        const obj = taskArray.find(object => {
            return object.taskID === id;
        })
        return obj
    }

    static getTaskList() {
        let array = JSON.parse(localStorage.getItem("tasks"));
        let result = array.filter(task => task.projectID == activeProject)
        if (this.getActiveProject() == 0)
            return array
        else if(this.getActiveProject() == 1)
            return this.getTasksByDate(array)
        else
            return result;
        // return JSON.parse(localStorage.getItem("tasks"));
    }

    static getCompletedTaskList() {
        let array = JSON.parse(localStorage.getItem("tasks"));
        let result = array.filter(task => task.completed == true)
        return result;
        // return JSON.parse(localStorage.getItem("tasks"));
    }


    static createTaskList() {
        if (localStorage.tasks)
            taskArray = JSON.parse(localStorage.getItem("tasks" || "[]"));
        else {
            localStorage.setItem('tasks', JSON.stringify(taskArray));
        }
    }

    static addTask(task) {
        //receives task object from form submission
        task.taskID = Storage.getTaskID();
        taskArray.push(task);
        this.setTasks();
        this.incrementTaskID();
    }

    static removeTask(task) {
        const index = this.getTaskIndex(task);
        taskArray.splice(index, 1);
        this.setTasks();
    }

    static getCompletion(taskObj) {
        //receive index of task
        let taskIndex = this.getTaskIndex(taskObj);
        return taskArray[taskIndex].completed;
    }

    static setCompletion(taskObj, status) {
        //receive index of task
        let taskIndex = this.getTaskIndex(taskObj);
        // console.log('Task ' + taskArray[taskIndex])
        // console.log(taskIndex);
        taskArray[taskIndex].completed = status;
        this.setTasks();
    }


    static createActiveDate() {
        if (localStorage.activeDate)
            activeDate = JSON.parse(localStorage.getItem("activeDateLocalStorage"));
        else {
            localStorage.setItem('activeDateLocalStorage', JSON.stringify(activeDate));
        }
    }

    static setActiveDate(dateString) {
        localStorage.setItem("activeDateLocalStorage", dateString);
    }

    static getActiveDate() {
        return localStorage.getItem("activeDateLocalStorage");
    }

    //receives taskList array
    static getTasksByDate(array) {
        let result = '';
        //receive target date as string (today, week, month)
        //create a target date based on the string received
        let dateString = this.getActiveDate();
        let targetDate;
        if (dateString == 'today') {
            //sets a new date to todays date checks the task date to see if its the same
            result = array.filter(task => {
                targetDate = new Date();
                let taskDate = new Date(task.date);
                return targetDate.getUTCDate() == taskDate.getUTCDate()
            })
        }
        if (dateString == 'week') {
            //sets a new date for one week from current date
            result = array.filter(task => {
                targetDate = add(new Date(), {weeks: 1})
                let taskDate = new Date(task.date);
                return targetDate.getUTCDate() - taskDate.getUTCDate() > 0 && targetDate.getUTCMonth() == taskDate.getUTCMonth() && targetDate.getUTCFullYear() == taskDate.getUTCFullYear()
            })
        }
        if (dateString == 'month')
        result = array.filter(task => {
            targetDate = new Date();
            let taskDate = new Date(task.date);
            return targetDate.getUTCMonth() == taskDate.getUTCMonth() && targetDate.getUTCFullYear() == taskDate.getUTCFullYear()
        })
        return result;
    }

    //receives taskID from task when edit button is clicked
    static setEditTaskID(editID) {
        editTaskID = editID;
    }

    static editTask(obj) {
        //receives an obj of the taskName, description, date, and urgency from edit Modal
        let taskObj = this.getTaskObj(editTaskID);
        console.log('here ' + editTaskID);
        console.log("Taskobj " + taskObj);
        let index = this.getTaskIndex(taskObj);
        console.log(index);
        taskArray[index].taskName = obj.taskName;
        taskArray[index].description = obj.description;
        taskArray[index].date = obj.date;
        taskArray[index].urgency = obj.urgency;
        this.setTasks();
    }

    static clearStorage() {
        localStorage.clear();
    }


}

if (storageAvailable('localStorage')) {
    // Storage.clearStorage();
    Storage.start();
    console.log(Storage.getTaskID());
}