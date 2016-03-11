import fs from 'fs';
import { getTILrc } from './helpers';

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

export function saveRC(data) {
  return new Promise((resolve, reject) => {
    const extractedData = extractData({ ...config, ...data });
    const prettyData = JSON.stringify(extractedData, null, 2);

    fs.writeFile(getTILrc(), prettyData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(extractedData);
      }
    });
  });
}

export function loadRC() {
  return new Promise((resolve, reject) => {
    fs.readFile(getTILrc(), 'utf8', (err, data) => {
      // TODO check file persmissions
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}
