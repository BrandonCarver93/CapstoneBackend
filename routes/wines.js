const { Wine, Review } = require("../models/wine");
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

  //* Get wine by id
  router.get('/:wineId', async (req, res) => {
      try {
          const wine = await Wine.findById(req.params.wineId);
          return res.send(wine);
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

//* POST reviews
  router.post('/:wineId/reviews', async (req, res) => {
    try{
        let wine = await Wine.findById(req.params.wineId);
        let review = new Review(req.body);
        wine.reviews.push(review);
        await wine.save();
        return res.send(wine);
    } catch (ex){
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


  module.exports = router;

