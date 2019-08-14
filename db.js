// 做DAO层
// 起源于java，java的dao可以写的非常大，当然，在node 中，也是可以写的非常大
// 做专门连接数据库的层，然后暴露接口给后台进行访问



var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

function _connectDB(callback){
	let database_url = "mongodb://localhost:27017/";   //数据库的地址
	let database_name = "data";    //数据库名称
	let url = database_url + database_name;
	MongoClient.connect(url,function(err,db){
		if(err){
			callback(err,null);
			return;
		}
		callback(err,db);
	})
}

// 暴露接口   // 插入数据
exports.insertOne = function(collectionName,json,callback){
	_connectDB(function(err,db){
		db.collection(collectionName).insertOne(json, (err, result) => {
			// if(err){
			// 	callback(err,null)
			// 	return;
			// }
			callback(err,result);
	        db.close();
	    });
	})
}

// 删除的接口
exports.deleteMany = function(collectionName,json,callback){
	_connectDB(function(err,db){
		db.collection(collectionName).deleteMany(json,function(err,result){
			callback(err,result);
	        db.close();
		})
	})
}

// 更新数据
exports.updateMany = function(collectionName,json1,json2,callback){
	_connectDB(function(err,db){
		db.collection(collectionName).updateMany(json1,json2,function(err,result){
			callback(err,result);
	        db.close();
		})
	})
}

// 查询
// exports.find = function(collectionName,json,callback){
// 	var result = [];

// 	_connectDB(function(err,db){
// 		var cursor = db.collection(collectionName).find(json);
// 		cursor.each(function(err,doc){
// 			if(err){
// 				callback(err,null)
// 			}
// 			if(doc != null){
// 				result.push(doc)
// 			}else{
// 				callback(null,result)
// 			}
// 		})
// 	})
// }
// 1.所有的数据，万把子条，一个页面能够完全展示吗？
// 2.前台假分页     后台把所有的数据全部从数据库中获取过来，然后在原封不动的给前台，前台在根据所有数据来进行分页
// 3.后台假分页     后台吧所有的数据全部从数据库中获取过来，然后根据前端传递过来的参数，返回给前端几条数据
// 4.真的分页，让事情给数据库来做，降低传输的内容
	// 前端，需要10条数据  page=1    后台在数据库中去找到10数据，然后给前台
	// 10-20    page = 2

// limit(number)    找到number个数据
// skip(number)     省略number个数据

// db.student.find().limit(5).skip(0);        找到1-5数据    
// db.student.find().limit(5).skip(5);            6-10数据
// db.student.find().limit(5).skip(10);           11-15
// 假设接收到的参数为page，一页有5条数据
// db.student.find({}).limit(5).skip(page*5)

// 假设说我不需要分页，page参数就可以不需要传递
exports.find = function(collectionName,json,C,D){
	var result = [];
	if(arguments.length == 3){   //这个时候就是不需要分页的
		var callback = C;
		var limitnum = 0;
		var skipnum = 0;
	}else if(arguments.length == 4){
		// 假设传递进来c的参数为一个对象{
		// 	pageamount : 10,
		// 	page : 0
		// }
		var callback = D;   //最后一位就为回调函数
		var args = C;       //分页的条件
		// 省略的条数
		var skipnum = args.pageamount * args.page || 0;
		// 找到的条数
		var limitnum = args.pageamount || 0;
		// 排序
		var sort = args.sort || {};
	}else{
		throw new Error('find函数参数的个数必须为三个或者四个')
		return;
	}
	_connectDB(function(err,db){
		var cursor = db.collection(collectionName).find(json).skip(skipnum).limit(limitnum).sort(sort)
		cursor.each(function(err,doc){
			if(err){
				callback(err,null);
				db.close();
				return
			}
			if(doc!=null){
				result.push(doc);
			}else{
				callback(null,result);
				db.close()
			}
		})
	})
}