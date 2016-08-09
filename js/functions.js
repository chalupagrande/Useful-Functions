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

/*  MAKE ARRAY

  Turns Array LIKE objects into actual arrays.
    such as `arguments` or `children`
~~~~~~~~~~~~~~~~~*/
function makeArray(arraLikeObject){
  return Array.prototype.slice.call(arraLikeObject)
}

/*  HAS CLASS

  Returns true if an element has a class
~~~~~~~~~~~~~~~~~*/
function hasClass(el, className){
  if (el.classList)
    return el.classList.contains(className);
  else{
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}

/* Slide & Get Toggle Slide Function

arguments:
  element = DOM Node
  direction = -1 (slides left) || 1 (slides right)
  duration = number of Miliseconds
  callback = function to run when slide is finished

getToggleSlideFunc returns a function that can then be called to toggle
  a slide back and forth. your original direction will be bound.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function slide(element, direction, duration =500, callback){
  var durationInSecs = duration/1000 +'s'
  var width = element.getBoundingClientRect().width
  element.style.transition = 'transforwqm '+ durationInSecs
  element.style.transform = 'translate('+(width*direction)+'px ,0)'
  setTimeout(callback, duration)
}

function getToggleSlideFunc(element, direction, duration, callback){
  var originalDirection = direction
  return function(){
    slide.apply(this, [element, direction, duration, callback])
    direction = direction ? 0 : originalDirection
  }
}


/* Fire Event

arguments:
  node: DOM element
  eventName: HTML event name

fires an event on the node.
NOTE: copied from stack overflow here:
   http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function fireEvent(node, eventName) {
    // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
    var doc;
    if (node.ownerDocument) {
        doc = node.ownerDocument;
    } else if (node.nodeType == 9){
        // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
        doc = node;
    } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
    }
    var event;
    if (node.dispatchEvent) {
        // Gecko-style approach (now the standard) takes more work
        var eventClass = "";

        // Different events have different event classes.
        // If this switch statement can't map an eventName to an eventClass,
        // the event firing is going to fail.

        switch (eventName) {
            // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
            case "click":
            case "mousedown":
            case "mouseup":
                eventClass = "MouseEvents";
                break;

            case "focus":
            case "change":
            case "blur":
            case "select":
                eventClass = "HTMLEvents";
                break;

            default:
                throw Error("fireEvent: Couldn't find an event class for event '" + eventName + "'.");
                break;
        }
        event = doc.createEvent(eventClass);

        var bubbles = eventName == "change"
        // All events created as bubbling and cancelable.
        event.initEvent(eventName, bubbles, true);

        // allow detection of synthetic events
        event.synthetic = true;
        node.dispatchEvent(event, true);
    } else  if (node.fireEvent) {
        // IE-old school style
        event = doc.createEventObject();
        // allow detection of synthetic events
        event.synthetic = true;
        node.fireEvent("on" + eventName, event);
    }
}

/* ADD KEYBOARD NAVIGATION TO ELEMENTS

  arguments:
    selector = STRING: css query selector

  will add a SPACE and ENTER keyboard lister to trigger a click
  on the elements.

  DEPENDENCIES:
     fireEvent()
     makeArray()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function addKeyboardNavigationToElements(selector){
  selector = selector || '[role="button"]'
  var buttonNavs = document.querySelectorAll(selector)
    makeArray(buttonNavs).forEach(function(el){
    el.addEventListener('keydown', function(e){
      var code = e.which
      // 13 = Return, 32 = Space
      if((code == 13) || (code == 32)){
        fireEvent(this, 'click')
      }
    })
  })
}

/* SOL Eventing

  This is a micro eventing function. Allowing you to listen to
  listen to events happening across your application.
*/

function SOL(){
  this._events = {}

  this.on = function(event, callback){
    if(!this._events[event]){
      this._events[event] = callback
    } else {
      throw new Error("SOL: An event already exists by that name.")
    }
  }

  this.trigger = function(event, context, args = []){
    var cb = this._events[event]
    if(cb){
      return cb.apply(context, args)
    } else {
      throw new Error("SOL: No event exists by that name.")
    }
  }
}

/* Coverting Code to String

  This allows you to write regular HTML code, and then this function
  will replace the with Strings rather than HTML Code.

*/

//Convert HTML to String
function convertHTMLToString(el){
  console.log(el)
  var kids = Array.prototype.slice.call(el.children)
  if(!kids) return false;

  var string = kids.reduce((prev, cur)=>{
    return prev + cur.outerHTML + '\n'
  }, '')

  var indentation = string.match(/^(\ +)/mg)
  indentation = indentation[indentation.length-1].length
  var result = string.replace(/^(\ +)/mg, function(a,b){
    return ' '.repeat(a.length - indentation)
  })

  el.innerHTML = ''
  el.innerText = result
  return result
}

/* Translates JS or CSS to String */
function convertCodeToString(el){
  var string = el.innerText.trim()
  var whitespace = string.match(/^(\ +)(?=\})/gm)
  if(!whitespace) return false;

  var indentation = whitespace.reduce(function(a,b){
    return Math.min(a, b.length)
  }, Infinity)

  var result = string.replace(/^(\ +)/gm, function(a){
    var level = a.length - indentation
    level = level < 0 ? 0 : level
    return ' '.repeat(level)
  })

  el.innerHTML = result
  return result
}

/* Covert Code to String
   This will call one of the two previous functions depending on the `code-type`
   attribute on the code block.
*/
function convertCode(){
  var codeBlocks = document.querySelectorAll('code')
  codeBlocks = Array.prototype.slice.call(codeBlocks)
  codeBlocks.forEach(function(el){
    if(el.getAttribute('code-type') == 'html'){
      return convertHTMLToString(el)
    } else {
      return convertCodeToString(el)
    }
  })
}


/* Cheat Code
  Set a cheat code to excute when it is entered
  Parameters:
    code: [] of keys
    cb: function to call when the code is entered
    interval: # of miliseconds to type the code
    correct: function to call on correct character entry
    incorrect: function to call on incorrect character entry

*/
function cheatCode(code, cb, lag, correct, incorrect){
  var watch = {
    count: 0,
    index: 0,
    timerInterval: null,
    stopperInterval: null,
    lag: lag || 3000
  }

  document.addEventListener('keydown', function(e){
    if(e.key == code[watch.index]){
      if(!watch.timerInterval){ watch.timerInterval = timer()}
      if(!watch.stopperInterval){ watch.stopperInterval = stopper()}
      watch.index += 1
      if(correct) correct()
      if(watch.index >= code.length){
        cb()
        reset()
      }
    } else {
      reset()
      if(incorrect) incorrect()
    }
  })

  function timer(){
    return setInterval(function(){
      watch.count += 20
    }, 20)
  }
  function stopper(){
    return setInterval(function(){
      if(watch.count >= watch.lag){
        reset()
      }
    }, watch.lag)
  }
  function reset(){
    clearInterval(watch.timerInterval)
    clearInterval(watch.stopperInterval)
    watch.timerInterval = null
    watch.stopperInterval = null
    watch.index = 0
    watch.count = 0
  }
}
