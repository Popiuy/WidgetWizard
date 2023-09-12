const { User, Widget } = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (parent, {userId}) => {
            return await User.findById(userId);
        },
        widgets: async () => {
            return await Widget.find();
        },
        widget: async (parent, {widgetId}) => {
            return await Widget.findById(widgetId);
        },
        nyt_bookmarks: async (parent, args, context) => {
            return await User.find(
                {_id: context.user._id},
                {nyt_bookmarks}
            )
        }
    },
    Mutation: {
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

        addWidget: async (parent, {widgetId}, context) => {
            
            const user = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet : { widgets: widgetId} },
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
        bookmarkArticle: async (parent, {NYTarticleData}, context) => {
            const user = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: {nyt_bookmarks: NYTarticleData} },
                { new: true }
            );

            return user.nyt_bookmarks;
        }
        

    }
};

module.exports = resolvers;