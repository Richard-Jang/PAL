const express = require('express');
const { Post } = require('../models/Post');
const { Room } = require('../models/Room');

const router = express.Router();

// --- POSTS ---
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    // Map _id to id for frontend compatibility
    const formatted = posts.map(p => ({ ...p.toObject(), id: p._id.toString() }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({ ...post.toObject(), id: post._id.toString() });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- ROOMS ---
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true }).sort({ createdAt: -1 });
    const formatted = rooms.map(r => ({ ...r.toObject(), id: r._id.toString() }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/rooms', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({ ...room.toObject(), id: room._id.toString() });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
