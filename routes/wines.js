const { Wine, Review, validateReview } = require("../models/wine");
const auth = require('../middleware/auth');
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
//* POST Wines
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
router.post('/:Id/reviews', async (req, res) => {
  try{
    const {body:{text, rating}, params:{Id}} = req
    const review = {
      text,
      rating
    };
      let wine = await Wine.findById(Id);
      console.log(wine);
      let newReview =  new Review(review);
      let { error } = validateReview(req.body);
      if (error) return res.status(400).send(`Body not valid ${error}`)
      console.log('reviews: ', review);
      wine.reviews.push(newReview);
      await wine.save();
      return res.send(newReview);
      
  } catch (ex){
      return res.status(500).send(`Internal Server Error: ${ex.message}`);
    }
});

router.get('/:Id/reviews', async (req, res) => {
  try {
      const wine = await Wine.findById(req.params.Id);
      return res.send(wine);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
      }
});
  module.exports = router;
