
exports.up = async function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('hash').notNullable()
    table.integer('pk_role').unsigned().notNullable().references('id').inTable('role')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('user')
}