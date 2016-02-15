import inquirer from 'inquirer';
import config from './config';

export function forNewTIL() {
  return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    const questions = [
      {
        type: 'input',
        name: 'title',
        message: 'Title for this TIL?'
      },
      {
        type: 'input',
        name: 'tag',
        message: 'What should this be tagged under?',
        valiate: (tag) => { return tag.length > 0; }
      }
    ];

    inquirer.prompt(questions, (answers) => {
      resolve(answers);
    });
  });
}

export function forSetup() {
  return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    const questions = [
      {
        type: 'input',
        message: 'Where do you want to keep the repo?',
        name: 'repo',
        default: config.repo
      },
      {
        type: 'confirm',
        message: 'Do you want to link the repo to a remote origin?',
        name: 'confirmOrigin',
        default: false
      },
      {
        type: 'input',
        message: 'What to you want the remote origin to be?',
        name: 'origin',
        when: (input) => { return input.confirmOrigin; }
      }];

    inquirer.prompt(questions, (answers) => {
      resolve(answers);
    });
  });
}
