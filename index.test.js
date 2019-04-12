if (typeof process.env.DATABASE_URL === 'undefined'
  && typeof process.env.CLEARDB_DATABASE_URL === 'undefined') {
  throw new Error('DATABASE_URL or CLEARDB_DATABASE_URL must be defined.')
}

const sequelizeHeroku = require('./index');
const sequelize = sequelizeHeroku.connect(require('sequelize'));

it('connects to database from environnement variables', done => {
  sequelize
    .authenticate()
    .then(function () {
      sequelize.query('SELECT 1+1 as result').then(function (res) {
        sequelize.close();
        const result = res[0][0].result;
        expect(result).toBe(2);
        done();
      });
    }).catch(function (err) {
      sequelize.close();
      var config = sequelize.connectionManager.config;
      console.log('Sequelize: Error connecting ' + config.host + ' as ' + config.user + ': ' + err);
      done();
    });
});
