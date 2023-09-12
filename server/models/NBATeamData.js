const { Schema } = require('mongoose');

const NBATeamDataSchema = new Schema (
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

module.exports = NBATeamDataSchema;

//headline, byline, date published, abstract, blurb, source, url