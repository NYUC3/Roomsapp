// DB users interface

import * as db from './interface';
import * as reservationsLib from '../../reservations/Reservation.js';

export function get(userId) {
  
  return db.call('get', {
    TableName: 'users',
    Key: userId,
  });
}

export function post(params) {

  const newUser = new UserSchema(...params);
  const sanitizedParams = new db.Params(params); 
  if (get(params.name).data) {
    return {
      err: 'User already exists',
    };
  } else {
    return db.call('post', sanitizedParams);
  }
}

class UserSchema {

  constructor(userId, email, access, reservations) {

    this.userId = userId;
    this.email = this.validateEmail(email);
    this.reservations = (this.validateReservations(reservations) || []);
    this.access = (access || { all: true }); 
  }

  validateEmail(email) {
    
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (typeof email === 'string' 
      && email.match(emailRegex)) { return email; }
    else { throw new Error('Invalid email type'); }
  }

  validateReservations(reservations) {
    
    if (reservations.some((res) => {
      return !this.isReservationValid(res); 
    })) {
      throw new Error('Invalid reservation format in array');
    } else {
      return reservations;
    }
  }

  isReservationValid(reservation) {
    
    return reservationsLib.isValid(reservation);
  }
}
