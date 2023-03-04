const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// get a router by its id //

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// create new reaction by using its id //

router
.route('/:thoughtId/reactions')
.post(createReaction)

// delete a reaction to a though by its id //

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;