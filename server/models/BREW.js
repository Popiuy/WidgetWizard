const { Schema } = require('mongoose');

const brew_favorites_schema = new Schema(
    {
        name: {
            type: String,
        },
        brewery_type: {
            type: String
        },
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        phone: {
            type: String
        },
        website_url: {
            type: String
        },
    }
)

module.exports = brew_favorites_schema;