const express = require('express');

const app = express();

const body = require('body-parser');

app.use(body.json());

const dotenv = require('dotenv')

dotenv.config()

require("./config/db");

let userRouter = require('./routes/UserRouter');
let eventRouter = require('./routes/EventRouter');
let bookingRouter =require('./routes/bookEventRouter');

app.use("/api", userRouter)
app.use("/api", eventRouter)
app.use("/api", bookingRouter)


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});