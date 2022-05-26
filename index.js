const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require('./routes/auth');
const userRoute = require("./routes/user");
const hotelRoute = require('./routes/hotel');
const roomRoute = require('./routes/room');
const billRoute = require('./routes/bill');

const app = express();
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log("DBConnection is successsfull."))
     .catch((error)=>{
         console.log(error);
     });
     
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/bills", billRoute);

app.listen(process.env.PORT , ()=>{
    console.log(`Server is running and listening at port ${process.env.PORT}.`);
})