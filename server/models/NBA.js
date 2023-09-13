const { Schema } = require('mongoose');

const nba_favorites_schema = new Schema (
    {
        name: {
            type: String,
        },
        city:{
            type:String
        },
        logo: {
            type: String,
        },
        allStar: {
            type: Boolean,
        },
        nbaFranchise: {
            type: Boolean,
        },
    }
);

module.exports = nba_favorites_schema;

//headline, byline, date published, abstract, blurb, source, url