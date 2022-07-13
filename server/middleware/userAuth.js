const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    console.log("REQBODY",req.body)
    console.log("AUTH TOKEN FROM FRONT",auth);
    if (!auth) {
      res.status(401).send({ status: "error", msg: "No header" });
    }
    const accessToken = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      if (decoded && decoded.role === "user") {
        res.locals.vendor = decoded;
        next();
      } else {
        res.status(401).send({ status: "error", msg: "Decode check fail" });
      }
    } catch (err) {
      res.status(401).send({ status: "error", msg: "No access" });
    }
  };

  module.exports = userAuth