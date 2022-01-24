const { ApolloServer } = require("apollo-server");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");

const PORT = 8080;

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(PORT, () => {
    console.log(`Running on server port localhost:${PORT}/graphql`);
});