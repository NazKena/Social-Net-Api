const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema (
    {
        thoughtText: {
          type: String,
          required: true,
          maxlength: 280,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: formatDate,
        },
        username: {
          type: String,
          required: true,
        },
        reactions: [reactionSchema],
      },
      {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
    );

      // Created a virtual called friendCount that retrieves the length of the user's friends array field on query //

  thoughtSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  