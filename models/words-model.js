const db = require("../data/db-config");

function addWord(word) {
  return db("words").insert(word).returning("id");
}

function addDefinition(def, word_id) {
  def.word_id = word_id;
  return db("definitions").insert(def);
}

function addExamples(examp, word_id) {
  examp.word_id = word_id;
  return db("examples").insert(examp);
}

function findWordsDefsExamples(user_id) {
  // const length = () => {
  //   return db("users_words as uw")
  //     .join("users as u", "u.id", "uw.user_id")
  //     .join("words as w", "w.id", "uw.word_id")
  //     .select(db.raw("ARRAY_LENGTH(array_agg(distinct w.word),1)"))
  //     .where({ user_id: user_id });
  // };
  // let realLength = length();
  // if (realLength) {
  // console.log("this is the length", realLength[0].array_length);
  return db("users_words as uw")
    .join("users as u", "u.id", "uw.user_id")
    .join("words as w", "w.id", "uw.word_id")
    .join("definitions as d", "d.word_id", "w.id")
    .join("examples as e", "e.word_id", "w.id")
    .select(
      // db.raw("array_agg(distinct w.word) as Words"),
      // db.raw("ARRAY_AGG(distinct e.text) as Examples"),
      // db.raw("ARRAY_AGG(distinct d.text) as Definitions")

      db.raw(
        "w.word, array_agg(distinct e.text)as examples, array_agg(distinct d.text) as definitions"
      )
    )
    .groupBy("w.word")
    .where({ user_id });
}

// .union([
//   db("users_words as uw")
//     .join("users as u", "u.id", "uw.user_id")
//     .join("words as w", "w.id", "uw.word_id")
//     .join("definitions as d", "d.word_id", "w.id")
//     .join("examples as e", "e.word_id", "w.id")
//     .select(
//       db.raw("ARRAY_AGG(distinct w.word) as word"),
//       db.raw("ARRAY_AGG(distinct e.text) as Examples"),
//       db.raw("ARRAY_AGG(distinct d.text) as Definitions")
//     )
//     .where({ user_id: user_id }),
// ]);
// }

module.exports = {
  addWord,
  addDefinition,
  addExamples,
  findWordsDefsExamples,
};
