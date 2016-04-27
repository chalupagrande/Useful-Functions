/*
  TOGGLE CLASS NAME

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

/*
  GET DOCUMENT HEIGHT

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


/*
  SCROLL TO ANCHOR POSITION
    smoothly scrolls to position. 500ms

  arguments:
    name of element to scroll to

  DEPENDS on getDocHeight()
~~~~~~~~~~~~~~~~~~~~~~~~~~ */
var scrollToAnchor = function(link) {
    var chosenElement   = document.querySelector( link ),
        getBoundsTop    = chosenElement.getBoundingClientRect().top,
        duration        = 500,
        mili            = 15,
        scrollPosition  = window.scrollY,
        scrollTarget    = scrollPosition + getBoundsTop,
        scrollCount     = 0,
        scrollStep      = Math.PI / (duration / mili),
        scrollDirection = scrollTarget > scrollPosition ? 1 : -1,
        cosParameter    = Math.abs(scrollTarget - scrollPosition) / 2,
        docHeight       = getDocHeight(),
        marginOfError   = Math.ceil( cosParameter - cosParameter * Math.cos(1 * scrollStep) ),
        scrollMargin;


    var scrollInterval = setInterval(function () {
        var reachedEdge = scrollDirection > 0 ? window.scrollY + window.innerHeight >= docHeight - 1 : window.scrollY < 1;

        if (Math.abs(scrollTarget - window.scrollY) > marginOfError && !reachedEdge) {
            scrollCount += 1;
            scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
            window.scrollTo(0, scrollPosition + scrollMargin * scrollDirection);
        } else {
            clearInterval(scrollInterval);
        }
    }, mili);
};

/*
  FORMAT DATE

  Pass in a javascript date object and get a formated Date - Time
  DEPNENDS on formatTime()
~~~~~~~~~~~~~~~~~~~ */
function formatDate(date) {
  return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " - " + formatTime(date.getHours(), date.getMinutes());
}

/*
  FORMAT TIME
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

/*
  REMOVE SPACES - MAKE LOWERCASE

  this function is good for converting readable strings into classnames.
  Pass in a string, it returns a string with _ instead of " " and makes it lowercase

~~~~~~~~~~~~~~~~~~~ */

function removeSpaceMakeLowercase(s) {
  return s.split(' ').join('_').toLowerCase();
}

/*
    BINARY SEARCH ALGORITHM

    Searches a sorted array of values and finds the target element.

    array must be sorted low -> high
    compareFunc(a,b) => {
        if a == b return 0
        if a > b return +1
        if a < b return -1
    }
*/
function binarySearch(array = [], target, compareFunc, min, max){
  compareFunc = compareFunc || function(a,b){ return a == b ? 0 : a - b  }
  min = min || 0
  max = max == 0 || max ? max : array.length - 1

  // if(compareFunc(array[0] ,target) < 0 || compareFunc(array[array.length], target) > 0){
  //   return null
  // }
  if(min >= max && compareFunc(array[max], target) != 0){
    return null
  }else{
    var half = min + Math.floor((max - min) /2)
    var result = compareFunc(array[half], target)
    if(result == 0){
      return array[half]

    }else if( result < 0){
      return binarySearch(array, target, compareFunc, half+1, max)

    }else if( result > 0){
      return binarySearch(array, target, compareFunc, min, half-1)

    }
  }
}
/*
  HEX TO RGB

  Converts a HEX string to an object of r,g,b values
~~~~~~~~~~~~~~~~~~ */

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/*
  RGB TO LUMINANCE
  arguments:
    obj =  {r: num, g: num, b: num}

  Returns the Luminance value of a color.
~~~~~~~~~~~~~~~~~~~~*/
function rgbToLuminance(obj){
  return (0.2126*obj.r + 0.7152*obj.g + 0.0722*obj.b)
}

/*
  FIND TEXT COLOR
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
  var rgb = hexToRgb(hex)
  var l = rgbToLuminance(rgb)
  if(l > 255/2) return 0
  return 1
}

/*
  RANDOM NUM

  returns a Random number between two values.
    use the round option if you want it to round that value. TRUE or FALSE
~~~~~~~~~~~~~~~~~*/

function randomNum(min,max, round){
  if(min == undefined || max == undefined) return Math.random()
  var result = Math.random() * (max - min) + min;
  return round ? Math.round(result) : result
}