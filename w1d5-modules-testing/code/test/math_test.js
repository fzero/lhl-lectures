// Your test code goes here!

// We need to require something that allows us to verify results
// We're using `chai` here, which can be used both in `assert`
// and `expect` styles. See http://chaijs.com/guide/styles
// You can also use Node's own assert package with:
// var assert = require('assert');
var assert = require('chai').assert;
var expect = require('chai').expect;

// Now we require the module we'll test
var math = require('../math');


describe('Testing the math module', function() {

  describe('squared()', function() {

    // Chai has two test styles: assert and expect.
    // We'll use assert style for these tests

    it('should return 16 when 4 is given', function() {
      assert.equal(16, math.squared(4));
    });

    it('should NOT return 5 when 2 is given', function() {
      assert.notEqual(5, math.squared(2));
    });

  });


  describe('circleArea()', function() {

    // We'll use expect style from now on

    it('should return 12.57 when 2 is given without custom precision', function() {
      expect(math.circleArea(2)).to.equal(12.57);
    });

    it('should return 12.56637 when 2 is given, precision 5', function() {
      expect(math.circleArea(2, 5)).to.equal(12.56637);
    });

  });


  describe('circumference()', function() {

    it('should return 25.13 when 4 is given without custom precision', function() {
      expect(math.circumference(4)).to.equal(25.13);
    });

    it('should return 25.13274 when 4 is given, precision 5', function() {
      expect(math.circumference(4, 5)).to.equal(25.13274);
    });

  });


  describe('toKb()', function() {

    it('should return 1.00 when 1024 is given without custom precision', function() {
      expect(math.toKb(1024)).to.equal(1.00);
    });

    it('should return 1.50 when 1536 is given without custom precision', function() {
      expect(math.toKb(1536)).to.equal(1.50);
    });

  });

  describe('triangleArea()', function() {
    it('should return 100.00 when w = 10 and h = 20', function() {
      expect(math.triangleArea(10, 20)).to.equal(100.00);
    });

    it('should return 27.56 when w = 10.5 and h = 5.25 and precision = 2', function() {
      expect(math.triangleArea(10.5, 5.25, 2)).to.equal(27.56);
    });
  })

});
