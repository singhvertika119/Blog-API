import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const authMiddleware = async (req, res, next) => {
  //Extract authorization header
  const authHeader = req.headers["authorization"];

  //checks if token is a bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied: No token provided" });
  }

  //Extract token from the bearer token
  const token = authHeader.split(" ")[1];

  try {
    //Validates the object using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Fetches the user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Attaching user to the request
    req.user = user;

    //Proceeding to the next middleware
    next();
  } catch (error) {
    if ((error.name === "JsonWebTokenError")) {
        return res.status(403).json({ error: "Invalid token", message: error });
      }
  
      if ((error.name === "TokenExpiredError")) {
        return res.status(500).json({ error: "Token expired" });
      }
  
      return res.status(500).json({ error: "Internal server error!" });
  }
};

export { authMiddleware };
