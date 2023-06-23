const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const app = express();

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users",userRouter);


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log(error.message);
    }
  console.log(`Server is running on port ${process.env.PORT}`);
})
