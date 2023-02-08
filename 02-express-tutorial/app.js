const express = require("express");
const app = express();
const { products, people } = require("./data");
app.get("/", (req, res) => {
  const { image } = products[0];
  res.send(`<a href="${ image }">products</a>`);
});

app.get("/showPicture", (req, res) => {
  res.links({ next: image });
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
//   console.log(req.params);
//   const { userID } = req.params;
//   const chosenUser = people.find((user) => user.id === +userID);
//   res.json(chosenUser);
// });

app.get("/api/people/query", (req, res) => {
  console.log(req.query);
  const { idLessThan, nameIsNot } = req.query;
  let sortedUsers = people;
  if (idLessThan) {
    sortedUsers = sortedUsers.filter((user) => user.id < +idLessThan);
  }
  if (nameIsNot) {
    sortedUsers = sortedUsers.filter((user) => user.name != nameIsNot);
  }
  return res.status(200).json(sortedUsers);
  // return res.status(400).send("<h1>WRONG QUERY DUDE</h1>");
});

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
