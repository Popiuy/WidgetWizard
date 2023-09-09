import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!){
        login(email: $email, password: $password) {
            token {
                _id
                username
            }
        }
    }
`;

// export const NASA_ADD_TO_FAVORITES = gql`
// `;