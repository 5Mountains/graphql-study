const { UserList, MovieList } = require("../data");
const _ = require("lodash");

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const { id } = args;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const { name } = args;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  User: {
    favoriteMovie: () => {
      return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000);
    },
  },
};

module.exports = { resolvers };
