export default function buildMakeUser({ idManager, validator }) {
  return ({
    sid = idManager.generate(),
    name,
    email,
    hash,
    role,
    createdAt = new Date(),
    updatedAt = new Date(),
    permissions = []
  }) => {
    const { isValid, error } = validator({ sid, name, email, hash, role, permissions })
    if (!isValid) throw new Error(error)

    return Object.freeze({
      getSid: () => sid,
      getName: () => name,
      getEmail: () => email,
      getRole: () => role,
      getHash: () => hash,
      getPermissions: () => permissions,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt
    })
  }
}