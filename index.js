var Sequelize = require('sequelize');

module.exports = {

    connect: function() {
        
        var match, config;
        
        // Look for ClearDB MySQL Add-on
        if (process.env.CLEARDB_DATABASE_URL) {
            
            match = process.env.CLEARDB_DATABASE_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+)\/(.+)\?/);
            
            config = {
                user: match[1],
                pass: match[2],
                base: match[4],
                options: {
                    dialect: 'mysql',
                    protocol: 'mysql',
                    host: match[3],
                    port: 3306,
                    logging: false,
                    dialectOptions: {
                        ssl: true
                    }
                }
            };
            
        }
        
        // Else, lookf for Heroky Postgresql
        else if (process.env.DATABASE_URL) {
            
            match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
            
            config = {
                user: match[1],
                pass: match[2],
                base: match[5],
                options: {
                    dialect: 'postgres',
                    protocol: 'postgres',
                    host: match[3],
                    logging: false,
                    port: match[4],
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
