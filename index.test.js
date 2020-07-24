
const sequelizeHeroku = require("./index");

it("throws a deprecation notice", async () => {
  expect(() => sequelizeHeroku.connect()).toThrow('sequelize-heroku is deprecated (see README)');
});
