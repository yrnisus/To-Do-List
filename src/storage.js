import { indexOf } from 'lodash';
import {
    Project
} from './project'


//Save names of project as an array?
let projectArray = [];
let taskArray = [];
let projectID = 0;

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

    static start(){
        Storage.createProjectList();
        Storage.createProjectID();
        Storage.createTaskList();
    }

    static setProjects() {
        localStorage.setItem('projects', JSON.stringify(projectArray));
     }


    static projectList() {
        return JSON.parse(localStorage.getItem("projects"));
    }

    static createProjectList() {
        projectArray = JSON.parse(localStorage.getItem("projects" || "[]"));
    }


    static addProject(project) {
        projectArray.push(project);
        this.setProjects();
        this.incrementProjectID();
    }

    static removeProject(project) {
        projectArray.splice(projectArray.indexOf(project));
        this.setProjects();
    }

    ///project ID
    static setProjectID() {
        localStorage.setItem('currentProjectID', projectID);
    }

    static createProjectID() {
        if(localStorage.currentProjectID)
            projectID = localStorage.getItem("currentProjectID" || "1");
        else {
            localStorage.setItem('currentProjectID', projectID)
        }
        console.log(projectID);
        console.log("Here");
    }

    static incrementProjectID() {
        projectID++;
        this.setProjectID();
    }

    static getProjectID() {
        projectID = localStorage.getItem("currentProjectID");
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
        taskArray = JSON.parse(localStorage.getItem("tasks" || "[]"));
    }

    static addTask(task) {
        //receives task object from form submission
        taskArray.push(task);
        this.setTasks();
    }

    static removeTask(task) {
        let taskName = task.taskName;
        const index = taskArray.findIndex(object => {
            return object.taskName === taskName;
        })
        taskArray.splice(index, 1);
        console.log(taskArray);
        // taskArray.splice(taskArray.indexOf(task.taskName));
        this.setTasks();
    }

    static clearStorage() {
        localStorage.clear();
    }


}

if (storageAvailable('localStorage')) {
    Storage.start();
  }
