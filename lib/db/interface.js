/**
 * Abstract interface for db flexibility
 *
 * Passes Params object to call  
 * 
 */

import * as db from './dynamodb';

export function call(action, params) {
  
  return db.call(action, new db.Params(params)); 
}
