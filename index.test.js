if (
  typeof process.env.DATABASE_URL === "undefined" &&
  typeof process.env.CLEARDB_DATABASE_URL === "undefined"
) {
  throw new Error("DATABASE_URL or CLEARDB_DATABASE_URL must be defined.");
}

const sequelizeHeroku = require("./index");
const sequelize = sequelizeHeroku.connect(require("sequelize"));

it("connects to database from environnement variables", async () => {
  await sequelize.authenticate();
  const res = await sequelize.query("SELECT 1+1 as result");
  sequelize.close();
  const result = res[0][0].result;
  expect(result).toBe(2);
});
