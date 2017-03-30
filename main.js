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
	scorenumber = ".score" + i.toString()
	distance = Math.sqrt(Math.pow((bulletCenterarray[i-1].top - targetCenterarray[i-1].top),2)+Math.pow((bulletCenterarray[i-1].left - targetCenterarray[i-1].left),2));
	$(scorenumber).css("display","none");

	if (distance<15){
		//$(scorenumber).css("left", $(scorenumber).css("left")-40);
		$(scorenumber).append("<p>BULLSEYE</p>");
	}else{
		distance = parseInt((1000/distance));
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

	adjustoffset(".title", bulletnumber, leftadjustbullet, topadjustbullet);
}


function targetArraymake(i){
	targetnumber = ".target" + i.toString();
	scorenumber = ".score" + i.toString();
	adjustoffset(".title", targetnumber, -.9 + 0.25*i, 0.9);
	adjustoffset(targetnumber, scorenumber, 0.03, -.6);
}

//display change functions

function bulletFire(i){
	var gunshotsound = new Audio('Gunshot-sound-effect.wav');
	makeCenterarrays(i);

	setTimeout(function(){
		bulletnumber = ".bullet" + i.toString();
		scorenumber = ".score" + i.toString();
		$(bulletnumber).css("display", "block");
		$(scorenumber).css("display","block");
		gunshotsound.play();
		//debugger;
	},200*i);
}


$(function(){

	function main(){

		//onclick events
		$(".fa-bars").on("click",function(){
			$(".container").css("display", "inline-block");
			$(".container").addClass('animated slideInLeft');
		});

		//function calls

		for(var i=1; i<10; i++){
			targetArraymake(i);
		}

		for(var i=1; i<10; i++){
			bulletArraymake(i);
		}

		for(var i=1; i<10; i++){
			bulletFire(i);
		}

	}

	main();

})


