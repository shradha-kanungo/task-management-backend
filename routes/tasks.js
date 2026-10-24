const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// 1. CREATE TASK (POST /api/tasks) - Protected Route
router.post('/', auth, async (req, res) => {
    try {
        const { title, description } = req.body;

        const newTask = new Task({
            title,
            description,
            user: req.user // Middleware se aayi hui logged-in user ki ID
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET ALL TASKS FOR LOGGED-IN USER (GET /api/tasks) - Protected Route
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. UPDATE TASK STATUS (PUT /api/tasks/:id) - Protected Route
router.put('/:id', auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Check if user owns this task
        if (task.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. DELETE TASK (DELETE /api/tasks/:id) - Protected Route
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Check if user owns this task
        if (task.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task removed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;