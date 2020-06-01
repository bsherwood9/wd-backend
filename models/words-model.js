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
  return db("users_words as uw")
    .join("users as u", "u.id", "uw.user_id")
    .join("words as w", "w.id", "uw.word_id")
    .join("definitions as d", "d.word_id", "w.id")
    .join("examples as e", "e.word_id", "w.id")
    .select(
      db.raw(
        "w.word, uw.word_id, array_agg(distinct e.text)as examples, array_agg(distinct d.text) as definitions"
      )
    )
    .groupBy("w.word", "uw.word_id")
    .where({ user_id });
}
function deleteWord(word_id) {
  return db("users_words as uw").where({ "uw.word_id": word_id }).del();
}

module.exports = {
  addWord,
  addDefinition,
  addExamples,
  findWordsDefsExamples,
  deleteWord,
};
