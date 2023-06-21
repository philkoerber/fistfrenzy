const Player = require("./gameData/playerSchema");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await Player.findOne({ username: username });
        if (!user) {
          return done(null, false);
        }
        const result = await bcrypt.compare(password, user.password);
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        throw err;
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await Player.findOne({ _id: id });
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  });
};