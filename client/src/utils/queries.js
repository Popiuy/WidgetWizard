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