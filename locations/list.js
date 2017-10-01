// List all locations with minimal data

import * as db from '../lib/db/';
import * as buildingAPIS from '../lib/vendors/'
import { success, failure } from './libs/response-lib';

const location = new Location(db.locations, buildingAPIS);

export async function main(event, context, callback) {

  const locationId = event.pathParameters.id;

  try {
    const result = await location.list(locationId);
    if (result.data) {
      // Return the retrieved item
      callback(null, success(result.data));
    }
    else {
      callback(null, failure({status: false, error: result.err+''}));
    }
  } catch(e) {
    callback(null, failure({status: false, error: e+''}));
  }

}