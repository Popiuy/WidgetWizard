const { User, Widget } = require('../models');

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
        createUser: {
            
        },
        addWidget: {

        },
        deleteWidget: {

        },
        banUser: {
            
        },

    }
};

module.exports = resolvers;