const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        widgets: [Widget]
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
    
    type nasa_favorites_schema {
        _id: ID!
        date: String
        title: String
        src: String
        caption: String
        photographer: String
        description: String
    }
    
    input nasa_favorites_schema_input {
        date: String
        title: String
        src: String
        caption: String
        photographer: String
        description: String
    }


    type Query {
        widget(widgetId: ID!): Widget
        widgets: [Widget]
        user(userId: ID!): User
        users: [User]
        getNASAfavorites: [nasa_favorites_schema]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String! ): Auth
        login(username: String!, password: String!): Auth
        addWidget(widgetId: ID!): Widget
        banUser(userId: ID!, password: String!): Auth
        NASAaddFavorite(photoData: nasa_favorites_schema_input): nasa_favorites_schema
    }
`;

module.exports = typeDefs;