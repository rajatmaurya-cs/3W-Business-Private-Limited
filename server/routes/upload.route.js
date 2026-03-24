import express from 'express'
import multer from "multer";

import uploadImage from '../controller/upload.js';

const upload = multer({storage : multer.diskStorage({})})

const uploadroute = express.Router();


uploadroute.post('/image',upload.single('file'), uploadImage );




export default uploadroute
