const express = require("express");
const jsonServer = require("json-server");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

// ---------- CORS ----------
app.use(cors());

// ---------- JSON Server router ----------
const router = jsonServer.router("src/data/database.json");

// ---------- Upload folder ----------
const uploadDir = path.join(__dirname, "public", "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ---------- Multer config ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

// ---------- Serve static images ----------
app.use("/images", express.static(uploadDir));

// ---------- Upload endpoint ----------
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }
  res.json({ imageUrl: `/images/${req.file.filename}` });
});

// ---------- JSON Server routes (mount after custom routes) ----------
app.use(router);

// ---------- Start server ----------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});