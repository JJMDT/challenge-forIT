const dayjs = require("dayjs");

class Task {
    constructor(title, description, completed = false) {
      
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = dayjs().format("DD/MM/YYYY HH:mm");
    }
}

module.exports = Task;