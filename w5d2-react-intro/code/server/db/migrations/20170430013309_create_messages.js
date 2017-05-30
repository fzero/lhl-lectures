exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', table => {
    table.increments();
    table.string('content');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('date').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
