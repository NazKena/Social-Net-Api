const { User, Thought } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    console.log("getting thoughts");
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        console.log("thoughts found", dbThoughtData);
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No Thought have been found with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        res.json({ message: "Thought successfully created!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) => {
        if (!thoughts) {
          return res
            .status(404)
            .json({ message: "No thought has been found with this ID" });
        }
        res.json({ message: "Thought has been updated", thoughts });
      })
      .catch((err) => {
        console.log(`ERROR: Failed to update thought! | ${err.message}`);
        res.status(500).json({ message: "Failed to update thought!", err });
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(() => res.json({ message: "thought has been deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((newReaction) => {
        if (!newReaction) {
          res
            .status(404)
            .json({ message: "No thought has been found with that ID!" });
          return;
        }
        res.json({ message: "Reacted to thought!", newReaction });
      })
      .catch((err) => {
        console.log(`ERROR: Failed to react to thought! | ${err.message}`);
        res.status(500).json({ message: "Failed to react to thought!", err });
      });
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((reactionDeleted) => {
        res.json({ message: "Reaction has been deleted!", reactionDeleted });
      })
      .catch((err) => {
        console.log(`ERROR: Failed to delete reaction! | ${err.message}`);
        res.status(500).json({ message: "Failed to delete reaction!", err });
      });
  },
};

module.exports = thoughtController;
