const Meal = require("../models/Meal");
const Activity = require("../models/Activity");

exports.getDailyLog = async (req, res) => {
  try {
    // تحديد اليوم الحالي
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const endOfDay = new Date().setHours(23, 59, 59, 999);

    // جلب الوجبات المضافة اليوم
    const meals = await Meal.find({
      user: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate("foods", "name calories");

    // جلب الأنشطة المضافة اليوم
    const activities = await Activity.find({
      user: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    // حساب السعرات الحرارية المكتسبة
    const totalCaloriesConsumed = meals.reduce(
      (sum, meal) => sum + meal.totalCalories,
      0
    );

    // حساب السعرات الحرارية المحروقة
    const totalCaloriesBurned = activities.reduce(
      (sum, activity) => sum + activity.caloriesBurned,
      0
    );

    // حساب السعرات الحرارية الصافية
    const netCalories = totalCaloriesConsumed - totalCaloriesBurned;

    // إرسال البيانات إلى العميل
    res.status(200).json({
      meals,
      activities,
      summary: {
        totalCaloriesConsumed,
        totalCaloriesBurned,
        netCalories,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
