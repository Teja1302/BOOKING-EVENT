
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');



// const app = express();


// app.use(bodyParser.json());


// let users = [
//     { id: 1, username: 'user1', password: '$2a$10$7Zvym5fKvKcwqDlExe3B6eXtXICNEKZWZilMZ2vW/v2gDSgRtFpXG' } // Password is "password123"
// ];


// const secretKey = 'your_secret_key';


// app.post('/login', async (req, res) => {

//     let sampleData = {
//         username: "teja",
//         password: "$2a$10$B0LtzmEk..wpjNFej2WIkekS8MrJDazP38Kx829zcPjZMuuAuylne"
//     }


//     let { username, password } = req.body

//     let saltMethod = 10


//     let encryptPassword = await bcrypt.hash(password, saltMethod);


//     console.log("encryptPassword", encryptPassword)

//     let compareSync = bcrypt.compareSync(password, sampleData.password)

//     console.log("compareSync", compareSync)


//     if (compareSync) {
//         res.json({
//             status: 200,
//             message: "password is corrrect"
//         })
//     }
//     else {
//         res.json({
//             status: 401,
//             message: "password is incorrect"
//         })
//     }



//     // const user = users.find(u => u.username === username);

//     // console.log("user",user)


//     // if (!user || !bcrypt.compareSync(password, user.password)) {
//     //     return res.status(401).json({ message: 'Invalid username or password' });
//     // }


//     // const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });


//     // res.json({ token });
// });

// // Middleware for verifying JWT token
// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(403).json({ message: 'Token not provided' });
//     }

//     jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Failed to authenticate token' });
//         }
//         req.userId = decoded.userId;
//         next();
//     });
// };

// // Protected route
// app.get('/protected', verifyToken, (req, res) => {
//     res.json({ message: 'Protected route accessed successfully' });
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



//---------------------------------------------------------------------

// const updateUser =async function (req, res) {
//   try {
//     const id = req.query.id;

//     let inputData = req.body;

//     const updateUser = await User.findByPk(id);

//     console.log("user",updateUser)

//     if (!updateUser) {
//         return res.status(404).json({ status: 400, message: 'data not found' ,data : {}});
//     }
//     else{
    
//         let updateDetails = await User.update(inputData, {
//             where: {
//                 id: id
//             }
//         })
//         return res.status(404).json({ status: 200, message: 'data updated Sucessfully', data: updateDetails });
//     }
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ error: 'Could not update user' });
//   }
// }

// const getUser =async function (req, res) {
//     try {
//         const userId = req.query.id;
//         const user = await User.findByPk(userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         return res.json(user);
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// }
      

//  const getDetailsAll = async function (req, res) {
//     try {
//         const getUserall = await User.findAll()
//         if (getUserall) {
//             res.status(201).json({ status: 200, message: "Data listed SUcessfully", data: getUserall })

//         } else {
//             res.status(401).json('Data not found')
//         }
//     }
//     catch (error) {
//         console.log("error", error)
//     }
// }

// const deleteData =async function(req ,res)
// {
//     try{
//         const id = req.query.id;
       
        
//         const deleteDatabyId = await User.destroy({
//             where: {
//                 id: id,

//             }
//         });
//         if(deleteDatabyId){
//             res.status(200).json({status: 200, message: "Data deleted successfully", data:deleteDatabyId});
//               console.log('User deleted successfully.');
//         }else{
//             res.status(400).json({status: 400, message: "user not found", data: {}})
//         }
//             } catch (error) {

//               console.error('Error deleting user:', error);
//             }
//         }