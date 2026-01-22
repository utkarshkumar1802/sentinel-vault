const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/authMiddleware');
const Vault = require('../models/Vault');
// Multer Storage Config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `SENTINEL-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// @route   POST api/vault/upload
// @desc    Upload file to secure vault
router.post('/upload', [auth, upload.single('file')], async (req, res) => {
  try {
    const newFile = new Vault({
      user: req.user.id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileType: req.file.mimetype
    });
    const savedFile = await newFile.save();
    res.json(savedFile);
  } catch (err) {
    res.status(500).send('Vault Upload Error');
  }
});

// @route   GET api/vault
// @desc    Get ONLY the logged-in user's files
router.get('/', auth, async (req, res) => {
  try {
    const files = await Vault.find({ user: req.user.id }).sort({ date: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).send('Vault Retrieval Error');
  }
});
// @route   DELETE api/vault/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const file = await Vault.findById(req.params.id);
    if (!file) return res.status(404).json({ msg: 'File not found' });

    // Check if user owns the file
    if (file.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await file.deleteOne();
    res.json({ msg: 'File removed from vault' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;