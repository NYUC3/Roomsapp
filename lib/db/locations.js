// DB Location interface

import * as db from './interface';

export function get(locationId) {
  return db.call(get, {
    TableName: 'locations',
    Key: locationId,
  });
}

export function list() {
  return db.call(get, {
    TableName: 'locations',
  });
}
