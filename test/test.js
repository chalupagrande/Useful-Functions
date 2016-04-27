var assert = chai.assert,
    expect = chai.expect,
    should = chai.should()

describe('Function Tests', function(){
  describe('randomNum()', function(){
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

  describe('toggleClass()', function(){
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

  describe('getDocHeight()', function(){
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

  describe('formatDate() & formatTime()', function(){
    var date
    before(function(){
      date = formatDate(new Date("1/1/2012 14:23"))
    })
    it("should return the correct date/time", function(){
      assert.equal(date, "1/1/2012 - 2:23pm")
    })
  })

  describe('removeSpaceMakeLowercase', function(){
    it('should remove all spaces and case', function(){
      var s = removeSpaceMakeLowercase('Jamie Is Cool')
      assert.equal(s, 'jamie_is_cool', 'returned the wrong string')
    })
  })

  describe('binarySearch', function(){
    var result;
    before(function(){
      var array = [1,2,3,4,5,6,7,8,9,10]
    })
    it('WRITE THESE TESTS', function(){
      //TODO
    })
  })
})
