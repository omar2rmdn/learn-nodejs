import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(400)
      .json({ status: "fail", message: "no token available" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "fail", message: "invalid or expired token" });
  }
}

export { verifyToken };
