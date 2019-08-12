    	//获取节点
		function getClass(cla){
		 return document.getElementsByClassName(cla)[0];
		}
		var uname = getClass("uname");
		var upassword = getClass("upassword");
		var register = getClass("register");
		var login = getClass("login");
		var span = document.getElementsByTagName("span");
		//为用户名添加正则判断
		var reg_uname = /^[A-Za-z0-9_]{3,12}$/g; 
		//密码正则判断
		var reg_upassword = /^[A-Za-z0-9_]{6,12}$/g
		var flig = false; //密码和用户名的正则开关
		var Existing = false;//判断用户是否已经存在
		//聚焦提示
		uname.onfocus= function(){
			reg_uname.lastIndex = 0;
			span[0].innerHTML = "请输入大小写字母，数字，_，3-12位";
			span[0].style.display = "inline-block";
			span[0].style.color = "#0f0";
			
		}
		//登录失焦判断正则
		//失焦判断正则，发送ajax请求
		uname.onblur = function (){
			if(reg_uname.test(uname.value)){
				
				//创建对象
				var xhr = null;
				if(window.XMLHttpRequest){
					xhr = new XMLHttpRequest();
				}else{
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
				// 2.绑定监听函数
				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4){   //ajax的状态码
						if(xhr.status == 200){ //响应码
							console.log(xhr.responseText) 
							if (xhr.responseText == 0) {  
								span[0].innerHTML = "用户名已经存在";
								span[0].style.display = "inline-block";
								span[0].style.color = "#f00";
								Existing = true;  //重名修改布尔值
							}else if(xhr.responseText == 1){
								span[0].innerHTML = "用户名可以使用";
								span[0].style.display = "inline-block";
								span[0].style.color = "#00f";
							}
						}			
					}		
				}
				
				//连接服务器
		        xhr.open("GET","login_validation?uname=" + uname.value,true);     
		        xhr.send(null);
		        flig = true;
		     		
			}else{
				span[0].innerHTML = "用户名不规范";
				span[0].style.display = "inline-block";
				span[0].style.color = "#f00";		
				flig = false;
			}			
		}
		
		
		upassword.onfocus = function(){
			reg_upassword.lastIndex = 0;
		    span[1].innerHTML = "请输入大小写字母，数字，_，6-12位";
		    span[1].style.display = "inline-block";
		    span[1].style.color = "#0f0";
		}
		//密码失焦
		upassword.onblur = function (){      
			if(reg_upassword.test(upassword.value) && flig){ //密码和用户名都通过正则
		        login.onclick = function(){                 //登录
		        	if(Existing == false){                 //数据库中有同名
					     //创建对象	    
					    var xhr = null;
						if(window.XMLHttpRequest){
							xhr = new XMLHttpRequest();
						}else{
							xhr = new ActiveXObject("Microsoft.XMLHTTP");
						}	
				                	// 2.绑定监听函数
						xhr.onreadystatechange = function(){
							if(xhr.readyState == 4){   //ajax的状态码
								if(xhr.status == 200){ //响应码
									console.log(xhr.responseText) 
									if (xhr.responseText == 1) {  
									window.location.href = "http://localhost:3000/index.html" + "?uname="+uname.value; //跳转首页  将uname手动添加传出
									}else if(xhr.responseText == 2){
									 var login_text = document.getElementsByClassName("login_text")[0];
									 login_text.style.color = "#f00";
									 login_text.style.display = "block";
		
									}
								}			
							}		
						}		
				         xhr.open("POST","login",true);   
				         xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				         xhr.send("uname="+uname.value+"&"+"upassword="+upassword.value)		         		        
					}
		        }
		    }
		}
