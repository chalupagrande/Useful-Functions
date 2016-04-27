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
})
