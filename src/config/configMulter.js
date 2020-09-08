import multer from 'multer';
import crypto from 'crypto';
import {resolve, extname} from 'path';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (request, file, callback) => {

            const filetypes = /jpeg|jpg|png|gif/;
            const ename = filetypes
            .test(extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);

            if(!mimetype && !ename){
                return callback('Error: Images Only!');
            }

            crypto.randomBytes(16, (err, response) => {
                if(err){ 
                    return callback(err);
                }
                
                return callback(null, 
                    response.toString('hex') + extname(file.originalname));
            });
        }
    })
}