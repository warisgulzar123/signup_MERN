import jwt from 'jsonwebtoken';

const ensurAuthenticated = (req, res, next) => {
    let token;
    
    // Multiple ways to get token
    const auth = req.headers['authorization'] || req.headers['Authorization'];
    
    if (auth && auth.startsWith('Bearer ')) {
        // Format: "Bearer <token>"
        token = auth.split(' ')[1];
    } else if (auth) {
        // Direct token
        token = auth;
    } else if (req.headers['x-access-token']) {
        // Alternative header
        token = req.headers['x-access-token'];
    }
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT Error:', error.message);
        return res.status(401).json({ 
            message: 'Invalid or expired token', 
            error: error.message 
        });
    }
};

export default ensurAuthenticated;