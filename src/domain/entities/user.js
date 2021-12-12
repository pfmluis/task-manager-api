export default function buildMakeUser({ idManager, validator }) {
  return ({
    sid = idManager.generate(),
    name,
    email,
    hash,
    role,
    permissions = []
  }) => {

    const { isValid, error } = validator({ sid, name, email, hash, role, permissions })

    if (isValid) throw new Error(error)

    return Object.freeze({
      getSid: () => sid,
      getName: () => name,
      getUser: () => email,
      role: () => role,
      getPermissions: () => permissions,
      setPassword: (hash) => {
        hash = hash
      } 
    })
  }
}