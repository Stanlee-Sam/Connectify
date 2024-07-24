import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader;
    
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    
    next();
  } catch (error) {
    
    console.error("Token verification error:", error);
    
    
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Server error" });
  }
};
