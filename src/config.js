import fs from 'fs';
import { getUserHome, getTILrc } from './helpers';

const rc = getTILrc();
let config = {
  repo: `${getUserHome()}/.til/`
};

try {
  const tilrcRaw = fs.readFileSync(rc);
  const tilrc = JSON.parse(tilrcRaw);
  config = { ...config, ...tilrc };
} catch (err) {
  // nothing
}

module.exports = config;
