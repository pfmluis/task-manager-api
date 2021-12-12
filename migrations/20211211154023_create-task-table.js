
exports.up = async function(knex) {
  return knex.schema.createTable('task', function(table) {
    table.string('sid', 36).primary()
    table.timestamp('executed_at').notNullable()
    table.text('summary').notNullable()
    table.string('user_sid', 36).notNullable().references('sid').inTable('user')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('task')
}
