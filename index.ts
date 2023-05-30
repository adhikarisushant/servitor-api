import express from "express";
import dotenv from 'dotenv'
dotenv.config();
import { AdminRoute, VendorRoute } from './routes';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import path from 'path';

import { DEV_PORT, MONGO } from "./config";
// import config from './config';


// import { MONGO_URI } from "./config";
// console.log('MONGO_URL =>', typeof process.env.MONGO_URL, process.env.MONGO_URL);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, './images')));

app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute);

// const mongo: string = MONGO_URI!;    

mongoose.connect(MONGO)
    .then(() => {
        console.log("DB Connected");
    })
    .catch(err => console.log('error' + err))

const PORT = DEV_PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running at port ${DEV_PORT}`);
});