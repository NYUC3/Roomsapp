import { expect } from 'chai';
import * as Interface from '../../lib/db/interface';
import * as DBObject from '../../lib/db';

////////////////
// DB Drivers //
////////////////

// Setup
import AWS from 'aws-sdk';
const dynamo = new AWS.DynamoDB({ 
  endpoint: new AWS.Endpoint('http://localhost:8000'),
});
dynamo.createTable({
  AttributeDefinitions: [
    {
      AttributeName: 'address',
      AttributeType: 'S',
    },
    {
      AttributeName: 'amenities',
      AttributeType: 'SS',
    },
    {
      AttributeName: 'locationId',
      AttributeType: 'S',
    },
    {
      AttributeName: 'name',
      AttributeType: 'S',
    },
  ]
},);

describe('DB Interface', function() {
  it('should return a payload object', function() {

    const params = {
      table: 'locations',
      keys: {
        locationId: 'BOBST',
      },
    };

    const result = Interface.call('get', params);
    expect(result).to.be.an('object');
    expect(result).to.have.property('data');
    expect(result).to.have.property('err');
  });  
});

describe('# DB Drivers', function() {
  describe('# Locations', function() {
    describe('get', function() {
      it('should return an object with a data property', function() {

        const id = 'BOBST';
        const result = DBObject.locations.get(id);
        expect(result).to.be.an('object').and.have.property('data');
      });
    });

    describe('list', function() {
      it('should return an array of objects carrying data properties', function() {

        const result = DBObject.locations.get();
        expect(result).to.be.an('array').and.not.be.empty;
      });
    });
  });

  describe('# Reservations', function() {
    describe('get', function() {
      it('should return an object with a data property', function() {

        const id = 'BOBST';
        const result = DBObject.reservations.get(id);
        expect(result).to.be.an('object').and.have.property('data');
      });
    });

    describe('list', function() {
      it('should return an array of objects carrying data properties', function() {

        const result = DBObject.reservations.get();
        expect(result).to.be.an('array').and.not.be.empty;
      });
    });
  });
}); 