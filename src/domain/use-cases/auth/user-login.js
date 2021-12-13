import { UnauthorizedException } from '../../entities/exceptions/unauthorized'

export default function buildMakeAuthentication({ userDb, encryptor, makeUser, makeUserLogin, tokenManager }) {
  return async (loginData) => {
    const login = makeUserLogin(loginData)
    const user = makeUser(await userDb.findByEmailWithRoleAndPermissions(login.getEmail()))
    const passwordMatches = await encryptor.compare(login.getPassword(), user.getHash())

    if (!passwordMatches) throw new UnauthorizedException('The provided credentials are incorrect')

    return await tokenManager.getAuthResponse(user)
  }
}