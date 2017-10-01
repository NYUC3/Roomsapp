// Get a location's data

import * as db from '../lib/db/';
import { Location } from './Location';
import * as buildingAPIS from '../lib/vendors/';
import { success, failure } from './libs/response-lib';

const location = new Location(db.locations, buildingAPIS);

/**
 * [main description]
 * @param  {[type]}   event    [description]
 * @param  {[type]}   context  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export async function main(event, context, callback) {

  const locationId = event.pathParameters.id;

  const result = await location.get(locationId);
  if (result.data) {
    // Return the retrieved item
    callback(null, success(result));
  }
  else {
    callback(null, failure({status: false, error: 'Item not found.'}));
  }
  callback(null, failure({status: false}));

}
