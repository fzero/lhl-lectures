exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', table => {
    table.increments();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.integer('message_id').unsigned().references('id').inTable('messages').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('likes');
};
