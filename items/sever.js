const fstat = require('fs');
var http = require('http');
var url = require('url')
var querystring = require('querystring');
var hostName = '127.0.0.1'
var port = 1337
var clientName = "医生"
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8089 });
wss.on('open', function open() {
    console.log('连接已上线')
})
const user = {};
wss.on('connection', function connection(ws) {
    // console.dir(ws)
    var userID = parseInt(ws.upgradeReq.url.substr(1), 10)
    user[userID] = ws
        // console.log('connected: ' + userID + 'in ' + Object.getOwnPropertyNames(wss) + '123456')
    ws.on('message', function incoming(message) {
        console.log('received+' + userID + ':', message);
        // console.log(wss.clients)
        // console.log(wss.clients.ultron)
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send((userID == 1 ? '医生' : '用户') + " -> " + message);
            }
        });
    });
    // }
    // if (user = 2) {
    //     ws.on('message', function incoming(message) {
    //         console.log('received: %s', message);
    //         // console.log(wss.clients)
    //         // console.log(wss.clients.ultron)
    //         wss.clients.forEach(function each(client) {
    //             if (client.readyState === WebSocket.OPEN) {
    //                 client.send('hsux' + " -> " + message);
    //             }
    //         });
    //     });
    // }
    ws.send('something');
});
// wss.on('message', function incoming(message) {
//     console.log('received: %s', message);
//     console.log(wss.clients)
//     console.log(wss.clients.ultron)
//     wss.clients.forEach(function each(client) {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(clientName + " -> " + message);
//         }

//     });
// })



