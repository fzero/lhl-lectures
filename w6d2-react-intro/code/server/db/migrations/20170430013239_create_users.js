exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('first');
    table.string('last');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
