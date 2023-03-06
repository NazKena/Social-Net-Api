const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");


// get users and create 

router.route("/")
.get(getThoughts)
.post(createThought);

// get a router by its id //

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// create new reaction by using its id //

router
.route('/:thoughtId/reactions')

// delete a reaction to a though by its id //

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;