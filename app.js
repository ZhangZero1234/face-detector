var AipFaceClient = require("baidu-ai").face;

// 设置APPID/AK/SK
var APP_ID = "10195118";
var API_KEY = "t3G2BYZ9UfoOgiQzjBMrRI1m";
var SECRET_KEY = "3ktGNY68lFGmDmMX8w0IYXCm3CMykFxb";

var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

// console.log(client);

var express = require("express");
var fs = require("fs");
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' }));
app.listen(3000,function(){
	console.log("port 3000 lnstening ........");
});

app.post('/upload',function(req,res){
	var body = req.body;
	var base64Data = body.base64;
	base64Data = base64Data.replace(/\s/g,"+");
	base64Img1 = base64Data.replace(/^data:image\/\w+;base64,/,"");
	var Img2 = fs.readFileSync("./out.png");
	var base64Img2 = Img2.toString('base64');
	client.match([base64Img1, base64Img2]).then(function(result) {
    	console.log(JSON.stringify(result));
    	res.send(JSON.stringify(result));
	});

});
app.post("/regist",function(req,res){
	var body = req.body;
	var base64Data = body.base64;
	base64Data = base64Data.replace(/\s/g,"+");
	base64Data = base64Data.replace(/^data:image\/\w+;base64,/,"");
	var base64Img1 = new Buffer(base64Data, 'base64');//将base64字符串转成base64的对象
	fs.writeFile("out.png", base64Img1, function(err) {
		if(err){
		  res.send(err);
		}else{
		  res.send("保存成功！");
		}
	});
});