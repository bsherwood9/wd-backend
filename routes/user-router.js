const restricted = require("../middleware/restricted");
const Users = require("../models/users-model");
const router = require("express").Router();

router.get("/", restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(restricted);
      res.send(err);
    });
});

module.exports = router;
