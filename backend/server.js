const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const app = express();
const jobRoutes = require('./routes/jobs');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('DB Error:', err.message));

app.get('/',(req,res)=>{
    res.send('Campus Placement Portal API is running!');
});

app.listen(process.env.PORT,()=> {
    console.log(`Server started on port ${process.env.PORT}`);
});