
exports.seed = function (knex) {
  return knex('role_permission').insert([
    { role_name: 'Manager', permission_key: 'DELETE.TASKS' },
    { role_name: 'Manager', permission_key: 'READ.TASKS.ALL' },
    { role_name: 'Technician', permission_key: 'CREATE.TASKS' },
    { role_name: 'Technician', permission_key: 'READ.TASKS' },
    { role_name: 'Technician', permission_key: 'UPDATE.TASKS' },
  ])
    .then(() => knex('role').insert([
      { name: 'Manager' },
      { name: 'Technician' }
    ]))
    .then(() => knex('role_permission').insert([
      { role_name: 'Manager', permission_key: 'DELETE.TASKS' },
      { role_name: 'Manager', permission_key: 'READ.TASKS.ALL' },
      { role_name: 'Technician', permission_key: 'CREATE.TASKS' },
      { role_name: 'Technician', permission_key: 'READ.TASKS' },
      { role_name: 'Technician', permission_key: 'UPDATE.TASKS' },
    ]))
};
