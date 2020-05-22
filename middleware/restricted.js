const jwt = require("jsonwebtoken");
const jwtSecret = require("../secrets/secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You shall not pass!", err });
      } else {
        req.decodedToken = decodedToken;
        console.log("decodedToken", decodedToken);
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no credentials were given" });
  }
};
