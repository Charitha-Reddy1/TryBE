import express from "express";

import { saveScore,getScores ,getLeaderboard} from "../controllers/scoreController.js";

const scoreRouter = express.Router();

scoreRouter.post("/save", saveScore);
scoreRouter.get("/leaderboard/all",getLeaderboard);
scoreRouter.get("/:userName",getScores);


export default scoreRouter; 