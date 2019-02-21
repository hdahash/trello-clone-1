const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks;
// validation utils to setup validation method
const {
  Joi,
  validate
} = require('../../utils/validation');

// validation rules of the service
const rules = require('./users.validation');

// prepare the rules for the fields
let schema = rules.createRequest(Joi);

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [validate(schema), hashPassword()],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
