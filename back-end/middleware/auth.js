import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const secret = "adsfadlkfjaslfasjfask";
  try {
    const token = req.header("Authorization");
    // console.log(token);
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
