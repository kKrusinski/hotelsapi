const jwt = require("jsonwebtoken");


const verifyJwtToken = (req,res, next)=>{
    const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
          res.status(403).json("Your token is valid! Check token or or log in again.");
      }
      req.user = user;   
      next();
      
    });
   
  } else {
  
   res.status(401).json("You are a unauthorized user.");

  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyJwtToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You aren't authorized to do that!");
      }
    });
  };

  const verifyTokenAndAdmin = (req, res, next) => {
    verifyJwtToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You aren't an admin and you can't do that!");
      }
    });
  };

  

module.exports={verifyJwtToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};