const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const nasa_favorites_schema = require('./NASA');
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
        widgets: {
            type: Schema.Types.ObjectId,
            ref: 'Widget'
        },
        NASA_favorites: [nasa_favorites_schema]

    }
);

userSchema.pre('save', async (next) => {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.passwword, saltRounds);
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
