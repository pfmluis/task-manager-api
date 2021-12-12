
exports.up = async function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.string('sid', 36).primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('hash').notNullable()
    table.string('role_name', 25).notNullable().references('name').inTable('role')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('user')
}