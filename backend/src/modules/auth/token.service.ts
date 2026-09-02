import { tokens, TokenPayLoad } from "../../shared/types/token.types.js";
import JWT from "jsonwebtoken";
class TokenService {
  async createdToken(payload: TokenPayLoad): Promise<tokens> {
    const accessToken = JWT.sign(payload, process.env.token_accessSecretKey!, {
      expiresIn: Number(process.env.ttl_ACCESS_TOKEN),
    });
    const refreshToken = JWT.sign(payload, process.env.token_refreshSecretKey!, {
      expiresIn: Number(process.env.ttl_REFRESH_TOKEN),
    });
    return { accessToken, refreshToken };
  }
  async isValidAccessToken(token: string): Promise<TokenPayLoad | false> {
    try {
      const verifyToken: TokenPayLoad = JWT.verify(token, process.env.token_accessSecretKey!) as TokenPayLoad;
      return verifyToken;
    } catch (err) {
      return false;
    }
  }
  async isValidRefreshToken(token: string): Promise<TokenPayLoad | false> {
    try {
      const verifyToken: TokenPayLoad = JWT.verify(token, process.env.token_refreshSecretKey!) as TokenPayLoad;
      return verifyToken;
    } catch (err) {
      return false;
    }
  }
}
export default new TokenService();
