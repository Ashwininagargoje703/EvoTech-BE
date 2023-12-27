var express = require("express");
var router = express.Router();
const UploadService = require("../services/uploadService");
let multer = require("multer");
const fromController = require("../controllers/form");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.post("/upload-image", upload.single("image"), async (req, res) => {
  const file = req.file;
  await UploadService.uploadFile(file, (err, data) => {
    if (err) return res.send({ success: false, message: "upload failed" });
    return res.send({ success: true, data: data });
  });
});

router.post("/submitFrom", fromController.submitForm);
// router.post("/getAllForm", fromController.getAllForm);
router.get("/getAllForm", fromController.getAllForm);

router.post("/updateForm", fromController.updateForm);
router.post("/deleteForm", fromController.deleteForm);

module.exports = router;
