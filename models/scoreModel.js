import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({

  userName: {
    type: String,
    required: true,
  },

  topic: {
    type: String,
    required: true,
  },

  score: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

});

const scoreModel = mongoose.model(
  "Score",
  scoreSchema
);

export default scoreModel;