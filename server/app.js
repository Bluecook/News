var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var user = require('./routes/users');
const bodyParser = require("body-parser");

const UserRouter = require('./routes/admin/UserRouter')
const NewsRouter = require('./routes/admin/NewsRouter')
const ProductRouter = require('./routes/admin/ProductRouter')

const session = require('express-session')

const JWT = require('./util/jwt')

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



app.use(session({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  captch: 'wty5',
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}))

// 注册路由
app.use('/users', user);

app.use((req, res, next) => {
  // 如果token有效，next()
  // 如果token过期了，返回401错误
  console.log(req.url);
  if (req.url === '/adminapi/login' || req.url === '/adminapi/captcha') {
    next()
    return;
  }

  const token = req.headers['authorization'].split(" ")[1]
  if (token) {
    // console.log("我来啦");
    let payload = JWT.verify(token)
    if (payload) {
      const newToken = JWT.generate({
        id: payload.id,
        username: payload.username,
        role: payload.role
      }, "1d")
      res.header('Authorization', newToken)
      next()
    } else {
      res.status(401).send({ errorCode: "-1", errorInfo: "token过期" })
    }
  }
})

app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

