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

export const GET_BREW_FAVORITES = gql`
query GetBREWfavorites {
    getBREWfavorites {
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

export const GET_NBA_FAVORITES = gql`
query GetNBAfavorites {
    getNBAfavorites {
      _id
        name
        city
        logo
        allStar
        nbaFranchise
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