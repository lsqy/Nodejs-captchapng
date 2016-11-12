'use strict'
const express = require('express');
const captchapng = require('captchapng');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'lsqy',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.get('/', function (req, res) {
  randomcodePngController(req, res);
});

app.get('/session', function (req, res) {
  res.send(req.session.loginStatus);
});
app.listen(8989);

console.log('Web server started.\n http:\\\\127.0.0.1:8989');

function randomcodePngController(req , res){
    var code = '0123456789';
    var length = 4;
    var randomcode = '';
    for (var i = 0; i < length; i++) {
        randomcode += code[parseInt(Math.random() * 1000) % code.length];
    }
    // 保存到session
    if (null == req.session['loginStatus']) {
        req.session["loginStatus"] = {};
    }
    req.session.loginStatus.randomcode= randomcode;

   // 输出图片
     var p = new captchapng(100,36,parseInt(randomcode)); // width,height,numeric captcha
    p.color(129, 194, 214, 255);  // First color: background (red, green, blue, alpha)
    p.color(55, 62, 64, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}