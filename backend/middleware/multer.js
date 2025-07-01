// this file is used to configure multer for file uploads
// multer is a middleware for handling multipart/form-data
// which is primarily used for uploading files
// since we will be uploading product images,
// we will use multer to handle the file uploads
import multer from "multer";

// Configure multer storage
// diskStorage is used to store files on the local disk
const storage = multer.diskStorage({
  // destination where the files will be stored
  filename: (req, file, callback) => {
    // callback is used to pass the filename to multer
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
