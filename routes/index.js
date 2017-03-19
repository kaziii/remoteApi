var router = require('express').Router();

// router.use('/', require('./login'));

router.get('/dashboards',function (req, res) {

	var request = {

		dashboards:{

			username: req.session.user_name,
			timestamp: Date.now()
		}
	}

	return res.json(request);
});

router.use('/images', require('./images'));
router.use('/container', require('./container'));

module.exports = router;