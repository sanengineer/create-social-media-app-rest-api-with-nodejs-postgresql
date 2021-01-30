const multer = require("multer");
const path = require("path");

console.log("PATTTHH:", path.extname);
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".pdf" &&
      ext !== ".PDF" &&
      ext !== ".docs" &&
      ext !== ".DOCS"
    ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
