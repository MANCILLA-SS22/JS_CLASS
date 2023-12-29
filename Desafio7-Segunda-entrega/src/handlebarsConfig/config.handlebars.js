const handlebars = require('express-handlebars');

const handlebarsConfig = (app) => {
    const hbs = handlebars.create({
        extname: '.handlebars',
        defaultLayout: 'main',
      layoutsDir: __dirname + '/../views/layouts/',
      partialsDir: __dirname + '/../views/partials/',
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
      });
    
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '/../views');
}

module.exports = handlebarsConfig;