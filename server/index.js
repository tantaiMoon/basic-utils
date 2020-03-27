const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  let html = fs.readFileSync('../public/index.html', 'utf-8')
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8'
    })
    res.end(html)
  }

  if (req.url === '/js/sc.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript;charset=utf-8',
      'cache-control': 'max-age=30',
      'pragma': 'no-cache'
    })
    res.end('max-age=30')
  }
  if (req.url === '/css/main.css') {
    res.writeHead(200, {
      'Content-Type': 'text/css',
      'cache-control': 'max-age=30',
      'Last-Modified': 'Wed Mar 25 2020 15:32:10 GMT'
      // ETag的值为hash值，ETag/If-Not-Match是在HTTP/1.1出现的，主要是解决以下问题：
      // (1)、Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间
      // (2)、如果某些文件被修改了，但是内容并没有任何变化，而Last-Modified却改变了，导致文件没法使用缓存
      // (3)、有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形
    })
    res.end('max-age=30')
  }
}).listen(9000)