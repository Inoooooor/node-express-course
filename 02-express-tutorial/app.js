const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
let { people } = require("./data");

app.use(express.static("./methods-public"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.post("/login", (req, res) => {
  console.log(req);
  const { name } = req.body;
  if (name) return res.status(200).send(`<h1>HELLO ${name}</h1>`);
  res.status(401).send("<h1>gotcha</h1>");
});

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  console.log(name);
  if (!name) return res.status(400).json({ success: false, msg: "try better" });
  res.status(201).send({ success: true, person: name });
});

app.put("/api/people/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!id) return res.status(404).send("no such person");
  const chosenPerson = people.find((person) => {
    person.id === +id;
  });
  const updatedPeople = people.map((person) => {
    if (person.id === +id) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: updatedPeople });
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const chosenPerson = people.find((person) => person.id === +id);
  console.log(chosenPerson);
  if (!chosenPerson)
    return res
      .status(404)
      .json({ success: false, msg: `No person with id: ${+id} to delete` });
      const updatedPeople = people.filter((person) => person.id !== +id);
      return res.status(200).json({ success: true, data: updatedPeople });
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
