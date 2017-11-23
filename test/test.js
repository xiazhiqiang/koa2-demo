const assert = require("assert");// 原生node assert

/**
 * describe 测试套件 test suite 表示一组相关的测试
 * it 测试用例 test case 表示一个单独的测试
 * assert 断言 表示对结果的预期
 * 只执行某个测试，mocha --grep 'length'，用npm run test -- --grep 'length'
 */
describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });

    it('length', function(){
      assert.equal(3, [1, 2, 3].length);
    })
  });
});
