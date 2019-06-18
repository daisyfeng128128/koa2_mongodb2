const Koa = require('koa');
const router = require('koa-router')();
const static = require('koa-static');
const views = require('koa-views');
const path = require('path');
const staticPath = '/static';
const app = new Koa();
const common = require('./module/common.js');

// app.use(
//   views('views', {
//     map: { html: 'ejs' }
//   })
// );   //这种方式配置，模板文件要以.html结尾

app.use(
  views('views', {
    extension: 'ejs'
  })
); //这种方式配置，模板文件要以.ejs结尾

app.use(async (ctx, next) => {
  ctx.state.userInfo = 'amy';
  // 应用级中间件
  // console.log(new Date());
  // await next();
  // 错误处理中间件
  await next();
  if (ctx.status == 404) {
    ctx.status = 404;
    ctx.body = '这是个404页面';
  }
});

router.get('/', async ctx => {
  let title = '这是个title';
  let content = '<h2>绑定HTML数据</h2>';
  const num = 123;
  await ctx.render('index', { title, content, num }); //这里不加await会找不到路由
});

// 接收post提交的数据
router.post('/doAdd', async ctx => {
  // 原生nodejs子在koa中获取表单提交的数据
  let data = await common.getPostData(ctx);
  console.log(data);
  ctx.body = data;
});

router.get('/news', async ctx => {
  let list = ['aaa', 'bbb', 'ccc', 'ddd'];
  await ctx.render('news', { list });
});

router.get('/newscontent', (ctx, next) => {
  let url = ctx.url;
  // 从request中获取GET请求
  let request = ctx.request;
  let req_query = request.query;
  let req_querystring = request.querystring;

  // 从上下文中直接获取
  let ctx_query = ctx.query;
  let ctx_querystring = ctx.querystring;
  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  };
});
router.get('/product/:id', async ctx => {
  ctx.body = '商品page';
});
router.get('/add', async ctx => {
  let title = 'hello koa2';
  await ctx.render('index', {
    title
  });
});
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); //作用：官方推荐用法，router.allowedMethods()用在了路由匹配router.routers()之后，所有在当所有路由中间件最后掉用，此时根据stx.status设置response响应头

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.listen(4000, () => {
  console.log('start at port 4000');
});
