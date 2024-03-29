const router = require("express").Router();
const Message = require("../models/Message");

//ADD
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET
router.get("/:conversationId", async (req, res) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.json(message)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
