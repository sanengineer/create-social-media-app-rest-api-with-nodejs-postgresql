const multer = require("multer");
const path = require("path");

console.log("PATTTHH:", path.extname);
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".mp4" && ext !== ".MP4" && ext !== ".mov" && ext !== ".MOV") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
