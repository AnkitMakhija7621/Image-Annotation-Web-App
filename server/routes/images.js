const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const Image = require('../models/image');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// const storage = multer.memoryStorage(); 
// const upload = multer({ storage: storage });
router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Process image with Sharp
        // const processedImage = await sharp(req.file.buffer)
        //     .resize(800, 600) // Resize to 800x600 pixels
        //     .grayscale() // Apply grayscale filter
        //     .toBuffer(); // Convert back to buffer for storing

        // const fn = req.file.filename;
        const newImage = new Image({ filename: req.file.filename });
        await newImage.save();

        
        // await sharp(processedImage).toFile(`uploads/${req.file.filename}`);

        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});







// Upload an image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const newImage = new Image({ filename: req.file.filename });
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all images
router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update annotation
router.put('/:id', async (req, res) => {
    try {
        const image = await Image.findByIdAndUpdate(req.params.id, { annotation: req.body.annotation }, { new: true });
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search images by annotation
router.get('/search', async (req, res) => {
    try {
        const query = req.query.annotation;
        const images = await Image.find({ annotation: { $regex: query, $options: 'i' } });
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
