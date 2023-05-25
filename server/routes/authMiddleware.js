const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ status: false, msg: "Authentication Invalid" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, msg: "Token not found" });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log({ payload });
    req.user = { userId: payload.id };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: false, msg: "Authentication Invalid" });
  }
};

module.exports = authMiddleware;
