const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' ,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending' , 'Completed'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['Low' , 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: {
        type: String,
    },
    category: {
        type: String ,
        enum: ['Work' , 'Personal' , 'Study'],
        default: 'Work' ,
    },
} , { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);