import express from 'express'

import "dotenv/config";

import connectDB from './utils/db.js';

import authroutes from './routes/auth.route.js';

import uploadroute from './routes/upload.route.js';

import getImageroute from './routes/image.route.js';

import cors from 'cors'

const app = express();

app.use(cors())



const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

app.options(/.*/, cors(corsOptions));





let x = false;

const init = async () => {

  await connectDB();

}

if (!x) init();

app.get('/health', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running 🚀",
  });
  return;
});



app.use('/auth', authroutes);
app.use('/upload', uploadroute);
app.use('/getImage', getImageroute);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});




app.listen(3000, () => {

  console.log('Server is running on PORT: 3000')
})



