import multer from "multer";

const storage = multer.diskStorage({
    destination: function(request, file, cb){
        cb(null, "src/public")
    },
    filename: function(request, file, cb){
        cb(null, file.originalname)
    }
});

export const loader = multer({storage});