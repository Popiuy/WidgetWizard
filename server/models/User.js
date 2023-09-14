const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const nasa_favorites_schema = require('./NASA');
// const nyt_bookmark_schema = require('./NYT');
const brew_favorites_schema = require('./BREW');
const nba_favorites_schema = require('./NBA');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
      },
      password: {
        type: String,
        required: true,
      },
        widgets: [String],
            // type: Schema.Types.ObjectId,
            // ref: 'Widget'
        NASA_favorites: [nasa_favorites_schema],
        // NYT_bookmarks: [nyt_bookmark_schema],
        BREW_favorites: [brew_favorites_schema],
        NBA_favorites: [nba_favorites_schema],
    }
);

userSchema.pre('save', async function (next) {
if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
}
next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
