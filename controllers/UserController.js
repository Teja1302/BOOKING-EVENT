
const sequelize = require("../config/db")
const { User, bookEvent, Event } = require('../models/index');
const bookevent = require('../models/bookingeventModel')
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");


const signUp = async function (req, res) {
    try {
        console.log("ewfwef")

        let { userName, email, mobile, password, createdAt, updatedAt, createdFrom, updatedFrom } = req.body;
        createdAt = new Date()
        const checkEmail = await User.findOne({
            where: {
                email: email
            }, raw: true
        })
        if (checkEmail) {
            res.status(200).json({ message: "email already exist" });
        }
        password = await bcrypt.hashSync(password, 10)//encryption
        const createUSer = await User.create({ userName, email, mobile, password, createdAt, updatedAt, createdFrom, updatedFrom }).catch((E) => console.log("err", E));
        res.status(201).json(createUSer);

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ status: 500, error: 'Could not create user', error: error });
    }
}

const getProfile = async function (req, res) {
    try {
        let { userId } = req.query;

        let getUser = await User.findOne({
            where: {
                userId: userId
            }, raw: true

        })

        getUser.bookEventDetails = await bookEvent.findAll({where : {userId : getUser.userId},include:[{model:Event , as : "eventDetails"}]})

        if (getUser) {

            res.status(200).json({ status: 200, message: 'user found', data: getUser });
        }
        else {
            res.status(400).json({ status: 400, message: 'user not found', data: {} });
        }

    } catch (error) {
        console.error('Data not found:', error);
        res.status(500).json({ error: 'Data not found' });
    }

}

const signIn = async function (req, res) {
    try {
        let { email, password } = req.body;
        const signIn = await User.findOne({
            where: {
                email: email
            }, raw: true

        })
        if (signIn) {
            let comparePassword = await bcrypt.compareSync(password, signIn.password)
            if (comparePassword) {

                let encrptData = {
                    id: signIn.userId,
                    name: signIn.userName
                }

                let responseToken = jwt.sign(encrptData, process.env.JWT_SECRET, { expiresIn: "1d" })

                res.status(200).json({ status: 200, message: 'Login Sucess', data: signIn, responseToken });
            }
            else {
                res.status(400).json({ status: 400, message: 'invalid credentials', data: {} });
            }
        }
        else {
            res.status(500).json({ status: 400, message: 'Data is not found', data: {} });
        }
    } catch (error) {
        console.error('Data not found:', error);
        res.status(500).json({ error: 'Data not found' });
    }
}

const getUserAll = async function (req, res) {
    try {

        const getUserall = await User.findAll().catch(e => console.log("errr", e))
        console.log(getUserAll);

        if (getUserall) {
            res.status(201).json({ status: 200, message: "Data listed SUcessfully", data: getUserall })

        } else {
            res.status(401).json('Data not found')
        }
    }
    catch (error) {
        console.log("error", error)
    }
}
const deleteUserData = async function (req, res) {
    try {
        const userId = req.query.userId;


        const deleteUserbyId = await User.destroy({
            where: {
                userId: userId,

            }
        });
        if (deleteUserbyId) {
            res.status(200).json({ status: 200, message: "Data deleted successfully", data: deleteUserbyId });
            console.log('User deleted successfully.');
        } else {
            res.status(400).json({ status: 400, message: "user not found", data: {} })
        }
    } catch (error) {

        console.error('Error deleting user:', error);
    }
}

const updateUser = async function (req, res) {
    try {
        const userId = req.query.userId;

        let inputData = req.body;

        const updateUser = await User.findByPk(userId);

        console.log("user", updateUser)

        if (!updateUser) {
            return res.status(404).json({ status: 400, message: 'data not found', data: {} });
        }
        else {

            let updateDetails = await User.update(inputData, {
                where: {
                    userId: userId
                }
            })
            return res.status(404).json({ status: 200, message: 'data updated Sucessfully', data: updateDetails });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Could not update user' });
    }
}


module.exports = { signUp, signIn, getProfile, getUserAll, deleteUserData, updateUser };