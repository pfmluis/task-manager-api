export default function makeUserDb({ connection }) {
  
  async function createUser(user) {
    const newUser = mapCreateUserData(user)
    await connection('user').insert(newUser)
    const { hash, ...returnData } = user

    return returnData
  }

  function findByEmail(email) {
    return connection('user').where('email', email)
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

  return Object.freeze({
    createUser,
    findByEmail
  })
}