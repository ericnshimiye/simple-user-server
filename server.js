const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send({ message: "Openfield VueJs challenge server, Hello!"}));

app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));