const { Wine } = require("../models/wine");
const express = require('express');
const router = express.Router();
//* Get all wines
router.get("/", async (req, res) => {
    try {
      const wines = await Wine.find();
      return res.send(wines);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
//* Post Wines
  router.post('/add', async (req, res) => {
    try {

        const wine = new Wine(req.body);

        await wine.save();

        return res.send(wine);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

  module.exports = router;

