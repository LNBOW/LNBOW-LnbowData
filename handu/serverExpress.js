let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.listen(3000,()=>{console.log("server is runing...")});
app.use(express.static("./"));
app.use(express.static("./index"));
app.use(express.static("./list"));
app.use(express.static("./detail"));
app.use(express.static("./register"));
app.use(express.static("./shopcar"));
app.use(express.static("./sign"));

