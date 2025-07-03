import multer from "multer";
import path from "path";

// Set up storage engine
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'public/temp')


    },
    filename : (req,file,cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
// Initialize multer with the storage engine

// Set up file filter function
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
    }
};

// Export upload middleware
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // limit to 5MB
});

export default upload;