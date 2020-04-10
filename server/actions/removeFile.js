import fs from 'fs';

export const removeTrimmedVideo = (id) => {
  fs.unlink(`server/videos/trimmed/${id}.mp4`, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`${id}: trimmed video deleted`);
    return;
  });
};
