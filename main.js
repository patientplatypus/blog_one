//variable declarations

var bulletCenterarray = [];
var targetCenterarray = [];

var bulletnumber = "";
var bulletlast = "";
var targetnumber = "";
var scorenumber = "";
var bulletcenter = {};
var distance = 0.0;
var bulletx = 0;
var bullety = 0;
var targetx = 0;
var targety = 0;
var randomnumber1 = 0.0;
var randomnumber2 = 0.0;
var randomnumber3 = 0.0;
var randomnumber4 = 0.0;
var shootership = $(".shootership");
var restingship = $(".restingship");
var startbutton = $(".startbutton");
var computercannon = $(".computercannon");
var scoreboard = $(".scoreboard");
var title = ".title"
var turn = $(".turn");
var scoretotal = 0;
var opacityvar = 1.0;

//utility function

function adjustoffset(base, adjusted, leftadjust, topadjust){

	$(adjusted).offset(function(){
		newPos = new Object();
		var target = $(base).offset();
		newPos.left = target.left + leftadjust*($(base).width());
		newPos.top = target.top + topadjust*($(base).height());
		//console.log(adjusted, " left ", $(adjusted).offset().left, " top ", $(adjusted).offset().top);
		return newPos;
	});

	
	//console.log("adjusted after offset: ",$(adjusted).offset());
}

function calculateScore(i){
	console.log("i", i);
	console.log("bulletlength ", bulletCenterarray.length);
	console.log("targetCenterarray ", targetCenterarray.length);
	console.log("bullets ", bulletCenterarray[i-1]);
	console.log("targets ", targetCenterarray[i-1]);
	scorenumber = ".score" + i.toString();
	distance = Math.sqrt(Math.pow((bulletCenterarray[i-1].top - targetCenterarray[i-1].top),2)+Math.pow((bulletCenterarray[i-1].left - targetCenterarray[i-1].left),2));
	$(scorenumber).css("display","none");

	if (distance<15){
		//$(scorenumber).css("left", $(scorenumber).css("left")-40);
		$(scorenumber).append("<p>BULLSEYE</p>");
		//tallyScore(100,"COMPUTER");
	}else{
		distance = parseInt((1000/distance));
		//tallyScore(distance, "COMPUTER");
		$(scorenumber).append("<p>"+distance+"</p>")
	}
	//debugger;
	console.log("distance ",distance);

}

function makeCenterarrays(i){

	bulletnumber = ".bullet" + i.toString();
	targetnumber = ".target" + i.toString();

	bulletCenterarray.push({
		"top":  parseFloat($(bulletnumber).css("top")) + 25,
		"left": parseFloat($(bulletnumber).css("left")) + 25
	});

	targetCenterarray.push({
		"top":  parseFloat($(targetnumber).css("top")) + 100,
		"left": parseFloat($(targetnumber).css("left")) + 100
	});

	calculateScore(i);

}

//array functions	

function bulletArraymake(i){
	bulletnumber = ".bullet" + i.toString();
	randomnumber1 = Math.random();
	randomnumber2 = -Math.random();
	randomnumber3 = Math.random();
	randomnumber4 = -Math.random();
	var leftadjustbullet =  -.8+(.25)*i + .04*(randomnumber1+randomnumber2);
	var topadjustbullet  = 0.95+.09*(randomnumber3+randomnumber4)

	adjustoffset(title, bulletnumber, leftadjustbullet, topadjustbullet);
}


function targetArraymake(i){
	$(".target").css("display","block");
	targetnumber = ".target" + i.toString();
	scorenumber = ".score" + i.toString();
	adjustoffset(title, targetnumber, -.9 + 0.25*i, 0.9);
	adjustoffset(targetnumber, scorenumber, 0.03, -.6);
}

//display change functions

