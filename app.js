const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const querystring = require("querystring");

const server = http.createServer();

server.on('request',(req,res) =>{

   let urlObj = url.parse(req.url,true)
   let query = urlObj.query;
   let pathname = urlObj.pathname;
   let query_uname = query.uname;
  
     //静态伺服 注册
    // if(pathname == "/register.html" && req.method == "GET"){
    //   fs.readFile("./src/register.html","utf8",(err,data) => {
    //     if(err){
    //       res.end("404");
    //       return;
    //     }
    //     res.writeHead(200,{'content-type':"text/html;charset=utf8"});
    //     res.end(data);
    //   })
    // }
    // else if(pathname == "/css/register.css" && req.method == "GET"){
    //   fs.readFile("./src/css/register.css","utf8",(err,data) => {
    //     if(err){
    //       res.end("404");
    //       return;
    //     }
    //     res.writeHead(200,{'content-type':"text/css;charset=utf8"});
    //     res.end(data);
    //   })
    // }
    // else if(pathname == "/js/register.js" && req.method == "GET"){
    //   fs.readFile("./src/js/register.js","utf8",(err,data) => {
    //     if(err){
    //       res.end("404");
    //       return;
    //     }
    //     res.writeHead(200,{'content-type':"text/javascript;charset=utf8"});
    //     res.end(data);
    //   })
    // }
   //静态伺服 登录
    // if(pathname == "/login.html" && req.method == "GET"){
    //   fs.readFile("./src/login.html","utf8",(err,data) => {
    //     if(err){
    //       res.end("404");
    //       return;
    //     }
    //     res.writeHead(200,{'content-type':getExt(pathname)});
    //     res.end(data);
    //   })
    // }
    // else if(pathname == "/css/login.css" && req.method == "GET"){
    //   fs.readFile("./src/css/login.css","utf8",(err,data) => {
    //     if(err){
    //       res.end("404");
    //       return;
    //     }
    //     res.writeHead(200,{'content-type': getExt(pathname) });
    //     res.end(data);
    //   })
    // }
    // else if(pathname == "/js/login.js" && req.method == "GET"){
    //   fs.readFile("./src/js/login.js","utf8",(err,data) => {
    //     if(err){
    //       res.end("404");
    //       return;
    //     }
    //     res.writeHead(200,{'content-type':getExt(pathname)});
    //     res.end(data);
    //   })
    // }
    // //静态伺服 首页
    
    // if(pathname == "/index.html" && req.method == "GET"){
    //   console.log(query)
    //   fs.readFile("./src/index.html","utf8",(err,data) => {
    //     if(err){
    //       res.end("404");
    //       return;
    //     }
    //     res.writeHead(200,{'content-type':getExt(pathname)});
    //     res.end(data);
    //   })
    // }
    // else if(pathname == "/css/index.css" && req.method == "GET"){
    //   fs.readFile("./src/css/index.css","utf8",(err,data) => {
    //     if(err){
    //       res.end("404");
    //       return;
    //     }
    //     res.writeHead(200,{'content-type':getExt(pathname)});
    //     res.end(data);
    //   })
    // }
    // else if(pathname == "/js/index.js" && req.method == "GET"){
    //   fs.readFile("./src/js/index.js","utf8",(err,data) => {
    //     if(err){
    //       res.end("404");
    //       return;
    //     }
    //     res.writeHead(200,{'content-type':getExt(pathname)});
    //     res.end(data);
    //   })
    // }
    // 接口
     if (pathname == '/register_validation' && req.method == 'GET') {   //失焦验证
      fs.readFile('./data/data_name/username.json',"utf8",(err,data) =>{
      	let data_name = JSON.parse(data)     	
      	console.log(data_name)
      	for (let i = 0; i < data_name.length; i++) {     	
      	    if (data_name[i].uname == query_uname) {  
            //res.writeHead(200,{'content-type':"text/html;charset=utf8"});   
      	    res.end("0");        	    	
      	    	break;
      	    }       	         	    
      	}
       // res.writeHead(200,{'content-type':"text/html;charset=utf8"});
      	res.end("1")
      }) 
    }else if (pathname == '/register' && req.method == 'POST') {   //注册提交    
      // post参数接收必须用到流的形式
      let data = "";
  	  req.on('data',(chunk) =>{
        data  +=  chunk;
      })
      req.on('end',() =>{
        let obj = querystring.parse(data);
        fs.readFile('./data/data_name/username.json',"utf8",(err,data) =>{ 
          if (err) {
            res.end("0")
            throw err
          }
          let data2 = JSON.parse(data) 
          data2.push(obj)
          data2 = JSON.stringify(data2)             
          fs.writeFile('./data/data_name/username.json',data2,'utf8',(err) =>{
            if (err) {
              res.end("0")
              throw err
            }
            res.end("1")
          })
        })            
      })
    }else if(pathname == '/login' && req.method == 'POST'){   //登录验证
      let data = "";
      req.on('data',(chunk) =>{
          data += chunk;
      })
      req.on('end',() =>{
        let obj = querystring.parse(data); //获取用户名，密码，转为对象
        console.log(obj)
        fs.readFile('./data/data_name/username.json',"utf8",(err,data) =>{ 
        let data2 = JSON.parse(data)   //json内的数据，转为对象数组
          for (let i = 0; i < data2.length; i++) {                     
            if(obj.uname == data2[i].uname && obj.upassword == data2[i].upassword){             
              res.end("1")
              break;
            }                              
          } 
            res.end('2')                          
        }) 
      })  
    }else if(pathname == '/index_getdata' && req.method == 'GET'){   //主页获取数据
      fs.readFile('data/data/name.json','utf8',(err,data) =>{
        let data2 = JSON.parse(data)
        var arr = []        
        for (var i = 0; i < data2.length; i++) {  
          if (data2[i].uname ==  query_uname) {
             arr.push(data2[i])                  
          }             
        }
        arr = JSON.stringify(arr)
        res.end(arr)
      })
    }else if (pathname == '/add_data' && req.method == 'POST') {  //增加
      let data = "";
      req.on('data',(chunk) =>{
        data += chunk;
      })
      req.on('end',() =>{
        let obj = querystring.parse(data);
        console.log(obj)
        fs.readFile('data/data/name.json','utf8',(err,data) =>{
          let data2 = JSON.parse(data);
          obj.pid = data2.length + "";
          data2[data2.length] = obj
          data2 = JSON.stringify(data2);
           console.log(data2)
          fs.writeFile('data/data/name.json',data2,'utf8',(err) =>{
            if (err) {
              throw err
            }
            res.end("1")
          })
        })  
      })
    }else if (pathname == "/remove_data" && req.method == 'GET') {  //删除     
      let query_pid = query.pid;
      fs.readFile('data/data/name.json','utf8',(err,data) =>{
         let data2 = JSON.parse(data);
        for (var i = 0; i < data2.length; i++) {
          if (data2[i].pid == query_pid && data2[i].uname == query_uname) {
              data2.splice(i,1)
          } 
        }
        fs.writeFile('data/data/name.json',JSON.stringify(data2),'utf8',(err) =>{
          if (err) {
              throw err
            }
            res.end("1")
        })
      }) 
    }else if (pathname == '/revise_data' && req.method == 'POST') {  //修改
     // let query_pid = query.pid;
       let data = "";
      req.on('data',(chunk) =>{
        data += chunk;  
      })
      req.on('end',() =>{
         let obj = querystring.parse(data);
        fs.readFile('data/data/name.json','utf8',(err,data) =>{
           let data2 = JSON.parse(data);
          for (var i = 0; i < data2.length; i++) {
            if (data2[i].pid == obj.pid && data2[i].uname == obj.uname) {    
             data2.splice(i,1,obj)
            } 
          }       
          fs.writeFile('data/data/name.json',JSON.stringify(data2),'utf8',(err) =>{
            if (err) {
                throw err
              }
              res.end("1")
          })
        }) 
      })
    }
   //静态伺服封装
  function jintai(pathname,method){
    let getext = path.extname(pathname);  //文件后缀名
    if (method == 'GET') {
      if (getext == ".html") {
        getext = "";
      }
      if (getext == 'css' ||'js'||"jpg" ||"png" || "gif" ||"html") {
         fs.readFile("./src"+pathname,"utf8",(err,data) => {
          if(err){
            res.end("404");
            return;
          }
          res.writeHead(200,{'content-type':getExt(pathname)});
          res.end(data);
        })
      }
    } 
  }
   jintai(pathname,req.method)

   //兼容文件格式
  function getExt(pathname){
      var getext = path.extname(pathname);//文件的后缀名
      var ext = ''
      if(getext == "html"){
         ext = "text/html;charset=utf8"; 
      }
      if(getext == "css"){
         ext = "text/css;charset=utf8";
      }
      if(getext == "jpg"){
         ext = "text/jpg;charset=utf8";
      }
      if(getext == "png"){
         ext = "text/png;charset=utf8";
      }
      if(getext == "js"){
         ext = "text/javascript;charset=utf8";
      }
      if(getext == "gif"){
         ext = "text/gif;charset=utf8";
      }
      return ext;
  }

})
server.listen(3000)



