var router = require('express').Router();

var docker = require('../lib/docker');

router.get('/', function(req, res) {

	docker.listContainers(function(err, containers) {

		return res.json(containers);
	})
})

module.exports = router;