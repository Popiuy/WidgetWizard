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

export const BOOKMARK_ARTICLE = gql`
    mutation CreateUser($nyTarticleData: NYTbookmarkINPUT) {
        bookmarkArticle(NYTarticleData: $nyTarticleData) {
        abstract
        byline
        date_published
        headline
        nyt_url
        source
        }
    }
`;