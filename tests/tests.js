console.log('qunit tests start');


QUnit.test("Generate Array Length Test", function(assert){
    generate_array();
    assert.equal(_elements.length,NUM_ELEMENTS);
});

QUnit.test("Check sorted arrays", function(assert){
    var arr = [2,3,5,6,9];
    var result = verify_sorted(arr)

    assert.ok(result);

    arr = [2,3,9,9,5];
    result = verify_sorted(arr)

    assert.notOk(result);
});

QUnit.test("Test qs_partition Single element", function(assert){
    var arr  = [1,2,3];

    let result = qs_partition(arr, 0, 0);

    assert.equal(result,0,"return only index");
    assert.deepEqual(arr,[1,2,3], "no change in array");

    result = qs_partition(arr, 1, 1);

    assert.equal(result,1,"return only index");
    assert.deepEqual(arr,[1,2,3], "no change in array");
});

QUnit.test("Test qs_partition pivot value", function(assert){
    // for now pivot is at the end of array
    var arr  = [2,3,9,9,5];

    let i_start = 0;
    let i_end = 4;
    

    let i_result = qs_partition(arr, i_start, i_end);
    assert.equal(i_result,2, "correct parition index");

    assert.ok(arr.slice(i_result,i_end).every(el => el >= arr[i_result]), "every element right is greater than pivot")
    assert.ok(arr.slice(i_start,i_result).every(el => el <= arr[i_result]), "every element left is less than pivot")

    arr = [2,3,5,8,3,5,6,3,67,9,3]
    i_result = qs_partition(arr, 0, (arr.length-1));
    assert.ok(arr.slice(i_result,i_end).every(el => el >= arr[i_result]), "every element right is greater than pivot")
    assert.ok(arr.slice(i_start,i_result).every(el => el <= arr[i_result]), "every element left is less than pivot")

});


QUnit.test("Test QuickSort if sorted", function(assert){
    var arr  = [3,9,9,2,5];
    var sorted_arr = [2,3,5,9,9];

    QuickSort(arr,0,arr.length -1);
    assert.deepEqual(arr,sorted_arr, "check array");    
});

