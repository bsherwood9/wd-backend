exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("words")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("words").insert([{ word: "Cherry" }]);
    });
};
