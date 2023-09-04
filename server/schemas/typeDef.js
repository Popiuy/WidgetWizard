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
        widget(id: ID!): Widget
        widgets: [Widget]
        user(id: ID!): User
        users: [User]
    }
    type Mutations {
        createUser(username: String!, email: String!, password: String! ): Auth
        login(username: String!, password: String!): Auth
        addWidget(userId: ID!, title: String!): Widget
        banUser(userId: ID!, password: String!): Auth
    }
`;

module.exports = typeDefs;