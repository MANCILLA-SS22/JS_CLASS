const router = require("./router");
const handlebarsConfig = require('./handlebarsConfig/config.handlebars');
const { server, app}= require("./socketIO/socketServer");
const mongoConfig = require("./mongoConfig/config.mongo");

const { port } = require('./config');

router(app);
handlebarsConfig(app);
mongoConfig();

app.get('/',  (req, res) => {
    res.render('index.handlebars', {mesagge: 'Hi from server without socket.io'});
});

server.listen( port, () => {
    console.log(`Server runing at port ${port}`);
});