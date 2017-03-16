var router = require('express').Router(),
	path = require('path');

var redis = require('redis'),
	client = redis.createClient();

var cookieName = require('../main').cookieName;

router.get('/', function(req, res) {

	var sess = req.session;
	var isLogin = Boolean(req.session.user_name);

	if (isLogin) {

		return res.sendfile(path.resolve('build/index.html'));
	}

	return res.render(path.resolve(__dirname, '../views/login'))
})

router.post('/', function(req, res) {

	if (!req.body.username || !req.body.password) {

		return res.redirect('/')
	}

	client.get(req.body.username, function(err, response) {
		
		if (response && req.body.password === response) {

			req.session.regenerate(function(err) {

				if (err) {

					return res.json({res_code: 2, res_msg: 'login faild'})
				}

				req.session.user_name = req.body.username;
				
				return res.sendfile(path.resolve('build/index.html'));

				// res.json({res_code: 0, res_msg: 'login success'})
			});

		}

		// return res.send(404)		
	})
})

router.get('/logout', function(req, res) {

	req.session.destroy(function (err) {

		if (err) {
			res.json({res_code: 5, res_msg: 'logout faild'});
			return;
		}

		res.clearCookie(cookieName);
		res.redirect('/');
	})
})

module.exports = router;