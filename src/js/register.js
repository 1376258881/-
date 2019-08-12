	//获取节点
	function getClass(cla){
	 return document.getElementsByClassName(cla)[0];
	}
	var uname = getClass("uname");
	var upassword = getClass("upassword");
	var upassword2 = getClass("upassword2");
	var register = getClass("register");
	var login = getClass("login");
	var span = document.getElementsByTagName("span");
	//为用户名添加正则判断
	var reg_uname = /^[A-Za-z0-9_]{3,12}$/g; 
	//密码正则判断
	var reg_upassword = /^[A-Za-z0-9_]{5,12}$/g
	var flig = false; //密码和用户名的正则开关
	var Existing = false;//判断用户是否存在
	//聚焦提示
	uname.onfocus= function(){
		reg_uname.lastIndex = 0;
		span[0].innerHTML = "请输入大小写字母，数字，_，3-12位";
		span[0].style.display = "inline-block";
		span[0].style.color = "#0f0";
		
	}
	//失焦判断正则，发送ajax请求
	uname.onblur = function (){
		if(reg_uname.test(uname.value)){
			
			//创建对象
			var xhr = null;
			if(window.XMLHttpRequest){
				xhr = new XMLHttpRequest;
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
							Existing = true;  //重名修改
						}else if(xhr.responseText == 1){
							span[0].innerHTML = "用户名可以使用";
							span[0].style.display = "inline-block";
							span[0].style.color = "#00f";
						}
					}			
				}		
			}
			
			//连接服务器
	      xhr.open("GET","register_validation?uname=" + uname.value,true);     
	      xhr.send(null);
	      flig = true;
	     		
		}else{
			span[0].innerHTML = "命名不规范";
			span[0].style.display = "inline-block";
			span[0].style.color = "#f00";		
			 flig = false;
		}
		
	}
	
	upassword.onfocus = pwdFocus;	
	function pwdFocus(){

	var i =	this.className.slice(9,10)
	      var j = 1
		if(i == "2" ){
			j = 2
			console.log(123)
		}
		reg_upassword.lastIndex = 0;
		span[j].innerHTML = "请输入大小写字母，数字，_，6-12位";
		span[j].style.display = "inline-block";
		span[j].style.color = "#0f0";
	}
	var padfilg = false;
	upassword.onblur = pwdBlur;	
	function pwdBlur(){
		if (uname.value) {
			if(reg_upassword.test(upassword.value) && flig){				
				span[1].innerHTML = "该项填写完成";
				span[1].style.display = "inline-block";
				span[1].style.color = "#0f0";	
		        padfilg = true;
		    }else if(reg_upassword.test(upassword.value) == false ){
		    	console.log(reg_upassword.test(upassword.value))
		    	span[1].innerHTML = "密码不规范";
				span[1].style.display = "inline-block";
				span[1].style.color = "#f00";		
			
		    }	
	    }else{
	    	    span[1].innerHTML = "请填写用户名";
				span[1].style.display = "inline-block";
				span[1].style.color = "#f00";
	    }
	}
	
	//确认密码狂
	upassword2.onfocus = pwdFocus;		
	upassword2.onblur = function () {	
		if(padfilg){   //密码与用户名
			if(upassword2.value == upassword.value){
				span[1].innerHTML = "该项填写完成";
				span[1].style.display = "inline-block";
				span[1].style.color = "#0f0";	
			    register.onclick = function(){  
			    		console.log(123)
			        if(Existing == false){ 		        		
					 //创建对象	    
					    var xhr = null;
						if(window.XMLHttpRequest){
							xhr = new XMLHttpRequest();
						}else{
							xhr = new ActiveXObject("Microsoft.XMLHTTP");
						}													
				         xhr.open("POST","register",true);   
				         xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				         xhr.send("uname="+uname.value+"&"+"upassword="+upassword.value);
				         time()
					}			  
			    }
			}else{
				span[2].innerHTML = "密码不一致";
				span[2].style.display = "inline-block";
				span[2].style.color = "#f00";	
			}
		}
	}
	
	
	
	
	
	
	 //跳转倒计时    
	function time(){
	   //获取显示秒数的元素，通过定时器来更改秒数。
	   var div_cantent = document.getElementsByClassName("content")[0];
	   var div_jump = document.getElementsByClassName("content_jump")[0];
		div_cantent.style.display = "none";
		div_jump.style.display = "block";
		var sec = document.getElementsByClassName("second")[0];
			
			var i=5;
			var timer = setInterval(function(){
			      i--;
			      sec.innerHTML = i+"";   
			      if(i ==1){
			   //通过window的location和history对象来控制网页的跳转。			   
			          window.location.href="http://localhost:3000/login.html";
			      }
			},1000) 			
	}