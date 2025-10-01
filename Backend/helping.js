require('dotenv').config()
const jwt = require("jsonwebtoken");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);



const generateCategoryImageName=(imageName)=>{
    return Math.floor(Math.random()*1000)+ new Date().getTime()+imageName
}


const encryptPassword=(value)=>{
    return cryptr.encrypt(value)

}



const decryptPassword=(value)=>{
    return cryptr.decrypt(value)
}




const accessToken=(data)=>{ return jwt.sign(data,process.env.SECRET_KEY)  } 
// new token  created 


const verifyToken = (token) => {
    try {
         const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
        // return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
         console.log("❌ Token verification error:", err.message);
        return null; // invalid token
    }
};


// token access and verify token generate End

module.exports={generateCategoryImageName,encryptPassword,decryptPassword,accessToken,verifyToken}