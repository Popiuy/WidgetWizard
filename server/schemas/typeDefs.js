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

    type brew_favorites_schema {
        _id: ID!
        name: String
        brewery_type: String
        street: String
        city: String
        state: String
        phone: String
        website_url: String
    }
    
    input brew_favorites_schema_input {
        _id: ID!
        name: String
        brewery_type: String
        street: String
        city: String
        state: String
        phone: String
        website_url: String
    }

    type nba_favorites_schema {
        _id: ID!
        name: String
        city: String
        logo: String
        allStar: Boolean
        nbaFranchise: Boolean
    }
    
    input nba_favorites_schema_input {
        _id: ID!
        name: String
        city: String
        logo: String
        allStar: Boolean
        nbaFranchise: Boolean
    }

    type Query {
        me: User
        user(userId: ID!): User
        users: [User]
        getNASAfavorites: [nasa_favorites_schema]
        getBREWfavorites: [brew_favorites_schema]
        getNBAfavorites: [nba_favorites_schema]
    }

    
    type Mutation {
        createUser(username: String!, email: String!, password: String! ): Auth
        login(username: String!, password: String!): Auth
        addWidget(widgetName: String): User
        deleteWidget(widgetName: String): User
        banUser(userId: ID!, password: String!): Auth
        NASAaddFavorite(photoData: nasa_favorites_schema_input): nasa_favorites_schema
        BREWaddFavorite(brewData: brew_favorites_schema_input): brew_favorites_schema
        NBAaddFavorite(teamData: nba_favorites_schema_input): nba_favorites_schema
    }
`;

module.exports = typeDefs;