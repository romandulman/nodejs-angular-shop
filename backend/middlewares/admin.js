const adminCheck = (req, res, next) => {
    const adminRole = req.user.is_admin === true;
    if (!adminRole) {
        res.status(401).json({
            authenticated: false,
            message: "restricted"
        });
    } else {
        next();
    }
};
module.exports = adminCheck;
