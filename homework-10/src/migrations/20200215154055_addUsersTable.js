exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('login', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('token', 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
