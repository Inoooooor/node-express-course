const express = require("express");
const app = express();
const { products, people } = require("./data");
app.get("/", (req, res) => {
  res.send('<a href="/api/products">products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((item) => {
    const { id, name, image } = item;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  const { productID } = req.params;
  const chosenProduct = products.find((item) => item.id === +productID);
  if (!chosenProduct) return res.status(404).send("<h1>YOU MISSED</h1>");
  res.json(chosenProduct);
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  res.send("<h1>QUERIES</h1>");
});

app.get("/api/people", (req, res) => {
  res.json(people);
});

// app.get("/api/people/:userID", (req, res) => {
//   const { userID } = req.params;
//   const chosenUser = people.find((user) => user.id === +userID);
//   res.json(chosenUser);
// });

app.get("/api/people/query", (req, res) => {
  console.log(req.query);
  const { idLessThan, nameIsNot } = req.query;
  let sortedUsers = people;
  if (idLessThan && nameIsNot) {
    sortedUsers = sortedUsers.filter(
      (user) => user.id < idLessThan && user.name != nameIsNot
    );
  }
  console.log(sortedUsers);
  res.json(sortedUsers);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
