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
	nextSlide(this);
});

//next question
$(".answer").click(function(){
	//score if not out of questions 
	if(whichQ < quiz.length){
		quiz[whichQ].storeAndCompare(this.id);
	}
	//if last question, update totalScore scorecard
	if(whichQ===quiz.length-1) {
		$("#scorecard>h3").text(totalScore+"/"+quiz.length);
	}
	//move question offscreen
	$(".carousel-item").each(function(){
		if($(this).offset().left <0) {
			$(this).css("left","150%");
		}
	});
	//move to nextslide
	nextSlide(this);


	//increment question counter
	whichQ++;
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

	//cycle through
	$(this).parents(".carousel-item").animate({left:'-50%'},500);
	//move first question onscreen
	$(this).parents(".carousel-item").prevAll().last().animate({left:'50%'},500);
	// $(this).parents(".carousel-item").prevAll().animate({left:'150%'},500);

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


function drawQuiz() {

	$(".container").append("<section id=\"intro\" class=\"carousel-item card\" >"+
		"<h1 class=\"intro-title\">know your fruit!</h1>"+
		"<button class=\"intro-start\">start quiz</button>"+
		"</section>");

	quiz.forEach(function (quest, q){
		var questID = "question-"+q; 
		$(".container").append("<ul id=\""+questID+"\" class=\"carousel-item\">");
		$("#"+questID).append(
			"<li class=\"prompt\">"+quest.questionText+"</li>");
		quest.answerOptions.forEach(function (a){
			$("#"+questID).append("<li id=\""+a+"\" class=\"answer\">"+a+"</li>");
			console.log("q is "+q);
		})
	});
	$(".container").append("<section id=\"scorecard\" class=\"carousel-item card\">"+
		"<h2>you scored:</h2>"+
		"<h3 class=\"scorecard-score\">0</h3>"+
		"<button class=\"scorecard-restart\">play again?</button>"+
		"</section>");
}

function nextSlide(clicked){
	$(clicked).parents(".carousel-item").animate({left:'-50%'},500);
	//move first question onscreen
	$(clicked).parents(".carousel-item").next().animate({left:'50%'},500);

}

function loadQuestions() {

var firstQ = Object.create(Question);
firstQ.questionText = "vitus labrusca";
firstQ.answerOptions= ["banana","grape","pear","peach"];
firstQ.correctAnswer= firstQ.answerOptions[1];
quiz.push(firstQ);

var secondQ = Object.create(Question);
secondQ.questionText = "punica granatum";
secondQ.answerOptions= ["pomegranate","blueberry","pear","orange"];
secondQ.correctAnswer= secondQ.answerOptions[0];
quiz.push(secondQ);

var thirdQ = Object.create(Question);
thirdQ.questionText = "citrus x limon";
thirdQ.answerOptions= ["orange","grapefruit","lemon","lime"];
thirdQ.correctAnswer= thirdQ.answerOptions[2];
quiz.push(thirdQ);

var fourthQ = Object.create(Question);
fourthQ.questionText = "prunus domestica";
fourthQ.answerOptions= ["kiwi","plum","banana","peach"];
fourthQ.correctAnswer= fourthQ.answerOptions[1];
quiz.push(fourthQ);

var fifthQ = Object.create(Question);
fifthQ.questionText = "fragaria x ananassa";
fifthQ.answerOptions= ["banana","kumquat","watermelon","strawberry"];
fifthQ.correctAnswer= fifthQ.answerOptions[3];
quiz.push(fifthQ);

var sixthQ = Object.create(Question);
sixthQ.questionText = "ficus carica";
sixthQ.answerOptions= ["fig","kumquat","raspberry","date"];
sixthQ.correctAnswer= sixthQ.answerOptions[0];
quiz.push(sixthQ);


}
