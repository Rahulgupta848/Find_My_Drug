const express = require('express');
const { connectDB } = require('./config/database');
const authRouter = require('./routes/authRoutes');
const app = express();
app.use(express.json());
require("dotenv").config();

app.use('/api/fmd/v1',authRouter);

app.listen(process.env.PORT,()=>{
     console.log(`Server is running on port ${process.env.PORT}`);
})
connectDB();