function bulletFire(i){
	var gunshotsound = new Audio('Gunshot-sound-effect.wav');
	makeCenterarrays(i);
	computershoot();

	setTimeout(function(){
		bulletnumber = ".bullet" + i.toString();
		scorenumber = ".score" + i.toString();
		$(bulletnumber).css("display", "block");
		$(scorenumber).css("display","block");

		if ($(scorenumber).find("p").text()==="BULLSEYE"){
			tallyScore(100,"COMPUTER");
		}else{
			tallyScore(parseInt($(scorenumber).find("p").text()),"COMPUTER");
		}


		gunshotsound.play();
		//debugger;
	},500*i);
}

/*
function shipOverlap(){

	adjustoffset(restingship, shootership,0.05,-0.85);
}
*/

function shipFollowmouse(){
	restingship.css("display", "block");
	$(document).mousemove(function(e){
    	restingship.css({left:e.pageX-400, top:e.pageY-150});
    	shootership.css({left:e.pageX-365, top:e.pageY-860});
    	//adjustoffset(restingship, shootership,0.05,-0.85);
	});
}

function buttonsAlign(){
	adjustoffset(title,startbutton,0.25,1.5);
	adjustoffset(title,turn,0.25,1.7);
}

function startButtonanimation(){
	startbutton.css("display","none");
}

function turnButtonTimeout(i){
	setTimeout(function(){
		opacityvar = opacityvar - 0.2;
		$(turn).css("opacity", opacityvar.toString());
	},500*i);
}


function turnButton(turndisplay){
	$(turn).html("<p>"+turndisplay+"</p>");
	opacityvar = 1.0;
	//$(turn).css("display", "block");
	$(turn).css("opacity", opacityvar.toString());

	for(var i = 0; i<5; i++){
		turnButtonTimeout(i);
	}
	//$(turn).css("display", "none");
}

function computershoot(){
	computercannon.css("display", "block");
	adjustoffset(".target1", computercannon,1,3);
	computercannon.animate({left: '2500px'}, 4000, 'linear');
	setTimeout(function(){
		computercannon.css("display","none");
	},4500);
	
}

function scoreboardAdjust(){
	adjustoffset(".title", scoreboard, 1.2, 0.4);
}

function tallyScore(addscore, turndisplay){
	scoretotal = scoretotal + addscore;
	console.log("scoretotal: ", scoretotal);
	console.log("addscore: ", addscore);
	scoreboard.html("<p>"+ turndisplay + " SCORE: " + scoretotal + "</p>");
}

function animateScore(){}


function scoreHide(){
	for (var i = 0; i<10; i++){
		scorenumber = ".score" + i.toString();
		$(scorenumber).css("display","none");
	}
};

function bulletHide(){
	for (var i = 0; i<10; i++){
		bulletnumber = ".bullet" + i.toString();
		$(bulletnumber).css("display","none");
	}
};


$(function(){

	function main(){



		//onclick events
		$(".fa-bars").on("click",function(){
			$(".container").css("display", "inline-block");
			$(".container").addClass('animated slideInLeft');
		});
		
		buttonsAlign();

		$(".startbutton").on("click",function(){

			startButtonanimation();

			turnButton("COMPUTERS TURN");

			setTimeout(function(){
			//function calls
				for(var i=1; i<10; i++){
					targetArraymake(i);
				}

				scoreboardAdjust();

				tallyScore(0,"COMPUTER");

				for(var i=1; i<10; i++){
					bulletArraymake(i);
				}

				for(var i=1; i<10; i++){
					bulletFire(i);
				}
				//console.log("score total from main: ", scoretotal);
				//scoreboard.html("<p> COMPUTER SCORE: " + scoretotal + "</p>");
				//debugger;

				computershoot();


				animateScore();


			},2500);


			setTimeout(function(){

				scoreHide();

				bulletHide();

				turnButton("PLAYERS TURN");


				setTimeout(function(){
					shipFollowmouse();

					$(restingship).on("click",function(){
						$(shootership).css("display","block");
						setTimeout(function(){
							$(shootership).css("display","none");
						},500);
					});
				},2500);


			}, 15000)
			


		});

	}

	main();

})


