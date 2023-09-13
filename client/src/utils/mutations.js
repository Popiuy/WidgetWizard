import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password) {
            token 
            user{username}
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

export const BREW_ADD_FAVORITE = gql`
    mutation BREWaddFavorite($brewData: brew_favorites_schema_input) {
        BREWaddFavorite(brewData: $brewData) {
        _id
        name
        brewery_type
        street
        city
        state
        phone
        website_url
        }
    }
`;

export const NBA_ADD_FAVORITE = gql`
    mutation NBAaddFavorite($teamData: nba_favorites_schema_input) {
        NBAaddFavorite(teamData: $teamData) {
        _id
        name
        city
        logo
        allStar
        nbaFranchise
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