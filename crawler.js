const http = require('http');
const cheerio = require('cheerio');

var url = 'http://www.imooc.com/learn/436';


function filterChapter(html){
	const $ = cheerio.load(html);
	chapterContent = [];
	var chapters = $('.chapter');
	chapters.each((index,item)=>{
		var eachChapter = {};
		$(item).find('strong div').remove();//kill div
		eachChapter.chapterTitle = $(item).find('strong').text().trim();
		var videos = $(item).find('.video li');
		eachChapter.videos = [];
		videos.each((index,item)=>{
			var eachVideo = {};
			eachVideo.videoId = $(item).data('media-id');
			eachVideo.videoTitle = $(item).text().trim().replace(/\s/g,'').replace('开始学习','');
			eachChapter.videos.push(eachVideo);
		})
		chapterContent.push(eachChapter);
	});
	chapterContent.forEach((item)=>{
		console.log('\n'+'title:  ' + item.chapterTitle+'\n');
		item.videos.forEach((item)=>{

		console.log('【 '+  item.videoId +' 】'+item.videoTitle);
		});
	});
}

//[{chapterTitle:'',[{videoId:'',videoTitle}]}]

http.get(url, (res) => {
	var html = '';

	res.on('data',(chunk)=>{
		html += chunk;
	});
	res.on('end',()=>{
		filterChapter(html);
	});
	

}).on('error', (e) => {
	console.log('error message:  ' + e.message());
});
