const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/user");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("image"), async (req, res) => {
    const { email, text } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = new User({ email, text, image });
    await newUser.save();

    res.json({ message: "Data received successfully!", user: newUser });
});

router.get("/posts", async (req, res) => {
    const posts = await User.find();
    res.json(posts);
});

module.exports = router;
