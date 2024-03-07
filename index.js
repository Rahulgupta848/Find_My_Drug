const express = require('express');
const cors = require("cors");
const { connectDB } = require('./config/database');
const authRouter = require('./routes/authRoutes');
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

app.use('/api/fmd/v1',authRouter);

app.listen(process.env.PORT,()=>{
     console.log(`Server is running on port ${process.env.PORT}`);
})
connectDB();