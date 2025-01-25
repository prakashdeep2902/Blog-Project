import { VaildateToken } from "../utils/authentication.js";

export function authCookie(cookieName) {
  return (req, res, next) => {
    const Token = req.cookies[cookieName];
    if (!Token) {
      return next();
    }

    try {
      const userPayload = VaildateToken(Token);
      req.user = userPayload;
    } catch (error) {}

    return next();
  };
}
