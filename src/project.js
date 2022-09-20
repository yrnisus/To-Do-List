export class Project {
    #projectName;
    constructor(project) {
        this.#projectName = project.projectName;
    }
    getProjectName = () => this.#projectName;
}

//A Project is just a list way to filter Tasks
//An list of a tasks
//Should just be an array of tasks?
