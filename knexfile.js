const path = require("path");

require("dotenv").config();

const {

  NODE_ENV = "development",

  DEVELOPMENT_DATABASE_URL = "postgres://qgjxewvl:oSDU-Zyn8upNc3Z4gZ_mRT9-2Te66G-g@raja.db.elephantsql.com/qgjxewvl",

  PRODUCTION_DATABASE_URL = "postgres://ljjuecgk:PZQuo8JnkeImw8PSHImlIUCTtq2Fm-62@castor.db.elephantsql.com/ljjuecgk"
  ,

} = process.env;

const URL =

  NODE_ENV === "production"

    ? PRODUCTION_DATABASE_URL

    : DEVELOPMENT_DATABASE_URL;

module.exports = {
  development: {
    client: "postgresql",
    connection: DEVELOPMENT_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: PRODUCTION_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
