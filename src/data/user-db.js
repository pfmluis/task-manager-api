export default function makeUserDb({ connection }) {
  
  async function createUser(user) {

    const newUser = mapCreateUserData(user)

    await connection('user').insert(newUser)

    const { hash, ...returnData } = user

    return returnData
  }

  function mapCreateUserData(user) {
    const {
      ...userData,
      role,
      createdAt,
      updatedAt
    } = user

    return { 
      ...userData,
      role_name: role,
      created_at: createdAt,
      updated_at: updatedAt
    }
  }

  return Object.freeze({
    createUser
  })
}