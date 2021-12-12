
exports.up = async function(knex) {
  return knex.schema.createTable('role', function(table) {
    table.string('name', 25).primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('role')
}
