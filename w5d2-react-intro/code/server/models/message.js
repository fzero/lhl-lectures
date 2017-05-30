const moment = require('moment');

const db = require('../db');

const User = require('./user.js');

function collate() {
  return db('messages')
        .groupBy('messages.id', 'users.first', 'users.last')
        .orderBy('messages.id', 'desc')
        .join('users', 'messages.user_id', 'users.id')
        .fullOuterJoin('likes', 'messages.id', 'likes.message_id')
        .select('messages.id',
                'messages.content',
                'messages.date',
                'messages.user_id',
                'users.first',
                'users.last',
                db.raw('(SELECT count(*) FROM "likes" WHERE "likes"."message_id" = "messages"."id") as likes'));
}

function convert(message) {
  return new Message(message.id, new User(message.user_id, message.first, message.last), message.content, message.date, Number(message.likes));
}

class Message {
  static all() {
    return new Promise((resolve, reject) => {
      collate().then(messages => {
          resolve(messages.map(convert));
        });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      collate()
        .first()
        .where('messages.id', id)
        .then(message => {
          resolve(convert(message));
        });
    });
  }

  static create(user, content) {
    return db('messages').insert({
      user_id: user.id,
      content: content
    }, 'id').then(message => {
      return Message.find(message[0]);
    });
  }

  constructor(id, user, content, date, likes) {
    this.id = id;
    this.user = user;
    this.content = content;
    this.date = moment(date).from();
    this.likes = likes;
  }

  like(id) {
    return db('likes').insert({
      user_id: id,
      message_id: this.id
    });
  }

  unlike(id) {
    return db('likes').where({
      user_id: id,
      message_id: this.id
    }).del();
  }
}

module.exports = Message;
