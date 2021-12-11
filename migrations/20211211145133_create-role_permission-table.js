
exports.up = async function(knex) {
  return knex.schema.createTable('role_permission', function(table) {
    table.increments('id').primary()
    table.integer('pk_role').unsigned().notNullable().references('id').inTable('role');
    table.integer('pk_permission').unsigned().notNullable().references('id').inTable('permission');
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('role_permission');
};
