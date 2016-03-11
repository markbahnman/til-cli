import chai, { expect } from 'chai';
import sinon from 'sinon';
import { safeTitle } from '../src/helpers';
const fs = require('../src/file_system');

const should = chai.should();

describe('helpers', () => {
  describe('safeTitle', () => {
    // TODO handle multiple spaces gracefully
    it('should remove spaces, because fuck spaces', () => {
      const title = safeTitle('New Title yeeeeaaah');
      title.should.not.include(' ');
    });

    // TODO actually handle emojii
    it('should remove emoji, because 🖕 emoji', () => {
      const title = safeTitle('Wat🖕');
      title.should.not.include('🖕');
    });
  });
});
