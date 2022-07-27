import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  QUERY_ALL_USERS,
  QUERY_ALL_MOVIES,
  GET_MOVIE_BY_NAME,
  CREATE_USER_MUTATION,
} from "./query";

const EMPTY_USER = { name: "", username: "", age: "", nationality: "" };

export default function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  const [newUser, setNewUser] = useState(EMPTY_USER);

  const {
    data: usersData,
    error: usersError,
    refetch: refetchAllUsers,
  } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData, error: moviesError } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchedData, error: movieSearchedError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const handleSearch = (e) => setMovieSearched(e.target.value);

  const handleSetNewUser = (e) => {
    const { value } = e.target;
    const attr = e.target.getAttribute("data-type");
    switch (attr) {
      case "name":
        setNewUser({ ...newUser, name: value });
        break;
      case "username":
        setNewUser({ ...newUser, username: value });
        break;
      case "age":
        setNewUser({ ...newUser, age: Number(value) });
        break;
      case "nationality":
        setNewUser({ ...newUser, nationality: value.toUpperCase() });
        break;
      default:
        break;
    }
  };

  const handleFetchMovie = () =>
    fetchMovie({ variables: { name: movieSearched } });

  const handleCreateUser = () => {
    const { name, username, age, nationality } = newUser;
    if (name && username && age && nationality) {
      createUser({ variables: { input: { ...newUser } } });
      setNewUser(EMPTY_USER);
      refetchAllUsers();
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <input
          type="text"
          data-type="name"
          placeholder="Name..."
          value={newUser.name}
          onChange={handleSetNewUser}
        />
        <input
          type="text"
          data-type="username"
          placeholder="Username..."
          value={newUser.username}
          onChange={handleSetNewUser}
        />
        <input
          type="number"
          data-type="age"
          placeholder="Age..."
          value={newUser.age}
          onChange={handleSetNewUser}
        />
        <input
          type="text"
          data-type="nationality"
          placeholder="Nationality..."
          value={newUser.nationality}
          onChange={handleSetNewUser}
        />

        <button onClick={handleCreateUser}>Create User</button>
      </div>

      <div style={{ marginBottom: 30 }}>
        {usersData &&
          usersData.users.map(({ id, name, username, age, nationality }) => (
            <div key={id}>
              <p>User: {name}</p>
              <p>Username: {username}</p>
              <p>Age: {age}</p>
              <p>Nationality: {nationality}</p>
              <br />
            </div>
          ))}
        {usersError && <p>There was an error fetching the users data</p>}
      </div>

      <div style={{ marginBottom: 30 }}>
        {moviesData &&
          moviesData.movies.map(
            ({ id, name, yearOfPublication, isInTheaters }) => (
              <div key={id}>
                <p>Movie Name: "{name}"</p>
                <p>Year Of Publication: {yearOfPublication}</p>
                <p>Is In Theaters: {isInTheaters === true ? "Yes" : "No"}</p>
                <br />
              </div>
            )
          )}
        {moviesError && <p>There was an error fetching the movies data</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Search for the movie"
          onChange={handleSearch}
        />
        <button onClick={handleFetchMovie}>Fetch Data</button>
        {movieSearchedData && (
          <div>
            <p>Movie Name: {movieSearchedData.movie.name}</p>
            <p>
              Year Of Publication: {movieSearchedData.movie.yearOfPublication}
            </p>
          </div>
        )}
        {movieSearchedError && (
          <p>There was an error fetching the searched movie data</p>
        )}
      </div>
    </div>
  );
}
