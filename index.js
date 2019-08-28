module.exports = {
  connect: function(Sequelize) {
    if (typeof Sequelize === 'undefined') {
      throw new Error(
        'You must pass sequelize as an argument to the sequelize-heroku connect method (see README).'
      );
    }

    var url, options;

    // Look for ClearDB MySQL Add-on
    if (process.env.CLEARDB_DATABASE_URL) {
      url = process.env.CLEARDB_DATABASE_URL;

      options = {
        dialect: 'mysql',
        protocol: 'mysql',
      };
    }

    // Else, look for Heroku Postgres
    else if (process.env.DATABASE_URL) {
      url = process.env.DATABASE_URL;

      options = {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
          ssl: true,
        },
      };
    }

    if (url) {
      options.logging = false;
      sequelize = new Sequelize(url, options);
      return sequelize;
    }

    return false;
  },
};
