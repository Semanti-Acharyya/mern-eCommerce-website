import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not authorized. Login Again. (Missing header)",
      });
    }

    const token = authHeader.split(" ")[1]; // remove "Bearer "
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token email:", token_decode.email);
    console.log("ADMIN_EMAIL from env:", process.env.ADMIN_EMAIL);

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not authorized. Login Again. (Email mismatch)",
      });
    }

    next();
  } catch (error) {
    console.log("Auth error:", error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
