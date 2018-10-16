let mongodb = require("mongodb");
var mongodbCt = require("mongodb").MongoClient;


module.exports=(
    dbname,table,callback
)=>{
    mongodbCt.connect("mongodb://localhost:27017",(err,client)=>{
        var db = client.db(dbname)
        var collection = db.collection(table)
        callback(collection,client)
    })
}
