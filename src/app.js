import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

import { ConnectDatabase } from './config/db_config.js';
const connectDatabase = new ConnectDatabase();
connectDatabase.connectMongoDb();

app.use(express.json({ limit: "150mb" }))
app.use((req, res, next) => {
    const contentLength = req.headers['content-length'];
    if (contentLength) {
      console.log(`Incoming request size: ${contentLength} bytes`);
    }
    next();
  });

const PORT  = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})