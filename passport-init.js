const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { User } = require("./models");
const bcrypt = require("bcryptjs");

const isMatchDbPassword = (pass, dbpass) => {
  return bcrypt.compareSync(pass, dbpass); // true
};

module.exports = passport => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use(
    new localStrategy(function(username, password, done) {
      User.findOne({
        where: {
          email: username
        }
      })
        .then(user => {
          if (user.firstName === undefined) {
            return done(null, false, { message: "Incorrect Username." });
          }
          if (!isMatchDbPassword(password, user.password)) {
            return done(null, false, { message: "Incorrect Password" });
          }
          return done(null, user);
        })
        .catch(err => {
          return done(err);
        });
    })
  );
  return passport;
};
