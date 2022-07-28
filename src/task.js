import { format } from 'date-fns'
//What does a task have
//Title, Description, Date, Completed Status, priority
//searchable tags would be cool

export default class Task {
    //private variabes
    #title;
    #description;
    #date;
    #priority;
    #completed;

    constructor(title, description, date, priority, completed) {
        this.#title = title;
        this.#description = description;
        this.#date = date;
        this.#priority = priority;
        this.#completed = completed;
    }
    //public getters
        getTitle = () => this.#title;
        getDescription = () => this.#description;
        getDate = () => this.#date;
        getPriority = () => this.#priority;
        getCompleted = () => this.#completed;
}
