//this has to be outside document ready so the click events listeners 
//can access after docready executes
var quiz = []; 
var totalScore = 0;
var whichQ = 0;

$(document).ready(function(){


//init quiz
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
			totalScore++;
		}
	}
}

var firstQ = Object.create(Question);
var secondQ = Object.create(Question);
var thirdQ = Object.create(Question);

firstQ.questionText = "banana";
firstQ.answerOptions= ["yellow","red","blue"];
firstQ.correctAnswer= "blue";
secondQ.questionText = "apple";
secondQ.answerOptions= ["lksjdf;lajslgkjd;sj","lajksd;fjds;j;dsaj","laskjd;fjs;",";alskdjf;sjf"];
thirdQ.questionText = "the third question";
thirdQ.answerOptions= ["ta-da"];



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
		$("#"+questID).append("<li id=\""+a+"\"class=\"question answer\">"+a+"</li>");
	})
});

//display first question
$(".intro-start").click(function(){
	//move intro offscreen
	//move first question onscreen
});

//next question
$("li").click(function(){
	//score
	quiz[whichQ].storeAndCompare(this.id);
	//if last question, update totalScore scorecard
	//move question offscreen
	//move next onscreen
	//increment question counter
	// whichQ++;
	console.log("ts"+totalScore);
});

//restart game
$(".scorecard-restart").click(function(){

});



});

