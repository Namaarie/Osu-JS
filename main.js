var noteSprite;
var allNotes = [];

function preload(){
	//Loades note image
	noteSprite = loadImage("assets/hitcircle.png");
}
function setup() {
	createCanvas(800, 600);
	//Creates 10 notes
	for(i = 0; i < 10; i++){
		allNotes.push(new Note());
	}
}

function draw() {
	background("white");
	//Updates all current notes
	for(i = 0; i < allNotes.length; i++){
		allNotes[i].Render();
		allNotes[i].Update();
	}
}

//Note Object
function Note(){
	this.x = random(width);
	this.y = random(height);
	this.w = 25;
	this.h = 25;
	this.color = color(random(255),random(255),random(255));

	//Function to draw note
	this.Render = function(){
		//Changes image anchor to center
		imageMode(CENTER);
		//Tints note color
		tint(this.color);
		//Draws the note
		image(noteSprite, this.x,this.y,this.w,this.h);
	}

	//Function to detect if mouse is over note
	this.Update = function(){
		if(dist(mouseX,mouseY,this.x,this.y) < this.w/2){
			this.w = 50;
			this.h = 50;
		}else{
			this.w = 25;
			this.h = 25;
		}
	}
}
