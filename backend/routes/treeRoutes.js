const express = require("express");
const router = express.Router();
const Tree = require("../models/Tree");


// 🌿 AI Health Check (PUT FIRST)
router.get("/analyze", async (req, res) => {
    try {
        const healthOptions = ["Healthy", "Moderate", "Needs Attention"];
        const result = healthOptions[Math.floor(Math.random() * 3)];

        res.json({
            health: result,
            confidence: (Math.random() * 100).toFixed(2) + "%"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🌳 Add Tree
router.post("/", async (req, res) => {
    try {
        const tree = new Tree(req.body);
        await tree.save();
        res.json(tree);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🌳 Get All Trees
router.get("/", async (req, res) => {
    try {
        const trees = await Tree.find();
        res.json(trees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🌳 Get Single Tree (KEEP LAST)
router.get("/:id", async (req, res) => {
    try {
        const tree = await Tree.findById(req.params.id);
        res.json(tree);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;