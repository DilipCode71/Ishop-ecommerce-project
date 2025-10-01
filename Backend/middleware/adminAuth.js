const { verifyToken } = require("../helping");

const adminAuth = (req, res, next) => {
    const authHeader = req?.headers?.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);

        if (decoded) {
            req.user = decoded; 
            next();
        } else {
            console.log("❌ Token verification failed");
            return res.status(401).json({ msg: "Token not verified", status: 0 });
        }
    } else {
        console.log("❌ Authorization header missing or invalid");
        return res.status(401).json({ msg: "Token required", status: 0 });
    }
};

module.exports = adminAuth;
