/*
 * @author: zhidl
 * @Date: 2019-10-16 10:23:45
 * @description: ssr 简单应用
 * 最简单的例子 引入html 模板
 * 给模板中插入内容
 */
const fs = require('fs')
const Vue = require('vue')
const server = require('express')()
const VueServerRenderer = require('vue-server-renderer')
const tem = fs.readFileSync('./index-ssr.template.html', 'utf-8')
const renderer = VueServerRenderer.createRenderer({
  template: tem
})
console.log(tem)
const context = {
  title: 'vue ssr lesson3',
  meta: `
    <meta name="theme-color" content="#4285f4">
  `,
  content: '这是服务端插入的内容，由 renderToString 第二个参数 context 提供',
  footer: 'Final Content'
}

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      text: `项目仓库地址： <a href="https://github.com/Neveryu/vue-ssr-lessons" target="_blank">vue-ssr-lessons</a>`
    },
    template: `
      <div>
        <div>访问的 URL 是： {{ url }}</div>
        <div v-html="text"></div>
        <br/>
      </div>
    `
  })

  renderer.renderToString(app, context).then(html => {
    // 这里输出就是将内容插入到模板后的，整个html内容
    res.end(`${html}`)
  }).catch(err => {
    res.status(500).end('Internal Server Error')
    return
  })
})


server.set('port', process.env.PORT || 8888)
server.listen(server.get('port'), 'localhost', () => {
    console.log(`Server running at http://localhost:${server.get('port')}`)
})