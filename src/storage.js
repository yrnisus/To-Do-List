import {
    Project
} from './project'
import {
    Task
} from './task'

//Save names of project as an array?
let projectArray = [];
let taskArray = [];

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

    static setProjects() {
        localStorage.setItem('projects', JSON.stringify(projectArray));
     }

    static projectList() {
        return JSON.parse(localStorage.getItem("projects"));
    }

    static createProjectList() {
        projectArray = JSON.parse(localStorage.getItem("projects"));
    }

    static addProject(project) {
        projectArray.push(project);
        this.setProjects();
    }

    static removeProject(project) {
        projectArray.splice(projectArray.indexOf(project));
        console.log(projectArray);
        this.setProjects();
    }

    // Tasks

    static setTasks() {
        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }

    static getTaskList() {
        return JSON.parse(localStorage.getItem("tasks"));
    }


    //theres an error. I have to create the local storage the first time and then it works every time afterwards
    // localStorage.setItem('tasks', JSON.stringify(taskArray));


    static createTaskList() {
        taskArray = JSON.parse(localStorage.getItem("tasks"));
        console.log(taskArray);
    }

    static addTask(task) {
        taskArray.push(task);
        this.setTasks();
    }

    static removeTask(task) {
        taskArray.splice(taskArray.indexOf(task));
        console.log(taskArray);
        this.setTasks();
    }


}

if (storageAvailable('localStorage')) {
    Storage.createProjectList();
    Storage.createTaskList();
  }

console.log(projectArray);