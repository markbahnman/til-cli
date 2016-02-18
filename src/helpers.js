import { loadRC } from './file_system';
import config from './config';

export function getUserHome() {
  return process.env.HOME || process.env.USERPROFILE;
}

export function getTILrc() {
  return `${getUserHome()}/.tilrc`;
}

export function getRepo() {
  return loadRC().then((rc) => {
    const { repo } = rc;
    return Promise.resolve(repo);
  });
}

export function mergeData(oldData, newData) {
  return new Promise((resolve, reject) => {
    if (oldData && newData) {
      resolve({ ...oldData, ...newData });
    } else {
      reject('Could not merge data', oldData, newData);
    }
  });

}

function extractData(data) {
  let extractedData = {}; // eslint-disable-line prefer-const
  const wantedKeys = ['repo', 'origin'];

  for (let key in data) { // eslint-disable-line prefer-const
    if (wantedKeys.indexOf(key) !== -1) {
      extractedData[key] = data[key];
    }
  }
  return extractedData;
}
export function safeTitle(title) {
  return title.replace(/[^a-z0-9_\-]/gi, '-').toLowerCase();
}
