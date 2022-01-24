const { UserInputError } = require("apollo-server");

let phases = [];

class Phase {
    constructor(id, title, isCompleted) {
        this.id = id;
        this.title = title;
        this.isCompleted = isCompleted;
        this.tasks = [];
    }
}

class Task {
    constructor(id, phaseId, title, isCompleted) {
        this.id = id;
        this.phaseId = phaseId;
        this.title = title;
        this.isCompleted = isCompleted;
    }
}

const resolvers = {
    Query: {
        getAllTasks() {
            let result = [];
            phases.forEach(phase => {
                result.push(...phase.tasks);
            });
            return result;
        },
        getAllPhases() {
            return phases;
        }
    },
    Mutation: {
        createPhase: (parent, args) => {
            //console.log(args);
            //const id = require("crypto").randomBytes(10).toString("hex");
            const id = phases.length + 1;
            const phase = new Phase(id, args.input.title, args.input.isCompleted);
            phases.push(phase);
            //console.log(phases);
            return phase;
        },
        createTask: (parent, args) => {
            const phase = phases.find(phase => phase.id == args.input.phaseId);
            if (phase) {
                const id = require("crypto").randomBytes(10).toString("hex");
                const task = new Task(id, args.input.phaseId, args.input.title, args.input.isCompleted);
                phase.tasks.push(task);
                //console.log(phase.tasks);
                return task;
            }
        },
        markTaskAsCompleted: (parent, args) => {
            //console.log(args);
            const task = resolvers.Query.getAllTasks().find(task => task.id == args.id);
            const phaseId = Number(task.phaseId);
            for (let i = 0; i < phaseId - 1; i++) {
                const phase = phases[i];
                if (!phase.isCompleted) {
                    throw new UserInputError("You must complete the tasks in previous phases!");
                }
            }
            task.isCompleted = true;
            let isPhaseCompleted = true;
            for (let i = 0; i < phases[phaseId - 1].tasks.length; i++) {
                if (phases[phaseId - 1].tasks[i].isCompleted == false) {
                    isPhaseCompleted = false;
                    break;
                }
            }
            if (isPhaseCompleted) {
                phases[phaseId - 1].isCompleted = true;
            }
            console.log(isPhaseCompleted);
            //console.log(task);
            return task;
        }
    }
}

module.exports = resolvers;