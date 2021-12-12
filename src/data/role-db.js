export default function makeRoleDb({ connection }) {
  
  function findOneByName(role) {
    connection('role').where('key', role).first()
  }

  return Object.freeze({
    findOneByName
  })
}