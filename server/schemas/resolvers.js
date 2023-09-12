const { User, Widget } = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        user: async (parent, arg) => {
            return await User.findById(arg.id);
        },
        widgets: async () => {
            return await Widget.find({});
        },
        widget: async (parent, arg) => {
            return await Widget.findById(arg.id)
        }
    },
    Mutations: {
        createUser: async ( parent, { username, email, password }) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return { token, user};
        },

        login: async ( parent, { username, password }) => {
            const user = await User.findOne({username});
            
            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw){
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },

        addWidget: async (parent, {userId, title}) => {
            const widget = await Widget.findOne({title});
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet : { widgets: widget._id} },
                { new: true }
                );

            return { widget };
        },

        deleteWidget: async () => {

        },

        banUser: async (parent, {userId, password}) => {
            const user = await User.findOne({userId});
            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }

            const deletedUser = await User.deleteOne({userId})
            alert(`${user.username}'s account has been deleted.`)
        },

    }
};

module.exports = resolvers;