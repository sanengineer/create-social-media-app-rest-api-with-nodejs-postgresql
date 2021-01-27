const multer = require("multer");
const path = require("path");

console.log("PATTTHH:", path.extname);
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    //
    //debug
    console.log("EXTTT:", ext);

    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".JPG" &&
      ext !== ".PNG" &&
      ext !== ".JPEG"
    ) {
      cb(new Error("Srorry Your File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
