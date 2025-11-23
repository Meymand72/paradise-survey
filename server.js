const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

// برای ارسال فرم
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔥 کل فولدر را استاتیک سرو کن
// یعنی logo_paradise.png هم درست لود می‌شود
app.use(express.static(__dirname));

// صفحه اصلی
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ارسال اطلاعات فرم به n8n
app.post("/submit", async (req, res) => {
  try {
    await axios.post(
      "https://meymand72.app.n8n.cloud/webhook-test/paradise-feedback",
      req.body
    );

    res.send("نظر شما با موفقیت ثبت شد. ممنون از همراهی شما ✨");
  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).send("مشکلی رخ داده است. لطفاً دوباره تلاش کنید.");
  }
});

// پورت رندر
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
