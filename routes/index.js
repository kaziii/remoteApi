var router = require('express').Router();

// router.use('/', require('./login'));

router.get('/mian',function (req, res) {
	res.send({
		name: 'docker server',
		timetip: new Date()
	})
});

router.use('/images', require('./images'));

module.exports = router;