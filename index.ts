import express from "express";
import { AdminRoute, VendorRoute } from './routes';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

import config from './config';

// import { MONGO_URI } from "./config";
console.log('MONGO_URL =>', typeof process.env.MONGO_URL, process.env.MONGO_URL);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute);

// const mongo: string = MONGO_URI!;    

mongoose.connect(config.MONGO_URI)
    .then(() => {
        console.log("DB Connected");
    })
    .catch(err => console.log('error' + err))

const PORT = config.PORT || 8000;

app.listen(PORT, () => {
    console.log("server is running at port 8000");
});