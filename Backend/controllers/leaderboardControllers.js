import userModel from "../models/userModel.js";

export const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await userModel
      .find({}, "name totalBalance") 
      .sort({ totalBalance: -1 })
      .limit(10);

    res.json({
      success: true,
      message: "Top users retrieved",
      leaderboard: topUsers,
    });
  } catch (error) {
    console.error("Leaderboard fetch failed:", error);
    res.json({
      success: false,
      message: "Failed to fetch leaderboard",
      error: error.message,
    });
  }
};



