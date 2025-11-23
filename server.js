const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// handle form POST
app.post("/submit", async (req, res) => {
  try {
    // ارسال داده‌ها به وبهوک n8n
    await axios.post("https://meymand72.app.n8n.cloud/webhook-test/paradise-feedback", req.body);

    res.send("نظر شما با موفقیت ثبت شد. ممنون از همراهی شما ✨");
  } catch (err) {
    console.error(err);
    res.status(500).send("مشکلی رخ داده است. لطفاً دوباره تلاش کنید.");
  }
});

// Render uses this port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
