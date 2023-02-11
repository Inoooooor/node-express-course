const postLogin = (req, res) => {
  console.log(req);
  const { name } = req.body;
  if (name) return res.status(200).send(`<h1>HELLO ${name}</h1>`);
  res.status(401).send("<h1>gotcha</h1>");
};

module.exports = { postLogin };
