const express = require('express');
const app = express();
const cors = require("cors");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");

app.use(express.json())

app.set('trust proxy', 1);

app.use(session({
cookie:{
    secure: true,
    maxAge:60000
       },
store: new RedisStore(),
secret: 'secret',
saveUninitialized: true,
resave: false
}));

app.use(function(req,res,next){
if(!req.session){
    return next(new Error('Oh no')) //handle error
}
next() //otherwise continue
});

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = 8080;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});

module.exports = app;