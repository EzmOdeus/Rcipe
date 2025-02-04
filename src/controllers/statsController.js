// const Food = require("../models/Food");

// const getWeeklyStats = async (req, res) => {
//   try {
//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() - 7);

//     const stats = await Food.aggregate([
//       { $match: { user: req.user.id, createdAt: { $gte: startDate } } },
//       {
//         $group: {
//           _id: { $dayOfWeek: "$createdAt" },
//           totalCalories: { $sum: "$calories" },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     res.status(200).json(stats);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving stats", error });
//   }
// };

// module.exports = { getWeeklyStats };
const Food = require("../models/Food");

const getWeeklyStats = async (req, res) => {
  try {
    // التحقق من وجود المستخدم
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    // تحديد تاريخ البداية (قبل 7 أيام)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0); // ضبط الوقت إلى بداية اليوم

    const stats = await Food.aggregate([
      {
        $match: {
          user: req.user.id,
          createdAt: { $gte: startDate }, // التأكد أن createdAt صالح
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" }, // تجميع حسب اليوم
          totalCalories: { $sum: "$calories" }, // حساب إجمالي السعرات
        },
      },
      { $sort: { _id: 1 } }, // ترتيب النتائج حسب اليوم
    ]);

    res.status(200).json(stats);
  } catch (error) {
    // استرجاع الأخطاء بشكل مفصل
    res
      .status(500)
      .json({ message: "Error retrieving stats", error: error.message });
  }
};

module.exports = { getWeeklyStats };
