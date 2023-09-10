const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {

        username: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            unique: true,
            minlegnth: 6,
        },
        widgets: {
            type: Schema.Types.ObjectId,
            ref: 'Widget'
        }

    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.passwword, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async (password) => {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User;