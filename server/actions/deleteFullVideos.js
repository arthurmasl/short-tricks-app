import fs from 'fs';

export const deleteFullVideo = () => {
  fs.readdirSync('server/videos/full').forEach((file) => {
    const { mtime } = fs.statSync(`server/videos/full/${file}`);
    const seconds = (new Date().getTime() - mtime) / 1000;

    if (seconds > 3600) {
      fs.unlink(`server/videos/full/${file}`, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(`${file} full video deleted`);
        return;
      });
    }
  });
};
