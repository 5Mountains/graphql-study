import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
    }
  }
`;

export const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      isInTheaters
      yearOfPublication
    }
  }
`;

export const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;
