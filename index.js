var Sequelize = require('sequelize');

module.exports = {

    connect: function() {
        
        var match, config;
        
        // Look for ClearDB MySQL Add-on
        if (process.env.CLEARDB_DATABASE_URL) {
            const userOptions = process.env.CLEARDB_DATABASE_URL.split('@')[0].split('//')[1].split(':');
            const dbOptions = process.env.CLEARDB_DATABASE_URL.split('@')[1].split('/');

            config = {
                user: userOptions[0],
                pass: userOptions[1],
                base: dbOptions[1],
                options: {
                    dialect: 'mysql',
//                        protocol: 'mysql',
                    host: dbOptions[0].split(':')[0],
                    port: dbOptions[0].split(':')[1],
                    logging: false,
                    dialectOptions: {
                        ssl: true
                    }
                }
            };
        }
        
        // Else, lookf for Heroky Postgresql
        else if (process.env.DATABASE_URL) {
            const userOptions = process.env.DATABASE_URL.split('@')[0].split('//')[1].split(':');
            const dbOptions = process.env.DATABASE_URL.split('@')[1].split('/');
            
            config = {
                user: userOptions[0],
                pass: userOptions[1],
                base: dbOptions[1],
                options: {
                    dialect: 'postgres',
                    protocol: 'postgres',
                    host: dbOptions[0].split(':')[0],
                    port: dbOptions[0].split(':')[1],
                    logging: false,
                    dialectOptions: {
                        ssl: true
                    }
                }
            };
            
        }
        
        if (config)
        {
            sequelize = new Sequelize(config.base, config.user, config.pass, config.options);
            
            return sequelize;
        }
        
        return false;
    }
    
};
