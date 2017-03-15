var express = require('express'),
	path = require('path'),
	app = express(),
	bodyParser= require('body-parser'),
	pug = require('pug');

var cookieParser = require('cookie-parser'),
	sessionParser = require('express-session');

//redis connect
var redis = require('redis'),
	RedisStore = require('connect-redis')(sessionParser);

var cookieName = 'keys'

app.set('views', './views');
app.set('view engine', 'pug');
// app.use(express.static(path.join('./build')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(sessionParser({
	name: cookieName,
	secret: 'yoursecret',
	cookie: {
		maxAge: 10 * 1000
	},
	store: new RedisStore({
		host: '127.0.0.1',
		port: '6379'
	})
}))

app.use('/material', express.static(path.join(__dirname, 'node_modules/daemonite-material')));
app.use('/images', express.static(path.join(__dirname,'public/images')));

app.use('/api/', require('./routes'));
app.use('/',require('./routes/login'));

app.listen(3000)