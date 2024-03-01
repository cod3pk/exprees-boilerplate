const User = require("../models/User");
const Media = require("../models/Media");
const { uploadFileToS3 } = require("../services/s3Uploader");

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "video/mp4",
  "application/pdf",
];

exports.uploadFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  const userId = req.params.userId;
  const mimeType = file.mimetype;
  const fileName = file.name;

  try {
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).send({ message: "User not found" });
    }

    const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return res
        .status(400)
        .send({ message: "File size exceeds the maximum limit" });
    }

    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return res.status(400).send({ message: "File type is not allowed" });
    }

    const uploadResult = await uploadFileToS3(file.data, fileName, mimeType);
    const filePath = uploadResult.location;

    const newMedia = new Media({
      user: userId,
      fileUrl: filePath,
      fileType: mimeType,
      fileName: fileName,
    });

    await newMedia.save();
    res
      .status(201)
      .send({ message: "File uploaded successfully", data: newMedia });
  } catch (error) {
    console.error("File upload error:", error);
    res
      .status(500)
      .send({ message: "Failed to upload file", error: error.toString() });
  }
};
