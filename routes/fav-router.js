const restricted = require("../middleware/restricted");
const jwt = require("jsonwebtoken");
const Words = require("../models/words-model");
const router = require("express").Router();
const db = require("../data/db-config");

router.get("/", restricted, (req, res) => {
  const id = req.decodedToken.user_id;
  Words.findWordsDefsExamples(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// router.post("/word", restricted, (req, res) => {
//   const word = req.body;
//   Words.addWord(word)
//     .then((data) => {
//       console.log("word data", data.id);
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

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

router.post("/word", restricted, async (req, res) => {
  try {
    const user_id = req.decodedToken.user_id;
    const word = req.body;
    const [newWord] = await Words.addWord(word);
    console.log("new word", newWord);
    await db("users_words").insert({ user_id, word_id: +newWord });
    res.status(200).json(newWord);
  } catch (e) {
    res.status(500).json({ message: "there was an error", e });
  }
});

module.exports = router;
