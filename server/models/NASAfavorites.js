const { Schema } = require('mongoose');


const NASAfavoritesSchema = new Schema({
    title:{
        type: String,
        trim: true
    },
    date:{
        type: String,
        trim: true
    },
    photographer: {
        type: String,
        trim: true
    },
    src: {
        type: String,
        trim: true
    },
    hd_src: {
        type: String,
        trim: true
    },
    caption: {
        type: String,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },

});

module.exports = NASAfavoritesSchema;