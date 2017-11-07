// DB Location interface

import * as db from './interface';

export function get(locationId) {
  if (!locationId) { throw new Error('No locationId provided'); }
  return db.call('get', {
    table: 'locations',
    keys: {
      locationId,
    },
  });
}

export function list() {
  return db.call('get', {
    table: 'locations',
  });
}