var server = http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') return;
    if (req.url !== '/favicon.ico') {
        if (req.url === '/') {
            fstat.readFile('./html/index.html', (err, data) => {
                res.writeHead(200, { 'content-type': "text/html;charset=utf-8" })
                res.end(data)
            })
        }
        if ((/.html$/).test(req.url)) {
            fstat.readFile('./html' + req.url, (err, data) => {
                res.writeHead(200, { 'content-type': "text/html;charset=utf-8" })
                res.end(data)
            })
        }
        if (req.url === '/t' && req.method === 'POST') {
            res.end('Ajax--ok')
        }
        if ((/.css$/).test('./html' + req.url)) {
            fstat.readFile('.' + req.url, (err, data) => {
                res.writeHead(200, { 'content-type': "text/css;charset=utf-8" })
                res.end(data)
            })
        }
        if ((/.js$/).test(req.url)) {
            fstat.readFile('.' + req.url, (err, data) => {
                res.writeHead(200, { 'content-type': "text/javascript;charset=utf-8" })
                res.end(data)
            })
        }
        if ((/(.png|.jpg|.gif|.webp|.mp4)$/).test(req.url)) {
            fstat.readFile('.' + req.url, (err, data) => {
                res.writeHead(200, { 'content-type': "video/mp4,image/avif,image/webp,image/png;image/jpg;img/gif;charset=utf-8" })
                res.end(data)
            })
        }
        //banner图请求
        if (req.url === '/banner') {
            res.writeHead(200, "Content-Type:text/json;charset=utf-8")
            var banner = fstat.readdirSync('./img')
            var bannerd = {};
            var j = 0;
            for (let i = 0; i < banner.length; i++) {
                if ((/^banner-/).test(banner[i])) {
                    var jsondata = {
                        "img_id": j, //图片id
                        "img_path": "../img/" + banner[i], // 图片路径
                        "img_type": "banner大图",
                        "img_title": "首页banner" + j,
                        "img_desc": "第" + j + "张banner"
                    }
                    bannerd[j++] = jsondata

                }
            }
            res.end(JSON.stringify(bannerd))

        }
        //新闻请求
        if (req.url === '/newsList') {
            fstat.readFile('./data/newslist.js', 'utf-8', (err, data) => {
                res.writeHead(200, "Content-Type:text/json,text/plain;charset=utf-8")
                var jsd = data
                jsdobj = eval("" + jsd + "")
                res.end(JSON.stringify(jsdobj[0].newsList))
            })
        }
        //新闻页面请求
        if ((/(.html\?id=\d{0,2})$/).test(req.url)) {
            fstat.readFile('./html/news.html', 'utf-8', (err, data) => {
                res.writeHead(200, "Content-Type:text/html;charset=utf-8")
                res.end(data)
            })

        }
        //新闻详情请求

        if ((/(newsItem\?id=\d{0,2})$/).test(req.url)) {
            var querys = url.parse(req.url).query.split("=")[1]

            fstat.readFile("./data/newsitem.js", 'utf-8', (err, data) => {
                res.writeHead(200, "Content-Type:text/json,text/plain;charset=utf-8")
                itemdata = eval("" + data + "")
                res.end(JSON.stringify(itemdata[querys - 1]))
            })
        }
        if (req.url === '/opinion') {
            fstat.readFile('./data/newslist.js', 'utf-8', (err, data) => {
                res.writeHead(200, "Content-Type:text/json,text/plain;charset=utf-8")
                var jsd = data
                jsdobj = eval("" + jsd + "")
                res.end(JSON.stringify(jsdobj[1].opinion))
            })
        }
        if (req.url === '/department') {
            fstat.readFile('./data/departmentdata.js', 'utf-8', (err, data) => {
                res.writeHead(200, "Content-Type:text/json,text/javascript,text/plain;charset=utf-8")
                var depat = eval("" + data + "")
                res.end(JSON.stringify(depat))
            })
        }
        //科室请求
        if ((/(department_1.html\?m=\d{0,2})$/).test(req.url)) {
            fstat.readFile('./html/department_1.html', 'utf-8', (err, data) => {
                res.writeHead(200, "Content-Type:text/json,text/javascript,text/plain;charset=utf-8")
                res.end(data)
            })
        }
        if (req.url === '/department_1') {
            var dat = '';
            req.on('data', function(chunk) {
                // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
                dat += chunk;
                data1 = dat.split("=")[1] % 10
                data2 = Math.floor(dat.split("=")[1] / 10)
                fstat.readFile('./data/departmentdata.js', 'utf-8', (err, data) => {
                    res.writeHead(200, "Content-Type:text/json,text/javascript,text/plain;charset=utf-8")
                    var departd = eval("" + data + "")
                    var departdInfo = departd[data2 - 1]
                    res.end(JSON.stringify(departdInfo['name'][data1 - 1]))
                })
            });
        }

        //加盟医疗机构请求
        if (req.url === '/hospital') {
            fstat.readFile('./data/hospital.js', "utf-8", (err, data) => {
                res.writeHead(200, "Content-Type:text/json,text/javascript,text/plain;charset=utf-8")
                var hospital = eval("" + data + "")
                res.end(JSON.stringify(hospital))
            })
        }

        //按条件查找医院
        // console.log(req.url)

        if (req.url === '/area') {
            var data = '';
            var datareq = []
            req.on('data', function(chunk) {
                data += chunk;
            });
            req.on('end', function() {
                data = decodeURI(data);
                var dataObject = querystring.parse(data);
                datareq = [dataObject.p, dataObject.c, dataObject.a]
            })
            fstat.readFile('./data/hospital.js', 'utf-8', (err, data) => {
                res.writeHead(200, "Content-Type:text/json,text/javascript,text/plain;charset=utf-8")
                var datah = eval("" + data + "")
                for (var i = 0; i < datah.length; i++) {
                    for (var key in datah[i]) {
                        //找出省的值          
                        if (key == datareq[0]) {
                            var datap = datah[i][key]
                            for (var j = 0; j < datap.length; j++) {
                                for (var key in datap[j]) {
                                    if (key == datareq[1]) {
                                        var datashi = datap[j][key]
                                        for (var k = 0; k < datashi.length; k++) {
                                            for (var key in datashi[k]) {
                                                if (key == datareq[2]) {
                                                    res.end(JSON.stringify(datashi[k][key]))
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }
        if (req.url === '/area_depart') {
            var data = '';
            req.on('data', function(chunk) {
                data += chunk;
            });
            req.on('end', function() {
                var resarr = []
                data = decodeURI(data);
                var dataObject = eval("" + querystring.parse(data).reqd + "");
                fstat.readFile("./data/departmentdata.js", 'utf-8', (err, data) => {
                    res.writeHead(200, "Content-Type:text/json,text/javascript,text/plain;charset=utf-8")
                    var dedata = eval("" + data + "")
                    for (let i = 0; i < dataObject.length; i++) {
                        for (let j = 0; j < dedata.length; j++) {
                            if (dataObject[i] == dedata[j].id) {
                                resarr.push(dedata[j])
                            }
                        }
                    }
                    res.end(JSON.stringify(resarr))
                })
            })
        }
        if (req.url == '/todayProficient') {
            fstat.readFile("./data/doctorData.js", 'utf-8', (err, data) => {
                res.writeHead(200, "Content-Type:text/json,text/javascript,text/plain;charset=utf-8")
                var todayData = eval("" + data + "")
                res.end(JSON.stringify(todayData))
            })
        }
        if (req.url === '/order') {
            let dataorder = '';
            let orderarr
            let orderObj = {}
            req.on('data', (chunk) => {
                dataorder += chunk
            });
            req.on('end', () => {
                dataorder = decodeURI(dataorder)
                orderarr = dataorder.split("&")
                for (var i = 0; i < orderarr.length; i++) {
                    orderObj[orderarr[i].split("=")[0]] = orderarr[i].split("=")[1]

                }
                if (/\d{0,3}/.test(orderObj.doctor)) {
                    fstat.readFile("./data/doctorData.js", 'utf-8', (err, data) => {
                        data1 = eval("" + data + "")
                        for (var i = 0; i < data1.length; i++) {
                            if (data1[i].id === orderObj.doctor) {
                                data1[i].order.push(orderObj);
                            }
                        }
                        fstat.writeFile('./data/doctorData.js', JSON.stringify(data1), err => {
                            if (err) {
                                console.error(err)
                                return
                            }
                        })
                        res.end("ok")
                    })

                }

            })
        }
        // if ((/(.css|.js|.png|.jpg)$/).test(req.url)) {
        //     console.log(__dirname + req.url)
        //     fstat.readFile(__dirname + req.url, (err, data) => {
        //         res.writeHead(200, {
        //                 'content-type': {
        //                     "css": "text/css",
        //                     "gif": "image/gif",
        //                     "html": "text/html",
        //                     "ico": "image/x-icon",
        //                     "jpeg": "image/jpeg",
        //                     "jpg": "image/jpeg",
        //                     "js": "text/javascript",
        //                     "json": "application/json",
        //                     "pdf": "application/pdf",
        //                     "png": "image/png",
        //                     "svg": "image/svg+xml",
        //                     "swf": "application/x-shockwave-flash",
        //                     "tiff": "image/tiff",
        //                     "txt": "text/plain",
        //                     "wav": "audio/x-wav",
        //                     "wma": "audio/x-ms-wma",
        //                     "wmv": "video/x-ms-wmv",
        //                     "xml": "text/xml"
        //                 }
        //             })
        //             // console.log(data)
        //         res.end(data)
        //     })
        // }
    }

}).listen(1337, '127.0.0.1', function() {
    console.log("服务器启动成功")
    console.log(`服务器运行在http://${hostName}:${port}`)
})
server.close()