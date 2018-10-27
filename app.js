const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const { User } = require("./models");
const passport = require('passport');
require('./passport-init')(passport);
const session = require('express-session');
const app = express();

//configure routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users')(passport);

// initialize middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//initialise passport session
app.use(session({
	secret: 'cat',
	saveUninitialized: false,
	resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);





const port = 4000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});