import { UnauthorizedException } from '../../entities/exceptions/unauthorized';

export default function makeValidateToken({ makeUserFromToken, tokenManager }) {
  return async (token) => {
    const userData = await tokenManager.verify(token)
    const user = makeUserFromToken(userData)

    if (new Date().getTime() < (userData.exp || Infinity)) throw new UnauthorizedException('Unauthorized')

    return user;
  }
}