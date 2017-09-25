//Objects
var noteSprite;
var cursor;
var allNotes = [];

//values
var cursorSize;

function preload(){
	//Loads images;
	noteSprite = loadImage("assets/hitcircle.png");
	cursor = loadImage("assets/cursor.png");
}
function setup() {
	createCanvas(1280, 720);
	frameRate(120);
	noCursor();
	cursorSize = 100;

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
	//Updates cursor
	UpdateCursor();
}

//Changes cursor to custom cursor
function UpdateCursor(){
	tint(255);
	imageMode(CENTER);
	image(cursor,mouseX,mouseY,cursorSize,cursorSize);
}

//Note Object
function Note(){
	this.x = random(width);
	this.y = random(height);
	this.w = 25;
	this.h = 25;
	this.color = color(random(255),random(255),random(255));
	this.beenClicked = false;

	//Function to draw note
	this.Render = function(){
		//Changes image anchor to center
		imageMode(CENTER);
		//Tints note color
		tint(this.color);
		//Draws the note
		if(this.beenClicked == false){
			image(noteSprite, this.x,this.y,this.w,this.h);
		}
	}

	//Updates 60 times per second
	this.Update = function(){

	}

	//Check if mouse is over circle
	this.CheckDistance = function(){
		if(dist(mouseX,mouseY,this.x,this.y) < this.w/2){
			return true;
		}else{
			return false;
		}
	}

	//Change circle to hit
	this.Hit = function(){
		this.beenClicked = true;
		for(i = 0; i < allNotes.length; i++){
			if(allNotes[i].beenClicked == true){
				allNotes[i] = new Note();
			}
		}
	}
}

function mousePressed(){
	for(i = 0; i < allNotes.length; i++){
		if(allNotes[i].CheckDistance() == true){
			allNotes[i].Hit();
		}
	}
}
