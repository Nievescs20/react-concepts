const express = require("express");
const path = require("path");
const app = express();
const { pgClient, syncAndSeed } = require("./seed");

const PORT = 8000;

app.listen(PORT, () => console.log("listening on port 8000"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/dist")));
app.use(express.json());

app.get("/", (req, res, next) => {
  try {
    res.sendFile(index.html);
  } catch (error) {
    next(error);
  }
});

app.get("/users", async (req, res, next) => {
  try {
    const { rows } = await pgClient.query("SELECT * FROM users;");
    res.send(rows);
  } catch (error) {
    next(error);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    console.log("fn", firstName, "ln", lastName, "e", email);
    const { rows } = await pgClient.query(
      "INSERT INTO users(firstname, lastname, email) VALUES($1, $2, $3) RETURNING *;",
      [firstName, lastName, email]
    );
    res.send(rows[0]);
  } catch (error) {
    next(error);
  }
});

syncAndSeed();
