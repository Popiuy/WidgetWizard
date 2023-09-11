const { Schema } = require('mongoose');

const NYTbookmarkSchema = new Schema (
    {
        headline: {
            type: String,
            required: true,
            trim: true,
        },
        byline: {
            type: String,
            required: true
        },
        date_published: {
            type: String,
            required: true
        },
        abstract: {
            type: String,
        },
        blurb:{
            type: String,
        },
        snippet: {
            type: String
        },
        source: {
            type: String,
            required: true
        },
        nyt_url: {
            type: String,
            required: true
        }

    }
);

module.exports = NYTbookmarkSchema;

//abstract, byline, created_date, source, url, title