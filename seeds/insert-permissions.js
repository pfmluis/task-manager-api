
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('permission').del()
    .then(function () {
      // Inserts seed entries
      return knex('permission').insert([
        { key: 'UPDATE.TASKS' },
        { key: 'READ.TASKS.ALL' },
        { key: 'READ.TASKS' },
        { key: 'DELETE.TASKS' },
        { key: 'CREATE.TASKS' }
      ]);
    });
};
