const BACKGROUND_FILL = 50;
const DEFAULT_FILL = 255;
const PIVOT_COLOR = '#cc0000';
const QS_LESS = '#E5FF24';
const QS_MORE = '#6CFF33';
const SORTED_FILL = '#BFB7BF';

const BEAT_MS =10;

const CANVAS_LENGTH = 1201;
const CANVAS_HEIGHT = 400;

var NUM_ELEMENTS = 1000;

_elements = _states = [];

let i = 0;

function setup(){
    let cnv = createCanvas(CANVAS_LENGTH, CANVAS_HEIGHT);
    cnv.parent("sketch");
    background(BACKGROUND_FILL);
    frameRate(60);
}

//Visualization
function draw(){

    background(BACKGROUND_FILL);


    w = width/(_elements.length + 1)
    m = (width - w * _elements.length) / 2
    
    noStroke();
    for (let i = 0; i < _elements.length; i++){
        

        if (_states[i] == 1){
            fill(SORTED_FILL);

        } else if (_states[i] == 2){
            fill(PIVOT_COLOR);

        } else if (_states[i] == 3){
            fill(QS_LESS);

        } else if (_states[i] == 4){
            fill(QS_MORE);

        } else{
            fill(DEFAULT_FILL);
        }

        rect(i * w + m, height - _elements[i], w, height);

    }
}

//buttons
function trigger_QuickSort(){
    QuickSort(_elements,0,_elements.length-1);
}


//Functionality
function generate_array(num_elements = NUM_ELEMENTS, max_value = CANVAS_HEIGHT){
    _elements = Array(num_elements);
    _states = Array(num_elements);
    for (let i = 0; i < _elements.length; i++){
        _rand = Math.random();
        _elements[i] = _rand*(max_value) + 20*(1-_rand);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(arr,i,j){
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    return arr;
}

function _clear(arr,start,end){
    for (let i = start ; i <= end; i++){
        arr[i]=0;
    }
}

function set_arr_with_value(arr,indexes,value){
    for (let i = 0 ; i < indexes.length; i++){
        let j=indexes[i];
        arr[j] = value;
    }
}


function verify_sorted(arr) {
    var is_sorted = true;

    for (let i = 1; i < arr.length; i++){
        if (arr[i-1] > arr[i]){
            is_sorted = false;
            break;
        } 
    }
    return is_sorted;
}


//quick sort
async function qs_partition(arr, start, end){
   
    let j = start;
    let tmp;
    set_arr_with_value(_states,[end],2)
    for (let i = start; i < end; i++){
        set_arr_with_value(_states,[i],2)
        await sleep(BEAT_MS);
        
        if (arr[i] < arr[end]){
            
            //swap i and j values
            swap(arr,i,j);
            swap(_states,i,j);

            await sleep(BEAT_MS);
            set_arr_with_value(_states,[j],4)
            
            j = j+1;
        } else{
            await sleep(BEAT_MS);
            set_arr_with_value(_states,[i],3)
        }

    }
    //swap pivot and j values
    set_arr_with_value(_states,[end],1);
    swap(arr,j,end);
    await sleep(BEAT_MS);
    _clear(_states,start,end);
    set_arr_with_value(_states,[j],1);
    return j;
    
}

async function QuickSort(arr, start, end){
    if (start <= end){

        let q = await qs_partition(arr, start, end);

        await Promise.all([
        QuickSort(arr,start,q-1),
        QuickSort(arr,q+1,end)
        ])

    }
}