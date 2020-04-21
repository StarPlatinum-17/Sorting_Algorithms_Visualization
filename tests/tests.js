console.log('qunit tests start');

QUnit.test("Generate Array Length Test", function(assert){
    generate_array();
    assert.equal(_elements.length,NUM_ELEMENTS);
});

QUnit.test("QUnit is sequential", function(assert){
    assert.equal(_elements.length,NUM_ELEMENTS);
});
