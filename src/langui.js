var ctx, color = "#000", top_offset=44;
$(document).ready(function () {
	// setup a new canvas for drawing wait for device init
  //setTimeout(function(){newCanvas();}, 10);
  newCanvas();
	// reset palette selection (css) and select the clicked color for canvas strokeStyle
	$(".palette").click(function(){
		$(".palette").css("border-color", "#777");
		$(".palette").css("border-style", "solid");
		$(this).css("border-color", "#fff");
		$(this).css("border-style", "dashed");
		color = $(this).css("background-color");
		ctx.beginPath();
		ctx.strokeStyle = color;
	});

	// link the new button with newCanvas() function
	$("#new").click(function(){newCanvas();});
});


// function to setup a new canvas for drawing
function newCanvas(){
	//define and resize canvas
  $("#content").height($(window).height()-90);
  var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-90)+'"></canvas>';
	$("#content").html(canvas);
  // setup canvas
	ctx=document.getElementById("canvas").getContext("2d");
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;
	$("#canvas").drawMouse();
}

// prototype to	start drawing on mouse using canvas moveTo and lineTo
$.fn.drawMouse = function() {
	var clicked = false;
	var start = function(e) {
		clicked = true;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-top_offset;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		if(clicked){
			x = e.pageX;
			y = e.pageY-top_offset;
			ctx.lineTo(x,y);
			ctx.stroke();
		}
	};
	var stop = function(e) {
		clicked = false;
	};
	$(this).on("mousedown", start);
	$(this).on("mousemove", move);
	$(window).on("mouseup", stop);
};
