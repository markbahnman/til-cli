import childProcess from 'child_process';
import { safeTitle } from './helpers';
import config from './config';

export function addOrigin(repo, origin) {
  return new Promise((resolve, reject) => {
    const gitAdd = childProcess.spawn('git',
                                      ['remote', 'add', 'origin', origin],
                                      { stdio: 'inherit', cwd: repo });
    gitAdd.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}

function addToCommit(file) {
  console.log('adding file', file, 'to commit in repo', config.repo);
  return new Promise((resolve, reject) => {
    const add = childProcess.spawn('git',
                                   ['add', file],
                                   { stdio: 'inherit', cwd: config.repo });

    add.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}

export function commitTIL(title, tag) {
  const file = `${tag}/${safeTitle(title)}.md`;
  const message = `${title} #${tag}`;

  return addToCommit(file).then(() => {
    return new Promise((resolve, reject) => {
      const commit = childProcess.spawn('git',
                                        ['commit', '-m', message],
                                        { stdio: 'inherit', cwd: config.repo });

      commit.on('close', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(code);
        }
      });
    });
  });
}

export function initRepo(dir) {
  return new Promise((resolve, reject) => {
    const gitInit = childProcess.spawn('git',
                                       ['init'],
                                       { stdio: 'inherit', cwd: dir });
    gitInit.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}
