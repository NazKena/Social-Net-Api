const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");

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
          get: timestamp => dateFormat(timestamp),
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
      const Thought = model('Thought', thoughtSchema);
    
      module.exports = Thought;  
  

  