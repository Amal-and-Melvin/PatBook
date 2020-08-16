const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if(!token)
            return res.status(401).json({success:false, error: 'Authorization denied.'});
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.status(401).json({success:false, error: 'Token verification failed, authorization denied.'});

        req.user = verified.id;
        next();
    } catch (err) {
        return res.status(500).json({
            success:false,
            error: err
        });
    }
}

module.exports = auth;