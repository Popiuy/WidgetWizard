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
            required: false,
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

