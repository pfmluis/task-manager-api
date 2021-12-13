import { UnauthorizedException } from '../../entities/exceptions/unauthorized'

export default function buildMakeAuthentication({ userDb, encryptor, makeUser, makeUserLogin, tokenManager }) {
  return async (loginData) => {
    const login = makeUserLogin(loginData)
    const user = makeUser(await userDb.findByEmailWithRoleAndPermissions(login.getEmail()))
    const passwordMatches = await encryptor.compare(login.getPassword(), user.getHash())

    if (!passwordMatches) throw new UnauthorizedException('The provided credentials are incorrect')

    /**
     * {
     *   "access_token":"eyJz93a...k4laUWw",
     *   "token_type":"Bearer",
     *   "expires_in":86400
     *w }
     */
    return await tokenManager.getAuthResponse(user)
  }
}