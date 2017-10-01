// User class

export class User {

  constructor(db) {
    this.db = db;
  }

  get(userId) {
    return this.db.users.get(userId);
  }

  insert(params) {
    return this.db.users.insert(params);
  }

}
