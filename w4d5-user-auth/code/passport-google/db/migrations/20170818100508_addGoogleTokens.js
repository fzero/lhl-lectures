
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function (table) {
    table.string('accessToken');
    table.string('refreshToken');
    table.jsonb('profile');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function (table) {
    table.dropColumn('accessToken');
    table.dropColumn('refreshToken');
    table.dropColumn('profile');
  });
};
