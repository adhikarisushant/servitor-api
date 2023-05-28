import express from "express";
import { AdminRoute, VendorRoute } from './routes';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

import { MONGO_URI } from "./config";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("DB Connected");
    })
    .catch(err => console.log('error' + err))

const PORT = process.env.NODE_ENV || 8000;

app.listen(PORT, () => {
    console.log("server is running at port 8000");
});