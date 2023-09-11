const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        widgets: [Widget]
        nyt_bookmarks: [NYTbookmark]
    }
    
    type Widget {
        _id: ID!
        title: String!
        description: String!
    }
    
    type NYTbookmark {
        _id: ID!
        headline: String
        byline: String
        date_published: String
        abstract: String
        blurb: String
        snippet: String
        source: String
        nyt_url: String
    }

    input NYTbookmarkINPUT {
        headline: String
        byline: String
        date_published: String
        abstract: String
        blurb: String
        snippet: String
        source: String
        nyt_url: String
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
        nyt_bookmarks: [NYTbookmark]
    }

    
    type Mutation {
        createUser(username: String!, email: String!, password: String! ): Auth
        login(username: String!, password: String!): Auth
        addWidget(widgetId: ID!): Widget
        banUser(userId: ID!, password: String!): Auth
        bookmarkArticle(NYTarticleData: NYTbookmarkINPUT): [NYTbookmark]
    }
`;

module.exports = typeDefs;