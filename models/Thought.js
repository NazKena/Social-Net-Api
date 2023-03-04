
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
