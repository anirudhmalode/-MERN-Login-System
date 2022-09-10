const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.loginsystemjwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token" : token });

        if(!rootUser) { throw new Error("User not Found!") };

        req.userID = rootUser._id;
        req.token = token;
        req.rootUser = rootUser;

        next();

    } catch (error) {
        
    }
}

module.exports = Authenticate;