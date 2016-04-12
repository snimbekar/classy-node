import {expect, assert} from 'chai';
import nock from 'nock';

import Classy from '../src/Classy';
import ClassyResource from '../src/ClassyResource';
import resources from '../src/resources';
import _ from 'lodash';

describe('ClassyResource', () => {
  let classy;

  beforeEach(() => {
    classy = new Classy({
      clientId: 'client_id_str',
      clientSecret: 'client_secret_str'
    });
  });

  describe('createMethod', () => {

    it('should fail without required params', () => {
      const resource = new ClassyResource(classy, {
        path: '/test'
      });

      const method = resource.createMethod({
        path: '/{id}/test'
      });

      assert.throw(() => {
        method();
      }, Error);
    });

    it('should hit correct URL when called', () => {

      const resource = new ClassyResource(classy, {
        path: '/test'
      });

      const method = resource.createMethod({
        method: 'GET',
        path: '/{id}/test'
      });

      const result = {prop: true};

      let scope = nock('https://api.classy.org')
        .get('/2.0/test/1/test')
        .reply(200, result);

      method('1').then(function(response) {
        expect(response.prop).to.be.true;
      });

    });

  });

});