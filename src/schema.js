const { gql } = require("apollo-server");

const typeDefs = gql`
    type Phase {
        id: ID!
        title: String!
        isCompleted: Boolean
        tasks: [Task!]!
    }

    type Task {
        id: ID!
        phaseId: ID!
        title: String!
        isCompleted: Boolean
    }

    type Query {
        getTask(id: ID!): Task
        getPhase(id: ID!): Phase
        getAllTasks: [Task]!
        getAllPhases: [Phase]!
        getTasksByPhase(id: ID): [Task]!
    }

    input InputPhase {
        title: String!
        isCompleted: Boolean
    }

    input InputTask {
        phaseId: ID!
        title: String!
        isCompleted: Boolean
    }

    type Mutation {
        createPhase(input: InputPhase!): Phase
        createTask(input: InputTask!): Task
        markTaskAsCompleted(id: ID!, isCompleted: Boolean): Task
    }
`;

module.exports = typeDefs;