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
        // widgets: async () => {
        //     return await Widget.find();
        // },
        // widget: async (parent, {widgetId}) => {
        //     return await Widget.findById(widgetId);
        // },

        getNASAfavorites: async (parent, args, context) => {
            return await User.findById(
                context.user._id,
                'NASA_favorites'   
            )
        },
        getBREWfavorites: async (parent, args, context) => {
            return await User.findById(
                context.user._id,
                'BREW_favorites'   
            )
        },
        getNBAfavorites: async (parent, args, context) => {
            return await User.findById(
                context.user._id,
                'NBA_favorites'   
            )
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

            console.log(context.user)
            
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
        NASAaddFavorite: async (parent, {photoData}, context) => {
            const user = await User.findByIdAndUpdate(
                {_id: context.user._id},
                {$addToSet: { NASA_favorites: photoData}},
                { new: true }
            )
            return user.NASA_favorites;
        },
        BREWaddFavorite: async (parent, {brewData}, context) => {
            const user = await User.findByIdAndUpdate(
                {_id: context.user._id},
                {$addToSet: { BREW_favorites: brewData}},
                { new: true }
            )
            return user.BREW_favorites;
        },
        NBAaddFavorite: async (parent, {teamData}, context) => {
            const user = await User.findByIdAndUpdate(
                {_id: context.user._id},
                {$addToSet: { NBA_favorites: teamData}},
                { new: true }
            )
            return user.NBA_favorites;
        },

    }
};

module.exports = resolvers;