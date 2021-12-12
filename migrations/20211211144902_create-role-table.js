
exports.up = async function(knex) {
  return knex.schema.createTable('role', function(table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.unique('name')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('role')
}
