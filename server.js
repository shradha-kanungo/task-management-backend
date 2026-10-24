const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

//middleware
app.use(express.json());
app.use(cors());


//MongoDB Database Connection 
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('MongoDB Connected Successfully!'))
    .catch((err)=> console.error('MongoDB Connection Error:', err));

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks' , require('./routes/tasks'));

//Test route
app.get('/',(req,res) =>{
    res.send('Task management Server running successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});