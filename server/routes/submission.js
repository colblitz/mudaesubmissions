const expressRouter = require("express").Router();
const authMiddleware = require("./authMiddleware");

const Series = require("../models/series");
const Character = require("../models/character");


expressRouter.get("/getAllSeries", async (req, res) => {
  try {
    const series = await Series.find({}, "-user").populate("characters");
    // console.log(series);
    return res.json(series);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

expressRouter.get("/getUserSubmissions", authMiddleware, async (req, res) => {
  try {
    console.log("getting user submissions");
    const { userId } = req.user;
    const series = await Series.find({ user: userId }).populate("characters");
    const characters = await Character.find({ user: userId, series: null });

    return res.json({ series: series, characters: characters });
  } catch (error) {
    console.log("error getting user submissions");
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

expressRouter.post("/addSeries", authMiddleware, async (req, res) => {
  try {
    console.log("adding series");
    const { userId } = req.user;
    const { name, details } = req.body;
    // TODO: validate name + details
    const newSeries = await Series.create({ user: userId, name, details });
      // user: userId,
      // name: name,
      // details: details,
      // characters: [] });


  // user: { type: mongoose.Types.ObjectId, ref: "user" },
  // name: { type: String },
  // details: { type: String },
  // characters: [{ type: Schema.Types.ObjectId, ref: "character" }]

    return res.json(newSeries);
  } catch (error) {
    console.log("error adding series");
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

// expressRouter.patch(
//   "/updateSubmission/:submissionId",
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const { userId } = req.user;
//       const { submissionId } = req.params;
//       const { submission } = req.body;
//       const findSubmission = await Submission.findById(submissionId);
//       if (!findSubmission) {
//         return res.status(404).json({ message: "Submission not found" });
//       }
//       if (userId.toString() !== findSubmission.userId.toString()) {
//         return res
//           .status(403)
//           .json({ message: "You don't have permission to update submission." });
//       }
//       const updatedSubmission = await Submission.findOneAndUpdate(
//         { _id: submissionId },
//         { submission },
//         { new: true }
//       );
//       const submissions = await Submission.find({
//         userId: userId,
//       }).populate({
//         path: "userId",
//         model: "user",
//         select: "username",
//       });
//       return res.json({ data: submissions });
//     } catch (error) {
//       return res.status(400).json({ message: error.message });
//     }
//   }
// );

module.exports = expressRouter;
