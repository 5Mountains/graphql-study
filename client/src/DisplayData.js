import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_ALL_USERS, QUERY_ALL_MOVIES, GET_MOVIE_BY_NAME } from "./query";

export default function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  const { data: usersData, error: usersError } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData, error: moviesError } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchedData, error: movieSearchedError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const handleSearch = (event) => setMovieSearched(event.target.value);
  const handleFetchMovie = () =>
    fetchMovie({ variables: { name: movieSearched } });

  return (
    <div>
      {usersData &&
        usersData.users.map(({ id, name, username, age, nationality }) => (
          <div key={id}>
            <h3>User: {name}</h3>
            <h3>Username: {username}</h3>
            <h3>Age: {age}</h3>
            <h3>Nationality: {nationality}</h3>
            <br />
          </div>
        ))}
      {usersError && <div>There was an error fetching the users data</div>}

      {moviesData &&
        moviesData.movies.map(
          ({ id, name, yearOfPublication, isInTheaters }) => (
            <div key={id}>
              <h3>Movie Name: "{name}"</h3>
              <h3>Year Of Publication: {yearOfPublication}</h3>
              <h3>Is In Theaters: {isInTheaters === true ? "Yes" : "No"}</h3>
              <br />
            </div>
          )
        )}
      {moviesError && <div>There was an error fetching the movies data</div>}

      <div>
        <input
          type="text"
          placeholder="Search for the movie"
          onChange={handleSearch}
        />
        <button onClick={handleFetchMovie}>Fetch Data</button>
        {movieSearchedData && (
          <div>
            <h3>Movie Name: {movieSearchedData.movie.name}</h3>
            <h3>
              Year Of Publication: {movieSearchedData.movie.yearOfPublication}
            </h3>
          </div>
        )}
        {movieSearchedError && (
          <h1>There was an error fetching the searched movie data</h1>
        )}
      </div>
    </div>
  );
}
