const Router = require('koa-router');
let router = new Router();

router.get('/', async ctx=> {
    await ctx.render('admin/admin')
})

router.post('/login', async (ctx)=>{
    let {user, pass} = ctx.request.body
    ctx.body = {
        user,
        pass
    }
})
module.exports = router.routes()