var express = require('express');
var router = express.Router();
var mongo = require("../libs/mongo")

/* GET users listing. */
router.get('', function(req, res, next) {
//   //查询字段req.query/body
  let start = parseInt(req.query.start)
  let count = req.query.count - 0
console.log(res)
  mongo("handu","goods",
  (collection,client)=>{
    collection.find({},{
      limit:count,
      skip:start,
      projection:{_id:0}
    }).toArray((err,res_db)=>{
        console.log(res_db)
        res.send(res_db)
      client.close()
    })
  })
});

module.exports = router;
