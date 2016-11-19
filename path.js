const path = require('path');

//解析当前目录
var workDir = path.resolve('.');

//组合成完整的路径
var com = path.join(workDir,'pub','index.html');

console.log(com);
