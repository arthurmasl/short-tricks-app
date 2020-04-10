import express from 'express';
import fs from 'fs';
import ytdl from 'ytdl-core';
import { finished } from 'stream';
import verifyToken from './verifyToken';

const DownloadRoute = express.Router();

DownloadRoute.post('/download', verifyToken, async (req, res) => {
  const { url } = req.body;

  let writeStream;
  const id = ytdl.getURLVideoID(url);

  const video = await fileExists(`server/videos/full/${id}.webm`);

  if (!video) {
    ytdl(url, { format: 247 }).pipe(
      (writeStream = fs.createWriteStream(`server/videos/full/${id}.webm`))
    );

    finished(writeStream, () => {
      console.log(`${id}: full video created`);
      res.send({ id });
    });
  } else {
    console.log(`${id}: full video exists`);
    res.send({ id });
  }
});

const fileExists = async url => {
  try {
    if (fs.existsSync(url)) {
      return true;
    }
  } catch (err) {
    return false;
  }
};

export default DownloadRoute;
