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
    authMiddleware: function ({req}) {
        let token = req.query.token || req.headers.authorization;
    
        if (req.headers.authorization) {
          token = token.split(' ').pop().trim();
        }
    
        if (!token) {
          return req;
        }
    
        try {
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          req.user = data;
          return req;
        } catch {
          console.log('Invalid token');
          return req;
        }
        
      },
    signToken: function ({email, username, _id}){
        const data = {email, username, _id};
        return jwt.sign({data: data}, secret, {expiresIn: expiration});
    }
}