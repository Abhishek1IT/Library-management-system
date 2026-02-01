import User from '../Models/User.js';
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;

  try {
    // token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return req.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
