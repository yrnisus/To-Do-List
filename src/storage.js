import { indexOf } from 'lodash';
import {
    Project
} from './project'


//Save names of project as an array?
let projectArray = [];
let taskArray = [];
//0 is going to be us used for all tasks
let projectID = 1;
let activeProject = 0;

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
        Storage.createActiveProject();
    }

    static setProjects() {
        localStorage.setItem('projects', JSON.stringify(projectArray));
     }


    static projectList() {
        let test = JSON.parse(localStorage.getItem("projects"));
        return JSON.parse(localStorage.getItem("projects"));
    }

    static createProjectList() {
        if(localStorage.projects)
            projectArray = JSON.parse(localStorage.getItem("projects"));
        else {
            localStorage.setItem('projects', JSON.stringify(projectArray));
        }
        // projectArray = JSON.parse(localStorage.getItem("projects" || "[]"));
    }


    static addProject(projectObj) {
        projectObj.projectID = Storage.getProjectID();
        projectArray.push(projectObj);
        console.log(projectArray[projectArray.length-1])
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
        console.log(activeProject);
    }

    static createActiveProject() {
        // if(localStorage.activeProjectLocalStorage)
        //     activeProject = localStorage.getItem("activeProjectLocalStorage");
        // else {
        //     localStorage.setItem('activeProjectLocalStorage', activeProject);
        // }
        // console.log(activeProject);
        //on page load always start with 0 as active project to show all tasks
        localStorage.setItem('activeProjectLocalStorage', 0);
    }

    static getActiveProject() {
        return localStorage.getItem("activeProjectLocalStorage");
    }

    // Tasks

    static setTasks() {
        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }

    static getTaskList() {
        let array = JSON.parse(localStorage.getItem("tasks"));
        let result = array.filter(task => task.projectID == activeProject)
        if(this.getActiveProject() == 0)
            return array
        else
            return result;
        // return JSON.parse(localStorage.getItem("tasks"));
    }

    static createTaskList() {
        if(localStorage.tasks)
        taskArray = JSON.parse(localStorage.getItem("tasks" || "[]"));
    else {
        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }
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
        this.setTasks();
    }

    static clearStorage() {
        localStorage.clear();
    }


}

if (storageAvailable('localStorage')) {
    // Storage.clearStorage();
    Storage.start();
  }
