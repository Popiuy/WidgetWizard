const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'خفیہ';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        }
    }),
    authMiddleware: function (req, res, next) {
        let token = req.query.token || req.headers.authorization;
    
        if (req.headers.authorization) {
          token = token.split(' ').pop().trim();
        }
    
        if (!token) {
          return res.status(400).json({ message: 'You have no token!' });
        }
    
        try {
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          req.user = data;
        } catch {
          console.log('Invalid token');
          return res.status(400).json({ message: 'invalid token!' });
        }
    
        next();
      },
    signToken: function ({email, username, _id}){
        const data = {email, username, _id};
        return jwt.sign({data: data}, secret, {expiresIn: expiration});
    }
}