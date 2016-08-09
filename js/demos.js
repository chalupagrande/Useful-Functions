/* CHEAT CODES

~~~~~~~~~~~~~~~~~~~~~~*/

cheatCode(['ArrowUp',
          'ArrowUp',
          'ArrowDown',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'ArrowLeft',
          'ArrowRight',
          'b',
          'a'], draw, 3000, correct, incorrect)

var fps = 1;
var animation, timeout;
//callback function when code is complete
function draw() {
    document.body.style.backgroundColor = 'hsl('+Math.floor(Math.random()*255)+', 50%, 50%)'
    timeout = setTimeout(function() {
      animation = requestAnimationFrame(draw);
    }, 1000 / fps);
}

var lis = Array.prototype.slice.call(document.querySelectorAll('.cheat > li'))
var count = 0

//function to run when you click a correct key
function correct(){
  lis[count].style.opacity = 0
  count+=1
}

//function to run when you click an incorrect key
function incorrect(){
  lis.forEach(function(el){
    el.style.opacity = 1
  })
  count = 0
  if(animation || timeout){
    window.cancelAnimationFrame(animation)
    window.clearTimeout(timeout)
    document.body.style.backgroundColor = 'white'
  }
}

/* CONVERT CODE

~~~~~~~~~~~~~~~~~~~~~~~~*/
convertCode()