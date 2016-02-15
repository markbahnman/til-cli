import 'babel-polyfill';
import program from 'commander';
import { createNewTIL, runFirstSetup } from './actions';
import { getTILrc } from './helpers';
import { exists } from './file_system';

program
  .version('0.1.0')
  .parse(process.argv);

exists(getTILrc())
.then(() => {
  return createNewTIL();
}, () => {
  return runFirstSetup();
}).then((blah) => {
  console.log('ran successfully', blah);
}).catch((err) => { console.error('uncaught error', err); });
