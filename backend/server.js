const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');
const profileRoutes = require('./routes/profile');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('DB Error:', err.message));

app.get('/',(req,res)=>{
    res.send('Campus Placement Portal API is running!');
});

app.listen(process.env.PORT,()=> {
    console.log(`Server started on port ${process.env.PORT}`);
});