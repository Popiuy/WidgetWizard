import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password) {
            token 
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const NASA_ADD_FAVORITE = gql`
    mutation NASAaddFavorite($photoData: nasa_favorites_schema_input) {
        NASAaddFavorite(photoData: $photoData) {
        _id
        date
        title
        src
        caption
        photographer
        description
        }
    }
`;