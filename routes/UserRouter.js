
const userRouter = require('express').Router()

const { signUp, signIn, getProfile, getUserAll, deleteUserData, updateUser } = require('../controllers/UserController');
const { verifyToken } = require('../middleware/authenticate');

userRouter.post('/user/signUp', signUp);
userRouter.post('/user/signin', signIn);
userRouter.get('/user/get', [verifyToken], getProfile);
userRouter.get('/user/get/all', getUserAll);
userRouter.delete('/user/delete', deleteUserData);
userRouter.put('/user/update', updateUser);

module.exports = userRouter;

