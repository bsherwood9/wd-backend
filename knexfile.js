// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "postgres",
    connection: {
      host: "localhost",
      port: 5433,
      user: "postgres",
      password: "password",
      database: "test",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },

  testing: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};
