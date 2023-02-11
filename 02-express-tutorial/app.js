const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const peopleRouter = require("./routes/people");
const loginRouter = require("./routes/auth");

app.use(express.static("./methods-public"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/people", peopleRouter);

app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
