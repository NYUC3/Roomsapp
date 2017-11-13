import { expect } from 'chai';
import * as DynamoDB from '../../lib/db/dynamodb';
import * as dbMock from '../dbMock.util';

////////////////////
// DynamoDB Tests //
////////////////////
describe('# DynamoDB', function() {
  before('# Setting up locations table', dbMock.setupLocations);
  describe('# Params: Good Params', function() {
    it('should return a valid standardized Params object when passed a valid object', function() {

      const params = new DynamoDB.Params({
        table: 'table',
        keys: {
          locationId: 'key',
        },
      });

      expect(params).to.deep.equal({
        TableName: 'table',
        Key: {
          locationId: 'key',
        },
      });
    });
  });

  describe('# Params: Half Params', function() {
    it('should accept the bare minimum of Params and return a valid bare minimum Params', function() {

      const params = new DynamoDB.Params({
        table: 'table',
      });

      expect(params).to.deep.equal({
        TableName: 'table',
      });
    });
  });

  describe('# Params: Bad Params:', function() {
    it('should throw an error for misformatted Params', function() {

      expect(new DynamoDB.Params({
        badTableName: 'table',
        badKey: {
          locationId: 'key',
        },
      })).to.throw();
    });
  });

  describe('# Call()', function() {
    describe('# scan()', function() {
      it('should return an array of populated objects holding location data', async function() {

        const result = await DynamoDB.call('scan', new DynamoDB.Params({
          table: 'locations',
        }));
        // console.log(result);
        expect(result).to.be.an('array').that.is.not.empty;
        expect(result[0]).to.be.an('object').that.is.not.empty;
      });
    });

    describe('# get(id)', function() {
      it('should return a single object holding data and an empty err property', async function() {

      let locationId; 
      const result = await DynamoDB.call('scan', new DynamoDB.Params({
        table: 'locations',
      }));
      locationId = result[0].locationId;

      const locationData = await DynamoDB.call('get', new DynamoDB.Params({
        table: 'locations',
        keys: {
          locationId, 
        },
      }));
      expect(locationData).to.be.an('object').that.is.not.empty;
      });
    });
  });

  after('Deleting locations table', dbMock.clearLocations);
});
