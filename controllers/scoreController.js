import scoreModel from "../models/scoreModel.js";

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

export { saveScore,getScores };