import express from 'express'

import getImage from '../controller/getImage.js';

const getImageroute = express.Router();

getImageroute.get('/',getImage)

export default getImageroute
