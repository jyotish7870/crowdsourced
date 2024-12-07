import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    console.log("Auth middleware");
    const token = req.headers["authorization"];
    console.log("token", token);
    if (!token) {
      return res.status(401).send({
        message: "Auth failed: No token provided",
        success: false,
      });
    }
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
