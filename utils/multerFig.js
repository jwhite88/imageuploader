const multer = require("multer");
const path = require("path");

// const upload = multer(
//     {
//         storage: multer.diskStorage({
//             destination: function (req, file, cb) {
//                 cb(null, path.join(__dirname, "../public/images/figuras"));
//             },
//             filename: function (req, file, cb) {
//                 cb(null, Date.now() + "-" + file.originalname);
//             },
//         }),
//     }
// )

const upload = multer({
    dest: path.resolve(__dirname, "../media/"),
});

module.exports =  upload;