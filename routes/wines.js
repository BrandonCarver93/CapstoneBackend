const { Wine, Review, validateRating } = require("../models/wine");
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
   
      let wine = await Wine.findById(req.params.Id);
      // console.log(wine);
      let review =  new Review({text: req.body.text});
      console.log('reviews: ', review);
      wine.reviews.push(review);
      await wine.save();
  
      return res.status(200);
      
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

/*   //* PUT update review
  router.put('/:Id', async (req, res) => {
    try {
        const {error} = validateRating(req.body);
        if (error) return res.status(400).send(error);
        const review = await Review.findByIdAndUpdate(req.params.Id, 
            {
                rating: req.body.rating
            },
            { new: true }
            );
            if (!review)
                return res.status(400).send(`The review with id "${req.params.Id}"
                does not exist.`);
            await review.save();
            return res.send(review);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
      }
});
 */
