const pg = require("pg");
const pgClient = new pg.Client("postgres://localhost/practicedb");

const syncAndSeed = async () => {
  try {
    await pgClient.connect();
    await pgClient.query(
      "DROP TABLE IF EXISTS users; CREATE TABLE users (id SERIAL PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255))"
    );
    await pgClient.query(
      "INSERT INTO users(firstname, lastname, email) VALUES ($1, $2, $3);",
      ["Homer", "Simpson", "cunkylover53@aol.com"]
    );
    await pgClient.query(
      "INSERT INTO users(firstname, lastname, email) VALUES ($1, $2, $3);",
      ["Frank", "Grimes", "grimeyaheart@gmail.com"]
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { pgClient, syncAndSeed };
