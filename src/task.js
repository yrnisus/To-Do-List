//What does a task have
//Title, Description, Date, Completed Status, priority
//searchable tags would be cool

export class Task {
    //private variabes
    #taskName;
    #description;
    #date;
    #urgency;
    #completed;

    // constructor(title, description, date, priority, completed) {
    //     this.#title = title;
    //     this.#description = description;
    //     this.#date = date;
    //     this.#priority = priority;
    //     this.#completed = completed;
    // }

    constructor(obj) {
        this.#taskName = obj.taskName;
        this.#description = obj.description;
        this.#date = obj.date;
        this.#urgency = obj.urgency;
    }
    //public getters
        getTaskName = () => this.#taskName;
        getDescription = () => this.#description;
        getDate = () => this.#date;
        getUrgency = () => this.#urgency;
        getCompleted = () => this.#completed;
}