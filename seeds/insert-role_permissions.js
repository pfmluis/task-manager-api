
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('role_permission').del()
    .then(function () {
      // Inserts seed entries
      return knex('role_permission').insert([
        { role_name: 'Manager', permission_key: 'DELETE.TASKS' },
        { role_name: 'Manager', permission_key: 'READ.TASKS.ALL' },
        { role_name: 'Technician', permission_key: 'CREATE.TASKS' },
        { role_name: 'Technician', permission_key: 'READ.TASKS' },
        { role_name: 'Technician', permission_key: 'UPDATE.TASKS' },
      ]);
    });
};
