const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        widgets: [Widget]
        nasa_favorites: [NASAphoto]
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
    
    type NASAphoto {
        _id: ID
        date: String
        title: String
        src: String
        caption: String
        photographer: String
        description: String
    }
    
    input NASAphotoInput {
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
        NASAgetFavorites: [NASAphoto] 
    }


    type Mutation {
        createUser(username: String!, email: String!, password: String! ): Auth
        login(username: String!, password: String!): Auth
        addWidget(widgetId: ID!): Widget
        banUser(userId: ID!, password: String!): Auth
        NASAaddToFavorites(photoData: NASAphotoInput): User
    }
`;

module.exports = typeDefs;