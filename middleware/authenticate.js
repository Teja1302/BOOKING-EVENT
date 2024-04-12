const jwt = require("jsonwebtoken");
const { User } = require("../models");


const verifyToken = async (req, res, next) => {

    try {
        if (!req.headers.token) res.status(400).json({ status: 400, message: "token required", data: {} })

        let getToken = req.headers.token

        let decrptToken = jwt.verify(getToken, process.env.JWT_SECRET)

        let findUser = await User.findOne({ where: { userId: decrptToken.id }, raw: true })

        if (findUser) {
            
            req.userId = decrptToken.id
            next()
        } 

        else res.status(400).json({ status: 400, message: "Invalid Token", data: {} })

        console.log("token ==>", decrptToken)


    } catch (error) {

        console.error("wbefjhwef", error.message)

    }
}


const verifyRole = async (req, res) => {

}


module.exports = {
    verifyToken, verifyRole
}