const generate = require('random-name');

const db = require('../db');

class User {
  static all() {
    return new Promise((resolve, reject) => {
      db('users').then(users => {
        resolve(users.map(user => {
          return new User(user.id, user.first, user.last);
        }));
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      db('users').first().where({ id }).then(user => {
        resolve(new User(user.id, user.first, user.last));
      })
    });
  }

  static create() {
    const first = generate.first();
    const last = generate.last();

    return db('users').insert({
      first,
      last
    }, 'id').then(user => {
      return User.find(user[0]);
    });
  }

  constructor(id, first, last) {
    this.id = id;
    this.first = first;
    this.last = last;

    this.full = `${this.first} ${this.last}`;
    this.avatar = `https://api.adorable.io/avatars/64/${this.first.toLowerCase()}${this.last.toLowerCase()}.png`;
  }
}

module.exports = User;
