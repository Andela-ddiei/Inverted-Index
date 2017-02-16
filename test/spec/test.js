const chai = require('chai');

const assert = chai.assert;

const myApp = require('../../src/js/inverted-index.js');

describe('Sample test', () => {
  it('should return 2 ', () => {
    assert(myApp.invertedIndex() === 2);
  })

});

