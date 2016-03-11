import { forNewTIL, forSetup } from './questions';
import childProcess from 'child_process';
import { initRepo, addOrigin, commitTIL } from './git';
import { mkdir, exists, mkdirIfNotExists, safeRC} from './file_system';
import { safeTitle } from './helpers';
import config from './config';

export function openNewFileWithEditor(title, dir) {
  const tagDir = `${config.repo}${dir}`;
  return mkdirIfNotExists(tagDir).then(() => {
    return new Promise((resolve, reject) => {
      const alteredTitle = safeTitle(title);
      const newFileName = `${config.repo}${dir}/${alteredTitle}.md` || `${Date.now().toString()}.md`;

      const editorENV = process.env.EDITOR || ['vim'];
      const editor = editorENV.split(' ');
      const child = childProcess.spawn(editor[0],
                                       [...editor.slice(1), newFileName],
                                       { stdio: 'inherit',
                                         cwd: config.repo });
      child.on('error', (error) => {
        console.error('Something went wrong', error);
        reject(error);
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve({ title, tag: dir });
        } else {
          reject(code);
        }
      });
    });
  });
}

export function setupDirectory(rc) {
  if (!rc || !rc.repo) {
    return Promise.reject('error with give rc', rc);
  }
  const { repo, origin } = rc;

  return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    exists(repo).then(() => {
      return Promise.resolve();
    }, () => {
      return mkdir(repo);
    }).then(() => {
      return initRepo(repo);
    }).then(() => {
      if (origin) {
        return addOrigin(repo, origin);
      }
      return Promise.resolve();
    });
  });
}

export function createNewTIL() {
  return forNewTIL().then((answers) => {
    const { title, tag } = answers;
    return openNewFileWithEditor(title, tag);
  }).then((result) => {
    const { title, tag } = result;
    return commitTIL(title, tag);
  });
}

export function runFirstSetup() {
  return forSetup().then((answers) => {
    return saveRC(answers);
  }).then((rc) => {
    return setupDirectory(rc);
  });
}
