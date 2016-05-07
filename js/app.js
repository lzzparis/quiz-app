//this has to be outside document ready so the click events listeners 
//can access after docready executes
var quiz = []; 
var totalScore = 0;
var whichQ = 0;

$(document).ready(function(){


//init quiz
loadQuestions();
drawQuiz();



//display first question
$(".intro-start").click(function(){
	//move intro offscreen
	$(this).parents(".carousel-item").animate({left:'-50%'},500);
	//move first question onscreen
	$(this).parents(".carousel-item").next().animate({left:'50%'},500);
});

//next question
$("li").click(function(){
	//score if not out of questions 
	if(whichQ < quiz.length){
		quiz[whichQ].storeAndCompare(this.id);
	}
	//if last question, update totalScore scorecard
	if(whichQ===quiz.length-1) {
		$(".scorecard>h3").text(totalScore);
		console.log("finished quiz");
	}
	//move question offscreen
	//?? - Why do i need to use $(this) here and not for this.id??
	$(this).parents(".carousel-item").animate({left:'-50%'},500);
	//move next onscreen
	$(this).parents(".carousel-item").next().animate({left:'50%'},500);
	//increment question counter
	whichQ++;
	console.log("ts"+totalScore);
});

//restart game
$(".scorecard-restart").click(function(){

	totalScore=0;
	whichQ=0;
	quiz.forEach(function(quest){
		quest.score=0;
		quest.theirAnswer="";
	});
	$(".scorecard>h3").text(totalScore);

	//rewind
	$(this).parents(".carousel-item").prevAll().animate({left:'150%'},500);

});



});


var Question = {
	questionText: "default",
	answerOptions:[],
	correctAnswer:"",
	theirAnswer:"",
	score:0,
	storeAndCompare:function(input){
		this.theirAnswer = input;
		if(this.theirAnswer === this.correctAnswer){
			this.score=1;
			totalScore++;
		}
	}
}

function loadQuestions() {

var firstQ = Object.create(Question);
var secondQ = Object.create(Question);
var thirdQ = Object.create(Question);

firstQ.questionText = "banana";
firstQ.answerOptions= ["yellow","red","blue"];
firstQ.correctAnswer= "yellow";
secondQ.questionText = "apple";
secondQ.answerOptions= ["green","purple","blue","black"];
secondQ.correctAnswer= "green";
thirdQ.questionText = "the third question";
thirdQ.answerOptions= ["ta-da"];



quiz.push(firstQ);
quiz.push(secondQ);
quiz.push(thirdQ);

}

function drawQuiz() {

	$(".container").append("<section id=\"intro\" class=\"carousel-item\" >"+
		"<h1 class=\"intro-title\">know your fruit!</h1>"+
		"<button class=\"intro-start\">start quiz</button>"+
		"</section>");

	quiz.forEach(function (quest, q){
		var questID = "question-"+q; 
		$(".container").append("<ul id=\""+questID+"\" class=\"carousel-item\">");
		$("#"+questID).append(
			"<li class=\"question prompt\">"+quest.questionText+"</li>");
		quest.answerOptions.forEach(function (a){
			$("#"+questID).append("<li id=\""+a+"\" class=\"question answer\">"+a+"</li>");
			console.log("q is "+q);
		})
	});
	$(".container").append("<section id=\"scorecard\" class=\"carousel-item\">"+
		"<h2>you scored:</h2>"+
		"<h3 class=\"scorecard-score\">0</h3>"+
		"<button class=\"scorecard-restart\">play again?</button>"+
		"</section>");
}