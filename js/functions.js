/*  TOGGLE CLASS NAME

  arguments:
    el        -  node  - element to target
    className - string - class to change
~~~~~~~~~~~~~~~~~~~~~~~ */

function toggleClass(el, className){
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

    el.className = classes.join(' ');
  }
}

/* GET DOCUMENT HEIG
  returns entire scrollable area of the document
~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function getDocHeight() {
  var D = document;
  return Math.max(D.body.scrollHeight,
                  D.documentElement.scrollHeight,
                  D.body.offsetHeight,
                  D.documentElement.offsetHeight,
                  D.body.clientHeight,
                  D.documentElement.clientHeight);
}

function getDocWidth(){
  var D = document;
  return Math.max(D.body.scrollWidth,
                  D.documentElement.scrollWidth,
                  D.body.offsetWidth,
                  D.documentElement.offsetWidth,
                  D.body.clientWidth,
                  D.documentElement.clientWidth)
}

/*  SCROLL TO ANCHOR POSITION    smoothly scrolls to position. 500ms

  arguments:
    name of element to scroll to

  DEPENDS on getDocHeight()
~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function scrollToAnchor(link) {
    var chosenElement   = document.querySelector( link ),
        y               = window.scrollY + chosenElement.getBoundingClientRect().top,
        x               = window.scrollX + chosenElement.getBoundingClientRect().left;

        scrollToPosition(x,y)
};

function centerOnAnchor(link) {
    var chosenElement   = document.querySelector( link ),
        y               = chosenElement.getBoundingClientRect().top,
        x               = chosenElement.getBoundingClientRect().left,
        width           = chosenElement.getBoundingClientRect().width,
        height          = chosenElement.getBoundingClientRect().height,

        targetX         = window.scrollX + (x+width/2)-(window.innerWidth/2),
        targetY         = window.scrollY + (y+height/2)-(window.innerHeight/2);

        console.log(targetX,targetY)
        scrollToPosition(targetX, targetY)
};


function scrollToPosition(x,y){
  var duration         = 500,
      mili             = 15,
      scrollY          = window.scrollY,
      scrollX          = window.scrollX,
      scrollCount      = 0,
      scrollStep       = Math.PI / (duration / mili),
      scrollXDirection = x > scrollX ? 1 : -1,
      scrollYDirection = y > scrollY ? 1 : -1,
      cosParameterX    = Math.abs(x - scrollX) / 2,
      cosParameterY    = Math.abs(y - scrollY) / 2,
      docHeight        = getDocHeight(),
      docWidth         = getDocWidth(),
      marginOfErrorY   = Math.ceil( cosParameterY - cosParameterY * Math.cos(1 * scrollStep) ),
      marginOfErrorX   = Math.ceil( cosParameterX - cosParameterX * Math.cos(1 * scrollStep) ),
      scrollMarginX,
      scrollMarginY,
      reachedEdgeX,
      reachedEdgeY;


  var scrollInterval = setInterval(function () {
      if(scrollYDirection > 0){
        reachedEdgeY = window.scrollY + window.innerHeight >= docHeight - 1
      } else {
        reachedEdgeY = window.scrollY < 1
      }

      if(scrollXDirection > 0){
        reachedEdgeX = window.scrollX + window.innerWidth >= docWidth - 1
      } else {
        reachedEdgeX = window.scrollX < 1
      }

      if ((Math.abs(y - window.scrollY) > marginOfErrorY && !reachedEdgeY) ||
          (Math.abs(x - window.scrollX) > marginOfErrorX && !reachedEdgeX)){
            scrollCount += 1;
            scrollMarginY = cosParameterY - cosParameterY * Math.cos(scrollCount * scrollStep);
            scrollMarginX = cosParameterX - cosParameterX * Math.cos(scrollCount * scrollStep);
            window.scrollTo(scrollX + scrollMarginX * scrollXDirection,
                            scrollY + scrollMarginY * scrollYDirection);
      } else {
          clearInterval(scrollInterval);
      }
  }, mili);
}


/*  FORMAT DATE

  Pass in a javascript date object and get a formated Date - Time
  DEPNENDS on formatTime()
~~~~~~~~~~~~~~~~~~~ */
function formatDate(date) {
  return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " - " + formatTime(date.getHours(), date.getMinutes());
}

/*  FORMAT TIME
  Pass in hours, and minutes to get a formated string of the date.
~~~~~~~~~~~~~~~~~~~ */
function formatTime(hour, minute) {
  var isPM = false;
  if (hour > 12) {
    hour %= 12;
    isPM = true;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  var suffix = isPM ? "pm" : "am";
  return hour + ":" + minute + suffix;
}

/*  REMOVE SPACES - MAKE LOWERCASE

  this function is good for converting readable strings into classnames.
  Pass in a string, it returns a string with _ instead of " " and makes it lowercase

~~~~~~~~~~~~~~~~~~~ */

function removeSpaceMakeLowercase(s) {
  return s.split(' ').join('_').toLowerCase();
}

/*    BINARY SEARCH ALGORITHM

    Searches a sorted array of values and finds the target element.

    array must be sorted low -> high
    compareFunc(a,b) => {
        if a == b return 0
        if a > b return +1
        if a < b return -1
    }

    returns the INDEX of the element or -1
*/
function binarySearch(array, target, compareFunc, min, max){
  if(!Array.isArray(array) || !target) throw Error("Arguments were not defined properly")
  compareFunc = compareFunc || function(a,b){ return a - b  }
  min = min || 0
  max = max == 0 || max ? max : array.length - 1
  var half = min + Math.floor((max - min) /2)

  if((min > max || max < min)){
    return -1
  }else{
    var result = compareFunc(array[half], target)
    if(result == 0){
      return half
    //move to the right
    }else if( result < 0){
      return binarySearch(array, target, compareFunc, half+1, max)

    //move to the left
    }else if( result > 0){
      return binarySearch(array, target, compareFunc, min, half-1)
    }
  }
}
/*  HEX TO RGB

  Converts a HEX string to an object of r,g,b values
~~~~~~~~~~~~~~~~~~ */

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/*  RGB TO LUMINANCE
  arguments:
    obj =  {r: num, g: num, b: num}

  Returns the Luminance value of a color.
~~~~~~~~~~~~~~~~~~~~*/
function rgbToLuminance(obj){
  return (0.2126*obj.r + 0.7152*obj.g + 0.0722*obj.b)
}

/*  FIND TEXT COLOR
  Tells you whether the text color should be LIGHT or DARK due to accessibility standards.

  DEPENDS on:
    hexToRgb()
    rgbToLuminance()

  Returns the Luminance value of a color.
  returns
    0 = DARK
    1 = LIGHT
~~~~~~~~~~~~~~~~~~~~*/

function findTextColor(hex){
  var rgb = hexToRGB(hex)
  var l = rgbToLuminance(rgb)
  if(l > 255/2) return 0
  return 1
}

/*  RANDOM NUM

  returns a Random number between two values.
    use the round option if you want it to round that value. TRUE or FALSE
~~~~~~~~~~~~~~~~~*/
function randomNum(min,max, round){
  if(min == undefined || max == undefined) return Math.random()
  var result = Math.random() * (max - min) + min;
  return round ? Math.round(result) : result
}