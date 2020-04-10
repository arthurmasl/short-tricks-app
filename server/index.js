import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import DownloadRoute from './routes/download';
import CreateRoute from './routes/create';
import CategoriesRoute from './routes/categories';
import ItemsRoute from './routes/items';

import passport from 'passport';
import AuthRoute from './routes/auth';
import UserRoute from './routes/user';
import { deleteFullVideo } from './actions/deleteFullVideos';

// middlewares
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// auth
app.use(passport.initialize());
require('./config/passport');

// routes
app.use('/', express.static('build'));
app.use('/', AuthRoute);
app.use('/videos', express.static('server/videos'));
app.use('/api', CreateRoute);
app.use('/api', DownloadRoute);
app.use('/api', CategoriesRoute);
app.use('/api', ItemsRoute);
app.use('/api', UserRoute);

setInterval(() => {
  deleteFullVideo();
}, 1000 * 3600);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`server started on *:${port}`));

// connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to db');
  }
);
