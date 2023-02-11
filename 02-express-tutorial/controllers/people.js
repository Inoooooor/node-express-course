let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  console.log(name);
  if (!name) return res.status(400).json({ success: false, msg: "try better" });
  res.status(201).send({ success: true, person: name });
};

const deletePerson = (req, res) => {
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
};

const updatePerson = (req, res) => {
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
};

module.exports = {
  createPerson,
  updatePerson,
  getPeople, 
  deletePerson
}
