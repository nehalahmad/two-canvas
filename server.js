let express = require('express');
let app = express();

app.use(function(req, res, next) {
    if (req.path !== '/')
      return res.redirect('/');
    next();
  });
  
  app.get('/', function(req, res, next) {
    return res.sendFile(__dirname+'/index.html');
  });
  
  app.post('/', function(req,res, next){
      console.log(req.query);
      console.log(req.params);
      console.log(req);
      return res.write("post call");
  });

  app.listen(3000);