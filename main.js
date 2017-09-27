//Objects
var noteRing;
var cursor;
var approachCircle;
var allNotes = [];

//values
var cursorSize;
var noteCreation;

function preload(){
	//Loads images;
	noteRing = loadImage("assets/hitcirclering.png")
	approachCircle = loadImage("assets/approachcircle.png");
	cursor = loadImage("assets/cursor.png");
}

function setup() {
	createCanvas(innerWidth, innerHeight);
	frameRate(120);
	noCursor();
	cursorSize = 100;
	noteCreation = 10;

	//Creates notes
	for(i = 0; i < 1; i++){
		allNotes.push(new Note());
	}
}

function draw() {
	if(width != innerWidth || height != innerHeight){
		resizeCanvas(innerWidth, innerHeight);
	}
	background(50);
	//Updates all current notes
	for(i = 0; i < allNotes.length; i++){
		allNotes[i].Render();
		allNotes[i].Update();
		if(allNotes[i+1] != null){
			if(allNotes[i].destroyed == false && allNotes[i+1].destroyed == false){
				line(allNotes[i].x, allNotes[i].y, allNotes[i+1].x, allNotes[i+1].y);
			}
		}
	}
	//Updates cursor
	UpdateCursor();

	if(noteCreation >= 40){
		noteCreation = 0;
		allNotes.push(new Note());
	}
	noteCreation++;
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
	this.w = 100;
	this.h = 100;
	this.approachCircle = 200;
	this.color = color(random(255),random(255),random(255));
	this.beenClicked = false;
	this.destroyed = false;
	this.scoreTimer = 0;
	this.noteSprite = loadImage("assets/hitcircle.png");

	//Function to draw note
	this.Render = function(){
		//Changes image anchor to center
		imageMode(CENTER);
		//Draws the note
		if(this.beenClicked == false){
			//Tints note color
			tint(this.color);
			image(this.noteSprite, this.x,this.y,this.w,this.h);
			noTint();
			image(noteRing, this.x,this.y,this.w + 0.5,this.h + 0.5);
			image(approachCircle, this.x, this.y, this.approachCircle, this.approachCircle);
		}else if(this.destroyed == true){
			if(this.scoreTimer <= 60){

				image(this.noteSprite, this.x,this.y,this.w * 2,this.h * 2);
			}
		}
	}

	//Updates 60 times per second
	this.Update = function(){
		this.approachCircle --;
		if(this.destroyed == true){
			this.scoreTimer++;
		}

		if(this.approachCircle <= this.w){
			this.Hit();
		}
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
		this.HitAccuracy();

		//allNotes[i] = new Note();
	}

	this.HitAccuracy = function(){
		if(this.destroyed == false){
			if(this.approachCircle <= 110 && this.approachCircle > 100){
				//300
				this.noteSprite = loadImage("assets/hit300.png");
				this.destroyed = true;
				return;
			}else if(this.approachCircle <= 130 && this.approachCircle > 110){
				//100
				this.noteSprite = loadImage("assets/hit100.png");
				this.destroyed = true;
				return;
			}else if(this.approachCircle <= 150 && this.approachCircle > 130){
				//50
				this.noteSprite = loadImage("assets/hit50.png");
				this.destroyed = true;
				return;
			}else{
				//Miss
				this.noteSprite = loadImage("assets/hit0.png");
				this.destroyed = true;
				return;
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
