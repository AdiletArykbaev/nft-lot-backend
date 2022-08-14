import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, "adilet");
      req.userid = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "нет доступа!",
      });
    }
  } else {
    return res.status(403).json({
      message: "нет доступа!",
    });
  }
};
export default checkAuth;
