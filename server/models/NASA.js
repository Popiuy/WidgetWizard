const { Schema } = require('mongoose');

const nasa_favorites_schema = new Schema(
    {
        date: {
            type: String,
        },
        title: {
            type: String
        },
        src: {
            type: String
        },
        caption: {
            type: String
        },
        photographer: {
            type: String
        },
        description: {
            type: String
        },
    }
)

module.exports = nasa_favorites_schema;