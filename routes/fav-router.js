const restricted = require("../middleware/restricted");
const Words = require("../models/words-model");
const router = require("express").Router();

router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;
  Words.findWordsDefsExamples(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(restricted);
      res.send(err);
    });
});

router.post("/word", restricted, (req, res) => {
  const word = req.body;
  Words.addWord(word)
    .then((data) => {
      console.log("word data", data.id);
      res.json(data);
    })
    .catch((err) => {
      console.log(restricted);
      res.send(err);
    });
});

router.post("/def/:id", restricted, (req, res) => {
  const def = req.body;
  const { id } = req.params;
  Words.addDefinition(def, id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(restricted);
      res.send(err);
    });
});
router.post("/examp/:id", restricted, (req, res) => {
  const example = req.body;
  const { id } = req.params;
  Words.addExamples(example, id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(restricted);
      res.send(err);
    });
});

module.exports = router;
