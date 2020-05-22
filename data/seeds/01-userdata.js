exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "test", password: "test" },
        { username: "test1", password: "test1" },
        { username: "test2", password: "test2" },
      ]);
    });
};
