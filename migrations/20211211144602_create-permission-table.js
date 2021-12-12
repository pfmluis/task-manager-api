
exports.up = async function(knex) {
  return knex.schema.createTable('permission', function(table) {
    table.string('key', 50).primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('permission')
}