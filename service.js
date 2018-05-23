var http = require('http');

http.createServer(function (request, response) {

    //  HTTP ͷ    // HTTP ״ֵ̬: 200 : OK
    // : text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});


    //  "Hello World"
    response.end('Hi! xiajunyi\'s nodeJs Sever is Ok!\n');
	//开始准备调用脚本
	var callfile = require('child_process');
	callfile.execFile('/opt/gitCode/hexoHook.sh',null,null,function (err, stdout, stderr) {
     callback(err, stdout, stderr);
 });
}).listen(8888);

// 

    console.log('Server running at http://127.0.0.1:8888/');
	