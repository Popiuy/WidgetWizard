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

export const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
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