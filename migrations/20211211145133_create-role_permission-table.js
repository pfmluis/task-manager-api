
exports.up = async function(knex) {
  return knex.schema.createTable('role_permission', function(table) {
    table.string('role_name', 25).notNullable().references('name').inTable('role')
    table.string('permission_key', 50).notNullable().references('key').inTable('permission')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.primary(['role_name', 'permission_key']);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('role_permission')
};
