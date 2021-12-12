
exports.up = async function(knex) {
  return knex.schema.createTable('permission', function(table) {
    table.increments('id').primary()
    table.string('key').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.unique('key')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('permission')
}