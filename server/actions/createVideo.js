import shortid from 'shortid';
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');

const path = 'server/videos';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export const createVideo = ({ start, end, videoId }) => {
  const id = shortid.generate();

  return new Promise((resolve) => {
    ffmpeg(`${path}/full/${videoId}.webm`)
      .output(`${path}/trimmed/${id}.mp4`)
      .setStartTime(start)
      .duration(end - start)
      .noAudio()

      .on('error', (err) => {
        console.log(err);
      })
      .on('end', () => {
        console.log(`${id}: trimmed video created`);
        // removeFullFile(id);
        return resolve(id);
      })
      .run();
  });
};
