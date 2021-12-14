export default function makeCheckPermissionsMiddleware() {
  return (permissions) => {
    return async (request, response, next) => {
      const user = request.user
      const hasPermissions = permissions
        .map(permission => user.getPermissions().includes(permission))
        .some(Boolean)

      if (!hasPermissions) {
        response.status(403).send('Unavailable resource')
      }

      next()
    }
  }
}