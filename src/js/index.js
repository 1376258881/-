//从url中获取uname 首页发送ajax
    console.log(window.location.href)	
	var str = window.location.href
	var str= str.split("?")
	var str= str[1].split("=")	
	console.log(str[0],str[1])
	
	//创建对象
	
	F5()
function F5() {	
	var xhr;
		if (window.XMLHttpRequest){
		    xhr=new XMLHttpRequest();
		}
		else{
		    xhr=new ActiveXObject("Microsoft.XMLHTTP");
		}
	   xhr.onreadystatechange = function(){
		   	if (xhr.readyState == 4) {
		   	    if(xhr.status == 200){		  		   	    		
		   	    	var obj_xhr =JSON.parse(xhr.responseText) 
		   	    	if(obj_xhr.length == 0 ){
		   	    	  		alert("您还没有数据，请添加数据")				   	    	  	
		   	    	}
		   	    	console.log(JSON.parse(xhr.responseText))
		   	    	let obj = {}	
		   	    	obj.data = JSON.parse(xhr.responseText)	   	    			   	    	
		   	    	addLi (obj)		   	    	
		   	    }
		    }		 
		}		
	xhr.open("GET","index_getdata?"+str[0]+"="+str[1],true)
	xhr.send(null);	
//  var obj=[{pid:0,name:"jack",sex:0,age:"12",mail:"123456@qq.xco",phone:13245645617}]  
//  addLi (obj)	
}

 	function getClass(clas) {
 		return document.getElementsByClassName(clas)[0];
 	}
 	var bigbox = getClass("bigbox")  //首页菜单
    var login_box = getClass("login-box") //添加页
    var addbtn2= getClass("addbtn2"); //添加页 取消按钮
 	var addbtn = getClass("addbtn"); //添加页 添加 按钮
 	var adduname = getClass("int-uname");//用户名
 	var addsex = getClass("int-grl") //性别
 	var addsex2 = getClass("int-men") //性别
 	var addage = getClass("int-age")//年龄
 	var addemail = getClass("int-email")//邮箱
 	var addtel = getClass("int-tel")//电话
 	var span = document.getElementsByTagName("span")  //提示信息
 	var seek_box = getClass("seek-box-conten");//修改-所有数据菜单页面
 	//为昵称添加正则判断
	var reg_uname = /^[A-Za-z0-9_]{3,12}$/g; 	   
    //为年龄添加判断
    var reg_age = /^[1-9]?[0-9]?[0,1,2]$/g;    
    //邮箱验证
    var reg_email = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/g
 	//电话
 	var reg_tel = /^[1][3,5,7,9][0-9]{9}$/g
 	//判断性别
 	var sex_judge = 0; //默认为男
   
	addsex.onchange = function(){
	   	if(sex_judge==0){
	   		sex_judge=1;  
	   	}
	}
    addsex2.onchange = function(){
	   	if(sex_judge==1){
	   		sex_judge=0;  
	   	}		
	}

	//正则提示	
 	 function reg_onfocus (reg,i) {
      	 reg.lastIndex = 0; 	    	
 		 span[i].style.color = "#03A9F4";
 		 span[i].style.display = "inline-block";
 		 
     }		
 	function reg_onblur(reg,i,add){
 		if(reg.test(add.value)){ 			
	 		 span[i].innerHTML = "填写完成";
	 		 span[i].style.color = "#03A9F4";
	 		 span[i].style.display = "inline-block"; 	
	 		 boolArr[i] = 1;
 	     }else{
	 	 	 span[i].innerHTML = "内容不符合规范";
	 	 	 span[i].style.color = "#f00";
	 		 span[i].style.display = "inline-block";	
	 		 boolArr[i] = 0;
 	    }
 	}
 	
 	//用户验证
 	var boolArr = [0,0,0,0]
 	adduname.onfocus = function  () {
 		 span[0].innerHTML = "请输入大写字母，数字，_，3-12";
 		 reg_onfocus (reg_uname,0)			
 	}
 	adduname.onblur = function(){
 		reg_onblur(reg_uname,0,adduname);
 	}
 	//年龄
 	addage.onfocus = function  () {
 		  span[3].innerHTML = "请输入你的年龄，1-3位数字";
 		  reg_onfocus (reg_age,3)				
 	}
 	addage.onblur = function(){
 		reg_onblur(reg_age,3,addage);
 	}
 	//邮箱
 	addemail.onfocus = function  () {
 		  span[4].innerHTML = "请输入邮箱";
 		  reg_onfocus (reg_email,4)			
 	}       	
 	addemail.onblur = function() {
 		reg_onblur(reg_email,4,addemail);
 	}
 	//电话
 	addtel.onfocus = function  () {
 		  span[5].innerHTML = "请输入手机号";
 		  reg_onfocus (reg_tel,5)			
 	}       	
 	addtel.onblur = function() {
 		  reg_onblur(reg_tel,5,addtel);
 	}
 	
 	//添加按钮 	
    addBtn("add_data","","POST")  //导入形参
    function  addBtn(url,kid,open) {
    	addbtn.onclick  = function(){   		
    		reg_tel.lastIndex =0           
           	reg_email.lastIndex=0          
           	reg_age.lastIndex=0          
           	reg_uname.lastIndex=0;
           	for(var i=0;i<boolArr.length;i++){
           		boolArr[i]
           	}
		   if(reg_uname.test(adduname.value) && reg_age.test(addage.value)){
			    if(reg_email.test(addemail.value) && reg_tel.test(addtel.value) ){
			    var xhr = null;
			    if (window.XMLHttpRequest) {
			    	xhr = new XMLHttpRequest();
			    } else{
			    	xhr = new ActiveXObject("Microsoft.XMLHTTP");		    	
			    }
			    xhr.onreadystatechange = function(){		    	
			   	    if (xhr.readyState == 4) {
			   	    	if(xhr.status == 200){
			   	    		console.log("添加成功")
			   	    		addtel.value = "";
				    		addage.value = "";
				    		addemail.value = "";
				    		addtel.value = "";
				    		adduname.value = "";			   	    		
			   	    		F5()//刷新数据//刷新数据				   	    		
			   	    		login_box.style.display = "none"; //刷新页面后隐藏首页
			   	    		bigbox.style.display = "block";			   	    		
			   	    	}
			   	    }
			    }
			     xhr.open(open,url,true);
			     xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			     xhr.send("uname=" + str[1] + "&name=" + adduname.value+" &sex=" + sex_judge +"&age="+addage.value+"&mail=" + addemail.value+"&phone="+addtel.value + kid);		     
			    }else{
			 		span[6].style.display = "inline-block";
			 		span[6].style.color = "#f00";
		 		    span[6].style.display = "inline-block";
			 	}
		    }else{		    
			 		span[6].style.display = "inline-block";
			 		span[6].style.color = "#f00";
		 		    span[6].style.display = "inline-block";
           }		    
		}
    }    
    //添加页面取消按钮
    addbtn2.onclick=function(){
    	adduname.value = "";
    	addtel.value = "";
    	addage.value = "";
    	addemail.value = "";
    	addtel.value = "";
    	login_box.style.display = "none";
    	bigbox.style.display = "block"
    	
    }
     
    
 	//首页添加按钮绑定事件
 	var add = getClass("add")
 	add.onclick = function(){ 
 		bigbox.style.display = "none";  //首页隐藏
 		addbtn.value = "添加";	 
 	    login_box.style.display = "block";			
 	}
 	
 	//首页删除	 	
 
 	function page_del(obj_del){
   	    var del = getClass("del")
    //为删除绑定点击    
	    del.onclick = function(){			
			if(obj_del.data.length == 0){
				alert("你还没有数据")
		    }else{	
		    	var n =parseInt(prompt("共有"+obj_del.data.length+"条数据，请输入删除第几行数据"))		    	
		    	    if(String(n) != String(NaN)){
		    	   	var i = obj_del.data[n-1].pid		   	 			        
				    var xhr;
					if (window.XMLHttpRequest){
					    xhr=new XMLHttpRequest();
					}
					else{
					    xhr=new ActiveXObject("Microsoft.XMLHTTP");
					}
				    xhr.onreadystatechange = function(){
					   	    if (xhr.readyState == 4) {
					   	    	if(xhr.status == 200){								   	    		
					   	    	  console.log("删除成功")						   	    	  
					   	    	  	F5() //刷新数据						   	    	  	
					   	    	}
					   	    }
					   }													
					xhr.open("GET","remove_data?"+str[0]+"="+str[1]+"&pid="+i,true)
					xhr.send(null);  
		    	}		   	       
			}
		}	   	    		
    }
 			
    //获取data数据，显示表单
 	function  addLi (obj_revise) { 		
 		//添加列表数据
 	    if(obj_revise.data.length != 0){	
 	     seek_box.innerHTML = "<ul><li>姓名</li><li>性别</li><li>年龄</li><li>mail</li><li>电话</li><li>操作</li></ul>";	

	 	    for(var i = 0;i<obj_revise.data.length ;i++){
	 	   	    var ul = document.createElement("ul")	 	   	   
	 	   	    for(var key in obj_revise.data[i]){
	 	   	    	var li = document.createElement("li")	 	   	    	
	 	   	    	if(obj_revise.data[i].sex == 0){
	 	   	    		obj_revise.data[i].sex="男";	 	   	    		
	 	   	    	}else if(obj_revise.data[i].sex == 1){
	 	   	    		obj_revise.data[i].sex="女";
	 	   	    	}		 	   	    	
	 	   	    	if(key != "pid" && key != "uname"){	 	   	    			 	   	    		
	 	   	    		li.innerHTML = obj_revise.data[i][key]
		 	   	        ul.appendChild(li)	

	 	   	    	}
	 	   	    }
	 	   	    //添加修改按钮
	 	   	 var li = document.createElement("li")
	 	   	 var btn_revise = document.createElement("button");
	 	   	 var btn_del = document.createElement("button");		 	   	     
	 	   	     btn_del.innerHTML = "删除";
	 	   	     btn_revise.innerHTML = "修改";		 	   	       
	 	   	     btn_del.className = "btn-del"+i
	 	   	     btn_revise.className = "btn-revise"+i
 	   	        li.appendChild(btn_revise)
	 	   	    li.appendChild(btn_del)
	 	   	    ul.appendChild(li) 	 	   	   
	 	   	    seek_box.appendChild(ul)	

	 	   	    //对表单进行操作
	 	   	    btnDel (obj_revise.data[i].pid,i,obj_revise.data[i])  //给删除按钮传pid形参	
	 	   	    page_seek (obj_revise)//查找
	 	   	    page_del(obj_revise) //首页删除按钮
	   	    	page_revise (obj_revise)//首页修改按钮
	 	   }	 	   
 	    }
 	}	
 	
 	//首页修改 	 	   	
 	function page_revise (obj_revise) {	
 		var revise = getClass("revise")		
 	    revise.onclick = function (){ 	
 	    	//window.location.href = "03.html" + "?uname="+str[0]; //刷新数据
	 	     bigbox.style.display= "none"
 	    }	    
 	}
 	
 	
 	
 	//修改表单的页面功能
    function  btnDel (pid,i,data) {
    	//修改页面删除按钮
        var btndel = getClass("btn-del"+i)
		btndel.onclick = function  () {	
			console.log(pid)
	 	    //得到pid后ajax请求        
	 	    this.parentElement.parentElement.style.display = "none";
	 	    var xhr;
			if (window.XMLHttpRequest){
			    xhr=new XMLHttpRequest();
			}
			else{
			    xhr=new ActiveXObject("Microsoft.XMLHTTP");
			}
		    xhr.onreadystatechange = function(){
			   	    if (xhr.readyState == 4) {
			   	    	if(xhr.status == 200){								   	    		
			   	    	  console.log("删除成功")	
			   	    	F5()//刷新数据			   	    	
		   	    	    }
			   	    }
			   }													
			xhr.open("GET","remove_data?"+str[0]+"="+str[1]+"&pid="+pid,true)
			xhr.send(null);   						
 	 	}
		
		//修改页面修改按钮
		var btnrevises = getClass("btn-revise"+i)
	    btnrevises.onclick = function  () {		    	
	    	//修改数据的菜单页面
		    var lis = this.parentElement.parentElement.childNodes
		    var ints = login_box.getElementsByTagName("input")	    
	    	if (lis[1].innerHTML=="男" ) {
	    			 ints[1].checked = true
	    	}else if (lis[1].innerHTML=="女" ){
	    			 ints[2].checked = true	 
	    	}  
	    	var str = lis[0].innerHTML
    		ints[0].value = str.trim()
    		ints[3].value = lis[2].innerHTML
    		ints[4].value = lis[3].innerHTML
    		ints[5].value = lis[4].innerHTML   	
	    	addbtn.value = "确认修改";	    	
	    	login_box.style.display = "block";
	    	var send_revises = "&pid="+pid;
	    	addBtn("revise_data",send_revises,"POST")
	    }
    }
   
   //首页查找     
    function page_seek (obj_revise) {     
        var seek_box_ul= seek_box.getElementsByTagName("li")
       // console.log(uls[0].childNodes)
        var seek = getClass("seek")  	
	    var seekbtn=getClass("seekbtn");  //查找按钮
        seek.onclick=  function (){  //首页修改按钮
        	var seekint =getClass("seek-box-int") //查找输入框div
        	var seekclas = document.querySelectorAll(".seek-box-int>input")
        	seekint.style.display = "block"		   
        	seekbtn.onclick = function  () {        		
        		for(var i=6;i < seekclas.length	;i++){       			
        			for (var j = 1;j <seek_box_ul.length;i++) {        				
        				if(seekclas[i].value != seek_box_ul[j]){
        				 	seek_box_ul[j].parentNode.style.display = "none"        				 	       				 	
        				}
        			}       			     			         			
        		}		    				
        	}		    	
        }	    
	}
	    
    function home () {
    	var seekint =getClass("seek-box-int")   
    	bigbox.style.display = "block"
    	login_box.style.display = "none";
    	seek_box.style.display = "none";
        seekint.style.display = "none";
    }
 	