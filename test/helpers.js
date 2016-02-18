import chai, { expect } from 'chai';
import sinon from 'sinon';
import { getRepo, safeTitle } from '../src/helpers';
const fs = require('../src/file_system');

const should = chai.should();

describe('helpers', () => {
  describe('getRepo', () => {
    it('getRepo should return the rc file data', (done) => {
      const stubRC = { repo: '/home/test/.tilrc' };
      let stub = sinon.stub(fs, 'loadRC')
      stub.returns(Promise.resolve(stubRC));

      getRepo().then((rc) => {
        should.exist(rc);
        rc.should.equal(stubRC.repo);
        stub.called.should.be.true;
        done();
      }).catch((err) => { done(err) });
    });
  });

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
