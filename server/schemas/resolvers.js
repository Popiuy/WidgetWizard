const { User, Widget } = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(!context.user) {
                throw AuthenticationError;
            } else {
                return await User.findById(context.user._id)
            }
        },
        users: async () => {
            return await User.find();
        },
        user: async (parent, {userId}) => {
            return await User.findById(userId);
        },
    },
    Mutation: {
        createUser: async ( parent, { username, email, password }) => {
            
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return { token, user};
        },

        login: async ( parent, { username, password }) => {
            const user = await User.findOne({username});
            console.log(user)
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

        addWidget: async (parent, {widgetName}, context) => {

            const user = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $addToSet : { widgets: widgetName} },
            { new: true }
            );
            return user;
           
        },
        deleteWidget: async (parent, {widgetName}, context) => {
            
            const user = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull : { widgets: widgetName} },
                { new: true }
            );

            return user;
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