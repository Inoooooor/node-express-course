const express = require("express");
const app = express();

// routes

app.get("/hello", (req, res) => {
  res.status(200).send("test res");
});

const port = 3000;

app.listen(port, console.log(`server listening on ${port}`));
