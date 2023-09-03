const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        widgets: [Widget]
    }
    type Widget {
        _id: ID
        title: String
        properties: Object
    }
    type Query {
        widgets: [Widget]
        user(id: ID!): User
    }
`;

module.exports = typeDefs;