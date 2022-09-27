export class Project {
    projectName;
    projectID;
    constructor(project) {
        this.projectName = project.projectName;
    }
    getProjectName = () => this.projectName;
    setProjectID(projectID) {
        this.projectID = projectID;
    }
}

//A Project is just a list way to filter Tasks
//An list of a tasks
//Should just be an array of tasks?
