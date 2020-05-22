exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("definitions")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("definitions").insert([
        { word_id: 1, text: "a round red berry" },
        { word_id: 1, text: "berries of uncommon worth" },
      ]);
    });
};
