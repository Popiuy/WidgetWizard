const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        widgets: [Widget]
        nasa_favorites: [PhotoData]
    }
    
    type Widget {
        _id: ID!
        title: String!
        description: String!
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        widget(widgetId: ID!): Widget
        widgets: [Widget]
        user(userId: ID!): User
        users: [User]
    }

    input PhotoData {
        _id: ID!
        date: String
        title: String
        src: String
        caption: String
        photographer: String
        description: String
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String! ): Auth
        login(username: String!, password: String!): Auth
        addWidget(widgetId: ID!): Widget
        banUser(userId: ID!, password: String!): Auth
        NASAaddToFavorites(photoData: PhotoData): User
    }
`;

module.exports = typeDefs;