import express from "express";

import { saveScore,getScores ,getLeaderboard,getUserStats,getTopicLeaderboard} from "../controllers/scoreController.js";

const scoreRouter = express.Router();

scoreRouter.post("/save", saveScore);
scoreRouter.get("/leaderboard/all",getLeaderboard);
scoreRouter.get("/leaderboard/:topic",getTopicLeaderboard);
scoreRouter.get("/stats/:userName",getUserStats);
scoreRouter.get("/:userName",getScores);


export default scoreRouter; 