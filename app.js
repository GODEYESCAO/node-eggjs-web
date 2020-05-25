'use strict';

const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    // debug('%s %s get user: %j', req.method, req.url, user);
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {});
  // 序列化用户信息后存储进 session
  app.passport.serializeUser(async (ctx, user) => {});
  // 反序列化后取出用户信息
  app.passport.deserializeUser(async (ctx, user) => {});
};
