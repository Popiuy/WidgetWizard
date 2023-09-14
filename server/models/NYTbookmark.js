const { Schema } = require('mongoose');

const NYTbookmarkSchema = new Schema (
    {
        abstract: {
            type: String,
        },
        blurb:{
            type:String
        },
        byline: {
            type: String,
        },
        date_published: {
            type: String,
        },
        headline: {
            type: String,
            trim: true,
        },
        kicker: {
            type: String
        },
        nyt_url: {
            type: String,
            required: true
        },
        section:{
            type: String,
        },
        source: {
            type: String
        },
        subsection: {
            type: String,
        },
        
        

    }
);