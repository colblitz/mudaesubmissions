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
    // const { name, details } = req.body;
    // TODO: validate name + details
    const newSeries = await Series.create({...req.body, user: userId });
    return res.json(newSeries);
  } catch (error) {
    console.log("error adding series");
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

expressRouter.post("/addCharacter", authMiddleware, async (req, res) => {
  try {
    console.log("adding character");
    const { userId } = req.user;
    // const { name, gender, type, series, seriesName, imgurLink, source, role, note } = req.body;
    // TODO: validate name + details
    const newCharacter = await Character.create({...req.body, user: userId });
    return res.json(newCharacter);
  } catch (error) {
    console.log("error adding character");
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

expressRouter.delete("/removeCharacter", authMiddleware, async (req, res) => {
  try {
    console.log("adding character");
    const { userId } = req.user;
    // const { name, gender, type, series, seriesName, imgurLink, source, role, note } = req.body;
    // TODO: validate name + details

    console.log("deleting doc with id: ");
    console.log(req.body.characterId);
    await Character.deleteOne({ _id: req.body.characterId });

    return res.json();

//     User.deleteOne({ age: { $gte: 10 } }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

    // const newCharacter = await Character.create({...req.body, user: userId });
    // return res.json(newCharacter);
  } catch (error) {
    console.log("error adding character");
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
