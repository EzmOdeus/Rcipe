const Food = require("../models/Food");

const getWeeklyStats = async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const stats = await Food.aggregate([
      { $match: { user: req.user.id, createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          totalCalories: { $sum: "$calories" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving stats", error });
  }
};

module.exports = { getWeeklyStats };
