const Koa = require('koa');
const Router = require('koa-router');
const esj = require('koa-ejs');
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
let app = new Koa();
let router = new Router();
app.use(bodyParser());
esj(app, {
    root: path.resolve(__dirname, 'template'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
})

router.get('/', ctx => {
    ctx.body = '首页'
})


app.use(router.routes())

router.use('/admin', require('./router/admin'))

app.use(static('./static'))


let port = 3001


app.listen(port, 'localhost', () => {
    console.log(`Server running at http://localhost:${port}`)
})