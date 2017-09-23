var note;

function setup() {
	createCanvas(800, 600);
	note = new Note();
}

function draw() {
	background("white");
	noStroke();
	fill(note.color);
	ellipse(note.x,note.y,note.w,note.h);

	if(dist(mouseX,mouseY,note.x,note.y) < 25){
		note.w = 50;
		note.h = 50;
	}else{
		note.w = 25;
		note.h = 25;
	}
}

//Note Object
function Note(){
	this.x = width/2;
	this.y = height/2;
	this.w = 25;
	this.h = 25;
	this.color = color(255,125,125);
}
