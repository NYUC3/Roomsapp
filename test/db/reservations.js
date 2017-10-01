import { expect } from 'chai';
import * as ReservationsModel from '../../reservations/Reservation';

describe('# Reservations Object', function() {
  describe('format', function() {
    describe('invalid', function() {
      it('should return false for an invalid reservation format', function() {

        const invalidRes = 'some bullshit';
        const result = ReservationsModel.isValid(invalidRes);
        expect(result).to.be(false);
      });

    });

    describe('valid', function() {
      it('should return true for a valid reservation format', function() {

        const validRes = '{"location":"Bobst","room":"LL1-19","user":"rmr478","openDate":"Mon, 04 Sep 2017 21:40:57 GMT"\
        , "duration":1}';
        const result = ReservationsModel.isValid(validRes);
        expect(result).to.be(true);
      });
    });
  });

  describe('constructor', function() {
    it('should return a valid format reservation object', function() {

      const res = {
        location: 'Bobst',
        room: 'LL1-19',
        user: 'rmr478',
        openDate: new Date().toUTCString(),
        duration: 1,
      };
    
      const reservation = new ReservationsModel(res);
      const result = ReservationsModel.isValid(JSON.stringify(reservation));
      expect(result).to.be(true);
    });
  });
}); 
