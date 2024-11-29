const app = require(".");
const connectDB = require("./config/db");

// اتصال قاعدة البيانات
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
