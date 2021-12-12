
exports.up = async function(knex) {
  return knex.schema.createTable('task', function(table) {
    table.increments('id').primary()
    table.timestamp('executed_at').notNullable()
    table.text('summary').notNullable()
    table.integer('pk_user').unsigned().notNullable().references('id').inTable('user')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('task')
}
