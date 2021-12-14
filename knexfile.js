// Update with your config settings.

module.exports = {

  docker: {
    client: 'mysql',
    connection: {
      host: 'task-manager-db',
      database: 'task_manager',
      user:     'root',
      password: 'localpass'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'mysql',
    connection: {
      database: 'task_manager',
      user:     'root',
      password: 'localpass'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'task_manager',
      user:     'root',
      password: 'localpass'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'task_manager',
      user:     'root',
      password: 'localpass'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
