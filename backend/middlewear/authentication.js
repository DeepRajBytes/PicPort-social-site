const userService =require('../services/user.service');
const jwtprovider =require("../config/jwtprovide");


const authenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // console.log(authHeader);
        if (!authHeader) {
            return res.status(404).send({ message: "Authorization header not found" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(404).send({ message: "Token Not Found" });
        }
        const userid = await jwtprovider.findIDbyToken(token);
        const user = await userService.finduserbyId(userid);
        req.user = user;
        
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
    next(); 
};

module.exports = authenticated;