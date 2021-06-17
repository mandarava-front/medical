const fstat = require('fs');
var http = require('http');
var url = require('url')
var server = http.createServer(function(req, res) {
    if (req.url === '/') {
        fstat.readFile('./index.html', (err, data) => {
            res.writeHead(200, { 'content-type': "text/html;charset=utf-8" })
            res.end(data)
        })
    }
    if (req.url === '/t' && req.method === 'POST') {
        res.end('Ajax--ok')
    }
    if ((/.png$/).test(req.url)) {
        console.log('图片亲请求')
        console.log(req.url)
        console.log('C:/Users/Administrator/Desktop/毕设/毕设项目/img' + req.url)
        res.end('C:/Users/Administrator/Desktop/毕设/毕设项目/img' + req.url)
    }

    console.log(req.url)
        //     req.on('data', function(data) {
        //         console.log('服务器端收到数据' + decodeURIComponent(data));
        //     })
        //     req.on('end', function() {
        //         console.log("数据接收完毕")
        //     })
        // res.end();
}).listen(1337, '127.0.0.1', function() {
    console.log("服务器启动成功")
})
server.close()