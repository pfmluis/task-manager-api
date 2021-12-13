export default function makeUserDb({ connection }) {
  
  async function createUser(user) {
    const newUser = mapCreateUserData(user)
    await connection('user').insert(newUser)
    const { hash, ...returnData } = user

    return returnData
  }

  function findByEmail(email) {
    return connection('user').where('email', email).first()
  }

  async function findByEmailWithRoleAndPermissions(email) {
    const result = await connection('user')
      .where('user.email', email)
      .innerJoin('role_permission', 'user.role_name', 'role_permission.role_name')
      .innerJoin('permission', 'permission.key', 'role_permission.permission_key')
    return adaptFindUserWithPermissionsToUser(result)
  }

  function mapCreateUserData(user) {
    const { role, createdAt, updatedAt, ...userData } = user

    return { 
      ...userData,
      role_name: role,
      created_at: createdAt,
      updated_at: updatedAt
    }
  }

  function adaptFindUserWithPermissionsToUser(data) {
    if (!data || !Array.isArray(data)) return {}

    return data.reduce((previous, current) => ({
      name: current.name,
      sid: current.sid,
      email: current.email,
      hash: current.hash,
      role: current.role_name,
      createdAt: current.created_at,
      updatedAt: current.updated_at,
      permissions: [ ...previous.permissions, current.permission_key ]
    }), {
      permissions: []
    })
  }

  return Object.freeze({
    createUser,
    findByEmail,
    findByEmailWithRoleAndPermissions
  })
}