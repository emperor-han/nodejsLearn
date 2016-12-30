const EventEmitter = require('events');

class MyEmitter extends EventEmitter{}

const myEm = new MyEmitter();

myEm.on('papapa',function(a,b){
	console.log(a,b,this);
});

myEm.on('papapa',function(c,d){
	console.log(c,d,this);
});

myEm.on('papapa',(a,b)=>{
	console.log(a,b,this);
});

myEm.emit('papapa','1','2');
