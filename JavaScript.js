var canvas;
var ctx;
var squareSize = 20;
//var plainCourse = [1,2,3,4,5,6,1,2,3,4,5,6,2,1,4,3,6,5,2,4,1,6,3,5,4,2,6,1,5,3,4,6,2,5,1,3,6,4,5,2,3,1,6,5,4,3,2,1,5,6,3,4,1,2,5,3,6,1,4,2,3,5,1,6,2,4,3,1,5,2,6,4,1,3,2,5,4,6,1,3,5,2,6,4,3,1,2,5,4,6,3,2,1,4,5,6,2,3,4,1,6,5,2,4,3,6,1,5,4,2,6,3,5,1,4,6,2,5,3,1,6,4,5,2,1,3,6,5,4,1,2,3,5,6,1,4,3,2,5,1,6,3,4,2,1,5,3,6,2,4,1,5,6,3,4,2,5,1,3,6,2,4,5,3,1,2,6,4,3,5,2,1,4,6,3,2,5,4,1,6,2,3,4,5,6,1,2,4,3,6,5,1,4,2,6,3,1,5,4,6,2,1,3,5,6,4,1,2,5,3,6,1,4,5,2,3,1,6,5,4,3,2,1,6,4,5,2,3,6,1,5,4,3,2,6,5,1,3,4,2,5,6,3,1,2,4,5,3,6,2,1,4,3,5,2,6,4,1,3,2,5,4,6,1,2,3,4,5,1,6,2,4,3,1,5,6,4,2,1,3,6,5,4,1,2,6,3,5,1,4,6,2,5,3,1,4,2,6,3,5,4,1,6,2,5,3,4,6,1,5,2,3,6,4,5,1,3,2,6,5,4,3,1,2,5,6,3,4,2,1,5,3,6,2,4,1,3,5,2,6,1,4,3,2,5,1,6,4,2,3,1,5,4,6,2,1,3,4,5,6,1,2,4,3,6,5,1,2,3,4,5,6,1,2,3,4,5,6];
//
var songID = 0;
var plainCourse = songs[songID];


var bob = [];
var single = [];
var activeSquare = {x:0, y:0}
var timer = 0;
var offset = 0;
var activePart = 1;
var running = false;
var ending = false;
var arrayIndex=0;


//ui elements global variables
var slider;
var speed = 10/60;

var output;

console.log("started")
//pre load the page before accessing the HTML DOM elements
window.onload = function(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  slider = document.getElementById("speed");
  output = document.getElementById("text");
  sliderUpdate();

  draw();
}



/**
 * courseChange - This function will swap to a new course.
 * This will also call reset.
 * @param {number} id  - The id refers to the the songs.data
 * @return
 */
function courseChange(id){
  songID=id;
  plainCourse = songs[songID];
  methodReset();
}

/**
 * sliderUpdate - this sets the speed from the htm slider
 * @returns void
 */
function sliderUpdate(){
  output.innerHTML = slider.value;
  speed = slider.value/60
}


/**
 * the main draw loop
 * draws the grid and the current song if playing
 * refreshers at 60fps
 */
function draw(){
  ctx.fillStyle = "#f1f1f1";
  ctx.fillRect(0,0,400,400);

    for (y = 0; y < 6; y++) {
      for (x = 0; x < 6; x++) {
        ctx.fillStyle = "#ffffff";
        if(x==activeSquare.x && y==activeSquare.y){
          ctx.fillStyle = "#ffffaa";
          ctx.fillRect(x*squareSize, y*squareSize, squareSize, squareSize);
       
        }

        ctx.beginPath();
        //grid
        //ctx.rect(x*squareSize, y*squareSize, squareSize, squareSize);
        ctx.stroke();

        //text
        ctx.font = "18px Arial";

        //if the number in the box is equal to x it change its color
        if(plainCourse[(y*6 + x)+offset]==activePart){
          ctx.fillStyle = "#FF0000";
        }else{
          ctx.fillStyle = "#000000";
        }

        //if it equals undefined display end in console and changing ending variable
        if((plainCourse[(y*6 + x)+offset])==undefined){
          console.log("End");
          ending=true;
          
        }else{
        //positions the data within the grid
       // if(((y*6+x)+offset)<plainCourse.length){
         ctx.fillText(plainCourse[(y*6 + x)+offset],x*squareSize+5,y*squareSize+15);
         //ctx.fillText(arrayIndex, 200, 140);
         ctx.fillText(songNames[songID], 5, 140)
        }
        
    }
  
}




  //update, running speed
if(running==true){
  timer+=speed;
 
//active squares
  activeSquare.x = Math.floor(timer%6);
  activeSquare.y = Math.floor(timer/6);
  
  //moves grid
  offset = activeSquare.y * 6;
   if((activeSquare.y*6+ activeSquare.x)>plainCourse.length-2){
    console.log("done")
    
    methodStop();
  }
arrayIndex = (activeSquare.y*6 + activeSquare.x) 
 //console.log((activeSquare.y*6 + activeSquare.x));

}



if (y > 5){
  activeSquare.y = 0;
}



requestAnimationFrame(draw);
}





