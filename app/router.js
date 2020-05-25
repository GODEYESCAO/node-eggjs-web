'use strict';

module.exports = app => {
  const jsonp = app.jsonp();
  const { router, controller, jwt } = app;
  router.get('/', controller.home.render);
  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.get('/auth', controller.user.auth);
  router.get('/user/list', controller.user.list);
  router.get('/category/list', jwt, controller.category.list);
  router.post('/category/create', jwt, controller.category.create);
  router.get('/category/detail', jwt, controller.category.detail);
  router.post('/category/edit', jwt, controller.category.edit);
  router.post('/category/delete', jwt, controller.category.delete);
  router.get('/article/list', jwt, controller.article.list);
  router.post('/article/create', jwt, controller.article.create);
  router.get('/article/detail', jwt, controller.article.detail);
  router.post('/article/update', jwt, controller.article.updata);
  router.post('/article/delete/:id', jwt, controller.article.delete);
  router.get('/comments/list', jwt, controller.comments.list);
  router.post('/comments/delete/:id', jwt, controller.comments.delete);
  router.resources('file', '/api/v1/file', controller.file);
  router.get('/web/category/list', controller.category.list);
  router.get('/web/article/list', controller.article.list);
  router.get('/web/article/detail/:id', controller.article.webdetail);
  // router.post('/login', app.passport.authenticate('local', { successRedirect: '/' }));
  // 鉴权成功后的回调页面
  // router.get('/authCallback', controller.home.authCallback);
};
