const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'خفیہ';
const expiration = '2h';

module.exports = {
    AuthentiationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        }
    }),

    signToken: function ({email, username, _id}){
        const data = {email, username, _id};
        return jwt.sign({data: data}, secret, {expiresIn: expiration});
    }
}