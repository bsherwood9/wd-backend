exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("examples")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("examples").insert([
        { word_id: 1, text: "Please eat all the cherries." },
        { word_id: 1, text: "He bought the cherry at an exorbitant price" },
      ]);
    });
};
