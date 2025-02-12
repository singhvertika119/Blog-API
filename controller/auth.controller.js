import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
//JWT secret key and expiration time
const jwtSecret = process.env.JWT_SECRET;
const jwtExpirySeconds = process.env.JWT_EXPIRY;

//Generate JWT token
const generateAccessToken = (user) => {
  const accessToken = jwt.sign({ id: user._id }, jwtSecret, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  return accessToken;
};

export { generateAccessToken };
