import { gql } from '@apollo/client';

export const GET_NASA_FAVORITES = gql`
query GetNASAfavorites {
    getNASAfavorites {
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


export const GET_NYT_BOOKMARKS = gql`
    query Nyt_bookmarks {
        nyt_bookmarks {
        _id
        headline
        byline
        date_published
        abstract
        blurb
        source
        nyt_url
        }
    }
`;