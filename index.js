var client = require('./lib/UuapClient');
var fs = require('fs');
var login = require('./src/uuap');

// process.env.DEBUG = true;

var Uuaper = module.exports = function (options) {
    global.username = (options && options.username) || 'liuyong06';
    global.password = (options && options.password) || (options && options.username) || 'liuyong06';
    global.uuapServer = (options && options.uuapServer) || 'http://itebeta.baidu.com:8100/login';
    global.dataServer = (options && options.dataServer) || 'http://bidev.baidu.com/tic/';
    global.debug = (options && options.debug) || false;
};

Uuaper.prototype.Login = function (cb) {
    login.Login(cb);
};

Uuaper.prototype.getData = function (url, cb) {
    var self = this;
    return client.get(url, function(err, res, data) {
        if (res.statusCode == '302') {
            global.isLogin = false;
            self.Login(function() {
                global.isLogin = true;
                self.getData(url, cb)
            })
            return;
        }
        return cb(err, res, data);
    })
};