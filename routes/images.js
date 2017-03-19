var router = require('express').Router();

var docker = require('../lib/docker');

router.get('/', function(req, res) {

	docker.listImages({}, function(err, data) {

		var arry = [];

		if (err) {
			console.error(err)
		} else {

			if (data.length && Array.isArray(data)) {

				data.forEach(function(list) {

					if(list.RepoTags.length && Array.isArray(list.RepoTags)) {

						list.RepoTags.forEach(function (tag){

							arry.push(tag);
						})
					}
				})
			} else {

				arry = [];
			}
		}

		return res.json(arry)
	})

	// docker.listContainers(function(err, containers) {
	// 	console.log(containers)
	// })
})

module.exports = router