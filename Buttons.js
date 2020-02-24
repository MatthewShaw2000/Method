var running = false;


/**
 * partChange - changes the highlighted number
 * resets the timer to 0
 * resets the offset to 0
 */
function partChange(){
    activePart = document.getElementById('part').value;
    timer = 0;
    offset = 0;
  }

  /**
   * methodPlay - starts playing the method 
   */
function methodPlay(){
    running = true;
  }
  
  /**
   * methodStop - stops playing the method
   */
  function methodStop(){
    running = false;
  }
  
  /**
   * methodReset - resets the method back to beginning
   * resets activesquare to 0
   * resets the timer to 0
   * resets the offset to 0
   * plays the function methodStop
   */
  function methodReset(){
    activeSquare.y = 0;
    activeSquare.x = 0;
    timer = 0;
    offset = 0;
    methodStop();
  }
  