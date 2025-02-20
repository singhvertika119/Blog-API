import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
//JWT secret key and expiration time
const jwtSecret = process.env.JWT_SECRET;
const jwtExpirySeconds = process.env.JWT_EXPIRY;

//Generate access token
const generateAccessToken = (user) => {
  const accessToken = jwt.sign({ id: user._id }, jwtSecret, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  return accessToken;
};

//Generate refresh token
const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user._id }, jwtSecret, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return refreshToken;
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(403).json({ message: "Refresh token not found" });
  try {
    //verify refresh token
    const decoded = jwt.verify(refreshToken, jwtSecret);
    const newAccessToken = generateAccessToken(decoded.id);

    //send new access token in cookies
    res.cookie("newAccesstoken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({ message: "Access token refreshed" });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

export { generateAccessToken, generateRefreshToken, refreshToken };
