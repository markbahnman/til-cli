import fs from 'fs';

export function mkdir(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function exists(dir) {
  return new Promise((resolve, reject) => {
    // TODO check for correct permissions if exists
    fs.access(dir, fs.R_OK | fs.W_OK, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

export function mkdirIfNotExists(dir) {
  return exists(dir).then(() => {
    return Promise.resolve();
  }, () => {
    return mkdir(dir);
  });
}
