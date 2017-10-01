import 'uuid';

export class Reservation {
  
  constructor(db) {
    this.db = db;
  }

  static isValid(string) {
    if (typeof string !== 'string') {
      return false;
    } else {
      const parsed = JSON.parse(string);
      if (typeof parsed.location !== 'string' 
        && typeof parsed.room !== 'string'
        && typeof parsed.user !== 'string') {
          return false;
      }
      if (isNaN(parsed.duration)) {
        return false;
      }
      if (!(new Date(parsed.openDate) 
        === Date(new Date(parsed.openDate)))) {
        return false;
      }
      return true;
    } 
  }

  static create(params) {
    if (!this.isValid(JSON.stringify(params))) {
      throw new Error('Invalid reservation format');
    } else {
      const reservation = {}; 
      reservation.location = params.location;
      reservation.room = params.room;
      reservation.user = params.user;
      reservation.duration = params.duration;
      reservation.openDate = params.openDate;
    }
  }

  get(reservationId) {
    return this.db.reservations.get(reservationId);
  }

  list() {
    return this.db.reservations.list();
  }

  post(reservation) {
    return this.db.reservations.post(reservation);
  }

  update(reservation) {
    return this.db.reservations.update(reservation);
  }
}
