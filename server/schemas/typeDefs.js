const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        widgets: [String]
        nyt_bookmarks: [NYTbookmark]
    }

    type Widget {
        _id: ID!
        title: String
        componentName: String
    }
    
    type NYTbookmark {
        _id: ID!
        headline: String
        blurb: String
        byline: String
        date_published: String
        abstract: String
        kicker: String
        source: String
        section: String
        subsection: String
        nyt_url: String
    }

    input NYTbookmarkINPUT {
        headline: String
        blurb: String
        byline: String
        date_published: String
        abstract: String
        kicker: String
        source: String
        section: String
        subsection: String
        nyt_url: String
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
        user(userId: ID!): User
        users: [User]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String! ): Auth
        login(username: String!, password: String!): Auth
        addWidget(widgetName: String): User
        deleteWidget(widgetName: String): User
        banUser(userId: ID!, password: String!): Auth
    }
`;

module.exports = typeDefs;