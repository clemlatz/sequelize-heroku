var sequelize = require('../index').connect();
    
    if (sequelize)
    {
        sequelize
        .authenticate()
        .then( function() {
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
