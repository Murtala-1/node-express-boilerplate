const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const profile = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mylikita/profile_images",
    format: "png", // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});

const transactions = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mylikita/transaction_receipts",
    format: "png", // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});

const lab = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mylikita/lab_uploads",
    format: "png", // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});

const logos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mylikita/logos",
    format: "png", // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.profileStorage = multer({ storage: profile });
exports.transactionsStorage = multer({ storage: transactions });
exports.labStorage = multer({ storage: lab });
exports.logoStorage = multer({ storage: logos });
exports.localUpload = multer({ storage: localStorage})