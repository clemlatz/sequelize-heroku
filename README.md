sequelize-heroku
================

Easily connects your node app to Heroku databases with Sequelize by parsing Heroku's environnement variable (eg. `DATABASE_URL` for Heroku Postgres), so you don't need to worry about credentials, hard code them into your code or use a config file.

Currently works with Heroku Postgres and ClearDB MySQL.

## Installation

    npm install sequelize-heroku --save

## Usage

    var sequelize = require('../index').connect();
    
    if (sequelize)
    {
        sequelize.authenticate().then( function() {
            var config = sequelize.connectionManager.config;
            console.log('sequelize-heroku: Connected to '+config.host+' as '+config.username+'.');
            
            sequelize.query('SELECT 1+1 as test').then( function(res) {
                
                console.log('1+1='+res[0].test);
                
            });
            
        }).catch( function(err) {
            var config = sequelize.connectionManager.config;
            console.log('Sequelize: Error connecting '+config.host+' as '+config.user+': '+err);
        });
    }
    else
    {
        console.log('No environnement variable found.');
    }
    
## Local usage

To connect a locally-running node app to a Heroku database server, you need to set the correct environnement variable, which you can find in your Heroku app settings.

* `DATABASE_URL` for Heroku Postgres
* `CLEARDB_DATABASE_URL` for ClearDB MySQL


    DATABASE_URL="postgres://user:pass@host:port/database" node app.js

You can off course also use your own local database by passing the correct connection string.
