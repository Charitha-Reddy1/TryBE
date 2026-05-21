import scoreModel from "../models/scoreModel.js";

const getTopicLeaderboard =
  async (req, res) => {

  try {

    const topic =
      req.params.topic;

    const scores =
      await scoreModel
        .find({ topic })
        .sort({ score: -1 });

    res.json(scores);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Failed to fetch topic leaderboard",
    });

  }

};

const getUserStats = async (req, res) => {

  try {

    const userName =
      req.params.userName;

    const userScores =
      await scoreModel.find({
        userName,
      });

    const quizzesCompleted =
      userScores.length;

    let bestScore = 0;

    userScores.forEach((item) => {

      const percent =
        Math.round(
          (item.score / item.total) * 100
        );

      if (percent > bestScore) {
        bestScore = percent;
      }

    });

    const leaderboard =
      await scoreModel
        .find()
        .sort({ score: -1 });

    const rank =
      leaderboard.findIndex(
        (item) =>
          item.userName === userName
      ) + 1;

    res.json({

      quizzesCompleted,

      bestScore,

      rank,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to fetch stats",
    });

  }

};

const saveScore = async (req, res) => {

  try {

    const { userName, topic, score, total } =
      req.body;

    const response =
      await scoreModel.findOneAndUpdate(

        {
          userName,
          topic,
        },

        {
          score,
          total,
        },

        {
          new: true,
          upsert: true,
        }

      );

    res.json(response);

  } catch (error) {

    console.log(error);

    res.json({
      error: "Failed to save score",
    });

  }

};

const getScores = async (req, res) => {

  const userName = req.params.userName;

  const scores =
    await scoreModel.find({ userName });

  res.json(scores);

};

const getLeaderboard = async (req, res) => {

  try {

    const scores = await scoreModel
      .find()
      .sort({ score: -1 });

    res.json(scores);

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch leaderboard",
    });

  }

};

export { saveScore,getScores,getLeaderboard, getUserStats,getTopicLeaderboard};