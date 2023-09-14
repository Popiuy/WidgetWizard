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
                username
            }
        }
    }
`;

export const ADD_WIDGET = gql`
mutation addWidget($widgetName: String) {
    addWidget(widgetName: $widgetName) {
      _id
      username
      email
      password
      widgets
      nyt_bookmarks {
        _id
        headline
        blurb
        byline
        date_published
        abstract
        kicker
        source
        section
        subsection
        nyt_url
      }
    }
  }
`
export const DELETE_WIDGET = gql`
    mutation deleteWidget($widgetName: String) {
        deleteWidget(widgetName: $widgetName) {
        _id
        username
        email
        password
        widgets
        nyt_bookmarks {
            _id
            headline
            blurb
            byline
            date_published
            abstract
            kicker
            source
            section
            subsection
            nyt_url
        }
        }
    }
`

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