const express = require('express');
const router = express.Router();
const fs = require("fs")
const Image = require('../models/Image');
const cloudinary = require("../config/cloudinaryConfig")
const upload = require("../utils/multerFig")
const { sendmail } = require("../utils/mailer")

// Create a new image
router.post('/images', upload.single("myimage"), async (req, res) => {
    console.log("made it to the route")
    try {
        // console.log("req.file: ", req.file)
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        console.log("Result from Cloudinary: ", result)

        const { name, description } = req.body;
        const originalname = req.file.originalname;
        const url = result.secure_url;
        const signature = result.signature;
        const image = new Image({ name, description, url, originalname, signature });
        const savedImage = await image.save();

        // Send email

        let emailResponse = sendmail("jwhite777@proton.me", "jwhite789@protonmail.com", "Another Test", "This is my second message using nodemailer", `
        <h3>Image Name: ${originalname}</h3>
        <p>${description}</p>
        `);

        emailResponse
            .then((response) => {
                console.log("message came back: ", response)
            })
        // res.json(images);


        // Remove the file from temporary storage
        const temporaryFilePath = req.file.path;
        fs.unlink(temporaryFilePath, (err) => {
            if (err) {
                console.error('Error removing file:', err);
            } else {
                console.log('File removed successfully');
            }
        });


        // res.json(savedImage);

        res.json({ testing: "Still testing" })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all images
router.get('/images', async (req, res) => {
    try {
        const images = await Image.find();

        // let emailResponse = sendmail("jwhite777@proton.me", "jwhite789@protonmail.com", "Another Test", "This is my second message using nodemailer", `
        // <h1>Message using HTML</h1>
        // <p>This a little note.</p>
        // `);

        // emailResponse
        //     .then((response) => {
        //         console.log("message came back: ", response)
        //     })
        // res.json(images);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

// Get a specific image by ID
router.get('/images/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an image
router.put('/images/:id', async (req, res) => {
    try {
        const { name, description, url, signature } = req.body;
        const updatedImage = await Image.findByIdAndUpdate(
            req.params.id,
            { name, description, url, signature },
            { new: true }
        );
        if (!updatedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json(updatedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an image
router.delete('/images/:id', async (req, res) => {
    try {
        const deletedImage = await Image.findByIdAndRemove(req.params.id);
        if (!deletedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
