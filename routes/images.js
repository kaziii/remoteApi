var router = require('express').Router();
var Docker = require('dockerode');

var docker = new Docker({host:'localhost',port:2375});

router.get('/', function(req, res) {

	docker.listImages({}, function(err, data) {

		if (err) {
			console.error(err)
		}

		res.send(data)
	})

	docker.listContainers(function(err, containers) {
		console.log(containers)
	})
})

module.exports = router