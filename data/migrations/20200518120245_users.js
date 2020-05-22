exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password").notNullable();
    })
    .createTable("words", (tbl) => {
      tbl.increments();
      tbl.string("word", 128).notNullable();
    })
    .createTable("definitions", (tbl) => {
      tbl.increments();
      tbl.string("text", 256);
      tbl
        .integer("word_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("words");
    })
    .createTable("examples", (tbl) => {
      tbl.increments();
      tbl.string("text", 256);
      tbl
        .integer("word_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("words");
    })
    .createTable("users_words", (tbl) => {
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("word_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("words")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["user_id", "word_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users_words")
    .dropTableIfExists("examples")
    .dropTableIfExists("definitions")
    .dropTableIfExists("words")
    .dropTableIfExists("users");
};
