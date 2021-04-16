const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('');

    assert.ok(service, 'Registered the service');
  });
});
