import express from "express";

import { saveScore,getScores } from "../controllers/scoreController.js";

const scoreRouter = express.Router();

scoreRouter.post("/save", saveScore);
scoreRouter.get("/:userName",getScores);

export default scoreRouter; 