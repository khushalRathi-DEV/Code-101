const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');


function adminMiddleware(req,res,next) {
  const token = req.headers.token;

  const decoded = jwt.verify(token,JWT_USER_PASSWORD);
  if(decoded){
    req.userId = jwt.decoded.id;
    next();
  }
  else [
    res.status.json({
      message : "You are not signed up"
    })
  ]
}

module.exports = {
  adminMiddleware
}