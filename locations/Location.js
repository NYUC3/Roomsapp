// Location class

export class Location {

  constructor(db, buildingAPIs) {
    this.db = db;
    this.buildings = buildingAPIs; 
  }

  list() {
    return this.db.locations.list();
  }

  get(locationId) {
    return this.db.locations.get(locationId);
  }
}
