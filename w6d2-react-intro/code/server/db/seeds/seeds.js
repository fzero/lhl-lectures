const generate = require('random-name');
const sentence = () => require('random-sentence')({ min: 5, max: 19 });

const options = {
  minimal: {
    users: 3,
    messages: 10,
    likes: 3
  },
  normal: {
    users: 10,
    messages: 30,
    likes: 200
  }
};

const config = options.minimal;

function id(ids) {
  return ids[Math.floor(Math.random() * ids.length)];
}

function empty(length) {
  return new Array(length).fill(undefined);
}

exports.seed = function(knex, Promise) {
  const users = () => {
    const users = empty(config.users).map(() => {
      return { first: generate.first(), last: generate.last() };
    });

    return knex('users').del().then(() => {
      return knex('users').insert(users, 'id');
    });
  };

  const messages = (users) => {
    const messages = empty(config.messages).map(() => {
      return { user_id: id(users), content: sentence() };
    });

    return Promise.all([
      users,
      knex('messages').del().then(() => {
        return knex('messages').insert(messages, 'id');
      })
    ]);
  };

  const likes = (all) => {
    const users = all[0];
    const messages = all[1];

    const likes = empty(config.likes).map(() => {
      return { user_id: id(users), message_id: id(messages) };
    });

    return knex('likes').del().then(() => {
      return knex('likes').insert(likes);
    });
  }

  return users().then(messages).then(likes);
};
