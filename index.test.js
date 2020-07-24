
const assert = require('assert');
const sequelizeHeroku = require("./index");

suite('connect', () => {
  spec('should throw an deprecation notice', () => {
    assert.throws(() => sequelizeHeroku.connect(), Error, 'sequelize-heroku is deprecated (see README)');
  });
});