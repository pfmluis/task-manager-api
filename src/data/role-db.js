export default function makeRoleDb({ connection }) {
  
  function findOneByName(role) {
    return connection('role').where('name', role).first()
  }

  return Object.freeze({
    findOneByName
  })
}