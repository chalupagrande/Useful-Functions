var assert = chai.assert,
    expect = chai.expect,
    should = chai.should()

describe('Function Tests', function(){
  describe('#randomNum()', function(){
    var num, round
    before(function(){
      num = randomNum(1,10)
      round = randomNum(1,10,true)
    })
    it('return a number between 1-10', function(){
        assert.equal(num < 11 && num > 0, true)
    })
    it('round the number when neccessary', function(){
        assert.equal(round.toString().length, 1)
    })
  })

  describe('#toggleClass()', function(){
    var a;
    before(function(){
      a = document.createElement('div')
    })
    it('should add class', function(){
      toggleClass(a, 'win')
      assert.equal(a.className, 'win', 'it didnt add the class')
    })
    it('should remove class', function(){
      toggleClass(a, 'win')
      assert.equal(a.classList.length, 0, 'the class list is not empty')
    })
  })

  describe('#getDocHeight()', function(){
    var a;
    before(function(){
      a = getDocHeight()
    })
    it('should not throw error', function(){
      expect(getDocHeight).to.not.throw(Error);
    })
    it('should return number', function(){
      expect(a).to.be.a('number')
    })
  })

  describe('#formatDate() & formatTime()', function(){
    var date
    before(function(){
      date = formatDate(new Date("1/1/2012 14:23"))
    })
    it("should return the correct date/time", function(){
      assert.equal(date, "1/1/2012 - 2:23pm")
    })
  })

  describe('#removeSpaceMakeLowercase()', function(){
    it('should remove all spaces and case', function(){
      var s = removeSpaceMakeLowercase('Jamie Is Cool')
      assert.equal(s, 'jamie_is_cool', 'returned the wrong string')
    })
  })

  describe('#binarySearch()', function(){
    var array,result, compare,large =[];
    before(function(){

      for(var i = 0; i < 10000000; i++){
        large.push(i)
      }

      array = [{num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:8},
               {num:9},{num:10},{num:11},{num:13},{num:15},{num:19},{num:20}]

      compare = function(a,b){
        return a.num - b.num
      }
    })
    it('should find the correct index number', function(){
      assert.equal(binarySearch(array, {num:15}, compare),11, "didnt find the number")
    })
    it('return -1 when the number is too large', function(){
      assert.equal(binarySearch(array, {num:25}, compare), -1, "returned a value other than -1")
    })
    it('return -1 when the number is too small', function(){
      assert.equal(binarySearch(array, {num:-2}, compare), -1, "returned a value other than -1")
    })
    it('return -1 when the number is not found', function(){
      assert.equal(binarySearch(array, {num:12}, compare), -1, "returned a value other than -1")
    })
    it('should be able to search large arrays (10 million)', function(){
      assert.equal(binarySearch(large, 223),223, 'Took too long')
    })
  })

  describe('#makeArray', function(){
    var args;
    var query;
    before(function(){
      (function(){
        query = document.querySelector('body').children
        args = arguments
      })(1,2,3)
    })

    it('should create an Array from arguments', function(){
      assert.equal(Array.isArray(makeArray(args)), true, 'did not return an Array object')
    })
    it('should create an Array from children', function(){
      assert.equal(Array.isArray(makeArray(query)), true, 'did not return an Array object')
    })
  })
  describe('#hasClass()', function(){
    var el;
    before(function(){
      el = document.querySelector('.marker')
    })

    it('should return true for elements with class', function(){
      assert.equal(hasClass(el,'marker'), true, 'returned false')
    })
  })
})
