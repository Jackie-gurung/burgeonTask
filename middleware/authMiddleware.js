const jwt = require('jsonwebtoken');
require('dotenv/config');

const authenticateJWT = (req, res, next) => {
    try {
        const token = req.header('authorization');
        // console.log(req.headers)
        console.log(token)


        console.log("inside if statement")
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            console.log("inside if if statement")
            console.log(user)

            if (err) {
                console.log(err.name)
                return res.status(403).json({ message: 'Invalid token' })
            }
            req.user = user;
            next();
        })
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }


}

module.exports = { authenticateJWT }
