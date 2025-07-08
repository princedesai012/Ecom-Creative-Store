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




// Export upload middleware
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // limit to 5MB
});

export default upload;