var express = require('express'),
    stylus  = require("stylus"),
    nib     = require("nib");

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({
    src: __dirname,
    compile : function (str, path) {
      return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib());
    } 
  }));
  app.use(express.static( __dirname ));
  app.use(express.directory( __dirname ));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.listen(3030);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
