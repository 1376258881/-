const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const querystring = require("querystring");
let db = require("./db.js");



const server = http.createServer();

server.on('request',(req,res) =>{

   let urlObj = url.parse(req.url,true)
   let query = urlObj.query;
   let pathname = urlObj.pathname;
   let query_uname = query.uname;
  
     //静态伺服 注册
    if(pathname == "/register.html" && req.method == "GET"){
      fs.readFile("./src/register.html","utf8",(err,data) => {
        if(err){
          res.end("404");
          return;
        }
        res.writeHead(200,{'content-type':"text/html;charset=utf8"});
        res.end(data);
      })
    }
    else if(pathname == "/css/register.css" && req.method == "GET"){
      fs.readFile("./src/css/register.css","utf8",(err,data) => {
        if(err){
          res.end("404");
          return;
        }
        res.writeHead(200,{'content-type':"text/css;charset=utf8"});
        res.end(data);
      })
    }
    else if(pathname == "/js/register.js" && req.method == "GET"){
      fs.readFile("./src/js/register.js","utf8",(err,data) => {
        if(err){
          res.end("404");
          return;
        }
        res.writeHead(200,{'content-type':"text/javascript;charset=utf8"});
        res.end(data);
      })
    }
   //静态伺服 登录
    if(pathname == "/login.html" && req.method == "GET"){
      fs.readFile("./src/login.html","utf8",(err,data) => {
        if(err){
          res.end("404");
          return;
        }
        res.writeHead(200,{'content-type':getExt(pathname)});
        res.end(data);
      })
    }
    else if(pathname == "/css/login.css" && req.method == "GET"){
      fs.readFile("./src/css/login.css","utf8",(err,data) => {
        if(err){
          res.end("404");
          return;
        }
        res.writeHead(200,{'content-type': getExt(pathname) });
        res.end(data);
      })
    }
    else if(pathname == "/js/login.js" && req.method == "GET"){
      fs.readFile("./src/js/login.js","utf8",(err,data) => {
        if(err){
          res.end("404");
          return;
        }
        res.writeHead(200,{'content-type':getExt(pathname)});
        res.end(data);
      })
    }
    //静态伺服 首页
    
    if(pathname == "/index.html" && req.method == "GET"){
      console.log(query)
      fs.readFile("./src/index.html","utf8",(err,data) => {
        if(err){
          res.end("404");
          return;
        }
        res.writeHead(200,{'content-type':getExt(pathname)});
        res.end(data);
      })
    }
    else if(pathname == "/css/index.css" && req.method == "GET"){
      fs.readFile("./src/css/index.css","utf8",(err,data) => {
        if(err){
          res.end("404");
          return;
        }
        res.writeHead(200,{'content-type':getExt(pathname)});
        res.end(data);
      })
    }
    else if(pathname == "/js/index.js" && req.method == "GET"){
      fs.readFile("./src/js/index.js","utf8",(err,data) => {
        if(err){
          res.end("404");
          return;
        }
        res.writeHead(200,{'content-type':getExt(pathname)});
        res.end(data);
      })
    }
    // 接口
     if (pathname == '/register_validation' && req.method == 'GET') {   //失焦验证
        //数据库验证  完成
        var obj = {}
        obj.uname=query_uname
        db.find("user_name",obj,(err,result)  =>{
          if (err) {
           console.log('失焦验证错误') 
            throw err
          }
            if (result.length == 1) {
              console.log(result)
              console.log('已经查找到数据')
              res.end("0");  
            }else {
              res.end("1")
            }
            
        })  
      //json文件读写
      fs.readFile('./data/data_name/username.json',"utf8",(err,data) =>{
      	let data_name = JSON.parse(data)     	
      	console.log(data_name)
      	for (let i = 0; i < data_name.length; i++) {     	
      	    if (data_name[i].uname == query_uname) {  
      	   //       	    	
      	    	break;
      	    }       	         	    
      	}
      	//res.end("1")
      }) 
    }else if (pathname == '/register' && req.method == 'POST') {   //注册提交    
      // post参数接收必须用到流的形式
      let data = "";
  	  req.on('data',(chunk) =>{
        data  +=  chunk;
      })
      req.on('end',() =>{
        let obj = querystring.parse(data);
        console.log(db.insertOne)
        //注册加入数据库   完成
      db.insertOne("user_name",obj,(err,result) => {
          if(err){
            res.end("0");
            return;
          }   
          res.end("1") 
      })

        //读取json文件
          fs.readFile('./data/data_name/username.json',"utf8",(err,data) =>{ 
            if (err) {
              res.end("0")
              throw err
            }
            let data2 = JSON.parse(data) 
            data2.push(obj)
            data2 = JSON.stringify(data2) 
            //写入json            
            fs.writeFile('./data/data_name/username.json',data2,'utf8',(err) =>{
              if (err) {
                res.end("0")
                throw err
              }                       
            })
          })//读写结束                      
        
      })
    }else if(pathname == '/login' && req.method == 'POST'){   //登录验证
      let data = "";
      req.on('data',(chunk) =>{
          data += chunk;
      })
      req.on('end',() =>{
        let obj = querystring.parse(data); //获取用户名，密码，转为对象
        console.log(obj)
           //数据库验证 完成
          db.find("user_name",obj,(err,result) =>{
              console.log(result)
              if (err) {
                throw err;
                return;
              }
              if (result.length == 1) {
                console.log("验证通过")
                console.log(result)
               res.end("1")
                return;
              }else {
                res.end('2') 
              }
          })
           //json文件读写
          fs.readFile('./data/data_name/username.json',"utf8",(err,data) =>{ 
            let data2 = JSON.parse(data)   //json内的数据，转为对象数组
            console.log(obj)
            console.log(data2)
            for (let i = 0; i < data2.length; i++) {                     
              if(obj.uname == data2[i].uname && obj.upassword == data2[i].upassword){             
               // res.end("1")
                break;
              }else {
              //  res.end('2') 
              }                                                     
            }   
          })                 
      })  
    }else if(pathname == '/index_getdata' && req.method == 'GET'){   //主页获取数据
      //数据库查找  ,未测试
        var arr;
           db.find("data",query,(res,result) =>{
            console.log(result);
            arr = JSON.stringify(result);
            console.log(arr)
            console.log('主页获取数据成功')
            
           })

      
           console.log('获取数据'+arr)
         if (arr) {
          console.log('获取数据'+arr)
          res.end(arr)  
           }   
        
       
         //res.end(arr+"")   
        //console.log(query)
       
         //res.end(arr)
       
      //  //json读写部分
      // fs.readFile('data/data/name.json','utf8',(err,data) =>{        
      //   let data2 = JSON.parse(data)
      //   var arr = []   
      //   for (var i = 0; i < data2.length; i++) {  
      //     if (data2[i].uname ==  query_uname) {                      
      //        arr.push(data2[i])                  
      //     }             
      //   }      
      //   arr = JSON.stringify(arr)      
      //   res.end(arr)
      // })
    }else if (pathname == '/add_data' && req.method == 'POST') {  //增加
      let data = "";
      req.on('data',(chunk) =>{
        data += chunk;
      })
      req.on('end',() =>{       
        let obj = querystring.parse(data);
        //数据库部分  完成
        db.insertOne("data",obj,(err,result) =>{
         if (err) {
            throw err;
            return;
          }
          if (result.length==1) {
             console.log('添加成功')
            
          }          
        })
        //json读写部分
        fs.readFile('data/data/name.json','utf8',(err,data) =>{
          let data2 = JSON.parse(data);
          obj.pid = data2.length + "";
          data2[data2.length] = obj
          data2 = JSON.stringify(data2);
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
      //数据库部分  完成
      console.log('查询')
       console.log(query);
      db.deleteMany("data",query,(err,result)=>{
        if (err) {throw err};
           console.log(result);
           console.log('删除成功')
            res.end("1")
      });     
     //json部分
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
        })
      }) 
    }else if (pathname == '/revise_data' && req.method == 'POST') {  //修改
       let data = "";
      req.on('data',(chunk) =>{
        data += chunk;  
      })
      req.on('end',() =>{
         let obj = querystring.parse(data);

         //数据库部分 完成
         var updateStr = {$set: obj};    
          db.updateMany("data",{pid:obj.pid,uname:obj.uname},updateStr,(err,result)=>{
            if (err) {
              throw err
            } 
            console.log('修改成功')              
            res.end("1")
          })

           //服务端json文件读写部分
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
            console.log(err)
           res.end(data);
            return;
          }
          res.writeHead(200,{'content-type':getExt(pathname)});
          res.end(data);
        })
      }
    } 
  }
   //jintai(pathname,req.method)

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



