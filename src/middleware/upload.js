import multer from "multer"; // Import multer for handling file uploads
import path from "path"; // Import path module for handling file paths
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage engine for multer
const storage = multer.diskStorage({
  // Function to determine user destination directory
  destination: function (req, file, cb) {
    // Determine user destination directory
    // Ensure the directory exists
    cb(null, path.join(__dirname, "../../uploads")); // Callback with null error and destination path
  },
  // Function to determine filename
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Create a unique suffix using timestamp and random number
    cb(
      null, // No error
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname), // Construct filename: fieldname-uniqueSuffix.extension
    );
  },
});

// Function to filter files based on mimetype
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    // Check if the file is an image
    cb(null, true); // Accept file
  } else {
    cb(new Error("Not an image! Please upload an image."), false); // Reject file with error
  }
};

// Initialize multer with configuration
const upload = multer({
  storage: storage, // Set storage engine
  fileFilter: fileFilter, // Set file filter
  limits: {
    fileSize: 1024 * 1024 * 5, // Set file size limit to 5MB
  },
});

export { upload }; // Export the upload middleware
