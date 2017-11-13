import { expect } from 'chai';
import * as Interface from '../../lib/db/interface';
import * as DBObject from '../../lib/db';
import * as dbMock from '../dbMock.util';

////////////////
// DB Drivers //
////////////////

before('Setting up locations table', (done) => { dbMock.setupLocations(done); });

describe('# DB Interface', function() {


  it('should return a payload object', async function() {

    const params = {
      table: 'locations',
      keys: {
        locationId: 'BOBST',
      },
    };

    const result = await Interface.call('get', params);
    // console.log(result);
    expect(result).to.be.an('object').and.have.property('locationId');
  });  
});

describe('# DB Drivers', function() {

  describe('# Locations', function() {

    describe('# get', function() {
      it('should return an object with a data property', async function() {

        const id = 'BOBST';
        const result = await DBObject.locations.get(id);
        expect(result).to.be.an('object').and.have.property('locationId');
      });
    });

    describe('# list', function() {
      it('should return an array of objects carrying data properties', async function() {

        const result = await DBObject.locations.list();
        expect(result).to.be.an('array').and.not.be.empty;
      });
    });

  });
}); 

after('Deleting locations table', (done) => { dbMock.clearLocations(done); });
