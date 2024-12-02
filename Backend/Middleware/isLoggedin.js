const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) =>{
    let token = req.cookies.token;
    console.log(token);
    if(!token) {
        return res.status(403).send({message: "No token provided."});

    }

    try{
        const data = jwt.verify(token, process.env.JWT_KEY);
        req.user = data;
        next();
    }catch(error){
        return res.status(401).send({message: "Invalid token."});
    }
}