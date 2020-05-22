exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users_words")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users_words").insert([
        { user_id: 1, word_id: 1 },
        { user_id: 2, word_id: 1 },
      ]);
    });
};
