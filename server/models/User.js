const { Schema, model } = require('mongoose');

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
            match: /^$/ //[regex expression, 'message'],
        },
        password: {
            type: String,
            required: true,
            unique: true,
            match: /^$/ //must be a certain length
        },
        widgets: {
            type: Schema.Types.ObjectId,
            ref: 'Widget'
        }

    }
);

const User = model('User', userSchema);

module.exports = User;