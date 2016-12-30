const http = require('http');
const cheerio = require('cheerio');
var baseUrl = 'http://www.imooc.com/learn/';
var url = 'http://www.imooc.com/learn/';
var courseId = [436, 311, 262, 141, 33];
var courseArray = [];
var courseData = [];


function filterChapter(html) {
	const $ = cheerio.load(html);
	var temp = {};
	temp.courseName = $('.hd').text().trim();
	//console.log(temp.courseName);
	temp.courseNum = 3333;

	temp.courseContent = [];
	var chapters = $('.chapter');
	chapters.each((index, item) => {
		var eachChapter = {};
		$(item).find('strong div').remove(); //kill div
		eachChapter.chapterTitle = $(item).find('strong').text().trim();
		var videos = $(item).find('.video li');
		eachChapter.videos = [];
		videos.each((index, item) => {
			var eachVideo = {};
			eachVideo.videoId = $(item).data('media-id');
			eachVideo.videoTitle = $(item).text().trim().replace(/\s/g, '').replace('开始学习', '');
			eachChapter.videos.push(eachVideo);
		})
		temp.courseContent.push(eachChapter);
	});

	courseData.push(temp);
	/*courseContent.forEach((item) => {
		console.log('\n' + 'title:  ' + item.chapterTitle + '\n');
		item.videos.forEach((item) => {

			console.log('【 ' + item.videoId + ' 】' + item.videoTitle);
		});
	});*/
}

//[{chapterTitle:'',[videoId:'',videoTitle]}]
/*courseData=[
courseInfo={
	courseName,
	courseNum,
	courseContent[
		{
			chapterTitle,

		}

	]
}

]*/


function getPagesAsync(url) {

	return new Promise((resolve, reject) => {
		console.log("正在爬取"+url);
		http.get(url, (res) => {
			var html = '';

			res.on('data', (chunk) => {
				html += chunk;
			});
			res.on('end', () => {
				//filterChapter(html);
				resolve(html);
			});


		}).on('error', (e) => {
			reject(e);
			console.log('error message:  ' + e.message());
		});
	});
}



function printData(){
	courseData.forEach((item)=>{
		//console.log(typeof item);
		console.log('\n'+'课程名： '+item.courseName+'课程人数： '+item.courseNum+'\n');
		//console.log('课程人数： '+item.courseNum);
		item.courseContent.forEach((item) => {
		console.log('\n' + 'title:  ' + item.chapterTitle + '\n');
		item.videos.forEach((item) => {

			console.log('【 ' + item.videoId + ' 】' + item.videoTitle);
		});
	});
	})
}


courseId.forEach((item)=>{
	courseArray.push(getPagesAsync(baseUrl+item));
})



Promise
	.all(courseArray)
	.then((allHtml)=>{

		allHtml.forEach((item)=>{
			filterChapter(item);
		})
		courseData.sort(function(a,b){
			return a.courseName <= b.courseName;
		})
		printData();
	})