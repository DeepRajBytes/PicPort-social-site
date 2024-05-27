require('dotenv').config();
const JWT = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


const generatetoken = (userid) =>{
    const token = JWT.sign({userid:userid},SECRET_KEY,{expiresIn:'24hours'});
    return token;
}

const findIDbyToken = (token)=>{
    const decodedtoken = JWT.verify(token , SECRET_KEY);
    return decodedtoken.userid;
}

module.exports = {generatetoken , findIDbyToken};