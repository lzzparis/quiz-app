$(document).ready(function(){


var Question = {
	questionText: "default",
	answerOptions:[],
	correctAnswer:"",
	theirAnswer:"",
	score:0,
	storeAndCompare:function(input){
		this.theirAnswer = input;
		if(this.theirAnswer === this.correctAnswer){
			score=1;
		}
	}
}

var firstQ = Object.create(Question);
var secondQ = Object.create(Question);
var thirdQ = Object.create(Question);

firstQ.questionText = "banana";
firstQ.answerOptions= ["yellow","red","blue"];
secondQ.questionText = "apple";
secondQ.answerOptions= ["lksjdf;lajslgkjd;sj","lajksd;fjds;j;dsaj","laskjd;fjs;",";alskdjf;sjf"];
thirdQ.questionText = "the third question";
thirdQ.answerOptions= ["ta-da"];

var quiz = [];


quiz.push(firstQ);
quiz.push(secondQ);
quiz.push(thirdQ);

var questNum=0;
quiz.forEach(function (quest){
	var questID = "question-"+questNum; 
	$(".question-content").append("<ul id=\""+questID+"\">");
	$("#"+questID).append(
		"<li class=\"question prompt\">"+quest.questionText+"</li>");
	quest.answerOptions.forEach(function (a){
		$("#"+questID).append("<li class=\"question answer\">"+a+"</li>");
	})
	questNum++;
	// $(".question-content").append("</ul>");
});


});