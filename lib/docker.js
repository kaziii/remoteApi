var Docker = require('dockerode');

var docker = new Docker({host:'localhost',port:2375});

module.exports = docker