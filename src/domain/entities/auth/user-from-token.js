export default function buildMakeUserFromToken({ validator }) {
  return ({
    sid,
    role,
    permissions = []
  }) => {
    const { isValid, error } = validator({ sid, role, permissions })
    if (!isValid) throw new Error(error)

    return Object.freeze({
      getSid: () => sid,
      getRole: () => role,
      getPermissions: () => permissions,
    })
  }
}