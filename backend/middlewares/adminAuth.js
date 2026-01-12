// middlewares/adminAuth.js
import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token matches admin credentials
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ status: false, message: "Forbidden: Admins only" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};

export default adminAuth;
