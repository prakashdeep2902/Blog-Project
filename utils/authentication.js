import jwt from "jsonwebtoken";
const secKey = "prakash@123.com";

function createTokenForUser(user) {
  const payload = {
    _id: user.id,
    name: user.userName,
    mobile: user.userMobile,
    profileImage: user.profile,
    role: user.role,
  };
  const token = jwt.sign(payload, secKey);
  return token;
}

function VaildateToken(token) {
  const validatePayload = jwt.verify(token, secKey);
  return validatePayload;
}

export { createTokenForUser, VaildateToken };
