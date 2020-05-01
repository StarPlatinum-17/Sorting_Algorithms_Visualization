const BACKGROUND_FILL = 50;
const DEFAULT_FILL = 255;
const PIVOT_COLOR = '#cc0000';
const QS_LESS = '#E5FF24';
const QS_MORE = '#6CFF33';
const SORTED_FILL = '#BFB7BF';

const BEAT_MS = 10;

const CANVAS_LENGTH = 1201;
const CANVAS_HEIGHT = 400;

var NUM_ELEMENTS = 500;

//VisualizedArray class
class VisualizedArray extends Array {
    constructor(num_elements){
        super(num_elements);

        this.states = Array(num_elements).fill(0);
        this.delay = 0;
    }
    isEmpty() {
        return this.length === 0;
    }

    set_states(indexes, value){
        for (let i = 0 ; i < indexes.length; i++){
            let j=indexes[i];
            this.states[j] = value;
        }
    }

    set_states_range(start,end, value){
        for (let i = start ; i < end; i++){
            this.states[i] = value;
        }
    }

    clear_states(start, end){
        this.states.fill(0,start,end);
    }

    swap(i,j){
        let tmp = this[i];
        this[i] = this[j];
        this[j] = tmp;

        tmp = this.states[i];
        this.states[i] = this.states[j];
        this.states[j] = tmp;
    }

    

  }

var _visualized_array = new VisualizedArray(0);
var _2nd_vsi_array = new VisualizedArray(0);


//Visualization
function setup(){
    let cnv = createCanvas(CANVAS_LENGTH, CANVAS_HEIGHT);
    cnv.parent("sketch");
    background(BACKGROUND_FILL);
    frameRate(60);
}


function draw(){
    background(BACKGROUND_FILL);

    let elements = _visualized_array;
    let states = _visualized_array.states;
    
    w = width/(elements.length + 1)
    m = (width - w * elements.length) / 2
    
    noStroke();
    for (let i = 0; i < elements.length; i++){
        
        if (states[i] == 1){
            fill(SORTED_FILL);

        } else if (states[i] == 2){
            fill(PIVOT_COLOR);

        } else if (states[i] == 3){
            fill(QS_LESS);

        } else if (states[i] == 4){
            fill(QS_MORE);

        } else{
            fill(DEFAULT_FILL);
        }

        rect(i * w + m, height - elements[i], w, height);

    }
}

//buttons
function trigger_QuickSort(){
    QuickSort(_visualized_array,0,_visualized_array.length-1);
}

function trigger_MergeSort(){
    MergeSort(_visualized_array,0,_visualized_array.length-1);
}


//Functionality
function generate_array(num_elements = NUM_ELEMENTS, max_value = CANVAS_HEIGHT){
    _visualized_array.delay = 0;
    sleep(_visualized_array.delay);
    _visualized_array = new VisualizedArray(num_elements);
    _visualized_array.delay = BEAT_MS;


    for (let i = 0; i < _visualized_array.length; i++){
        _rand = Math.random();
        _visualized_array[i] = _rand*(max_value) + 20*(1-_rand);
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

function sleep(ms = this.delay){
    if (ms>0){
        return new Promise(resolve => setTimeout(resolve, ms));
    } else {
        return;
    }
}


//quick sort
async function qs_partition(arr, start, end){
    
    let j = start;
    let tmp;

    arr.set_states([end],2);

    for (let i = start; i < end; i++){
        arr.set_states([i],2);
        await sleep(arr.delay);

        if (arr[i] < arr[end]){      
            //swap i and j values
            arr.swap(i,j)
            arr.set_states([j],4);
            await sleep(arr.delay);
            
            j = j+1;
        } else{
           arr.set_states([i],3)
        }

    }
    //swap pivot and j values
    arr.swap(end,j)
    await sleep(arr.delay);
    arr.clear_states(start,end);
    arr.set_states([j],1);
    await sleep(arr.delay);
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


async function ms_merge(arr,start,midpoint,end){
    var Left = arr.slice(start,midpoint+1);
    var Right = arr.slice(midpoint+1,end+1);
    
    arr.set_states_range(start,midpoint+1,3);
    arr.set_states_range(midpoint+1,end+1,4);
    await sleep(arr.delay);
    for (let i = end; i > start; i--){
        var left_compare_idx = start + max(0,Left.length-1)

        arr.set_states([i,left_compare_idx],2);
        await sleep(arr.delay);

        if (Right.length==0 || (Left[Left.length-1] > Right[Right.length-1])){
            arr.set_states([left_compare_idx],4);

            arr[i] = Left.pop();  
            arr.splice(i - Right.length,Right.length,...Right);
            
        } else{
            arr.set_states([left_compare_idx],3);
            arr[i] = Right.pop();
        }   
        arr.set_states([i],1);
        await sleep(arr.delay);

    }


    arr.set_states([start],1);
    await sleep(arr.delay);
}

async function MergeSort(arr,start,end){
    
    if (start < end){
        let midpoint = Math.floor((start+end)/2);
        
        await Promise.all([
        MergeSort(arr,start,midpoint),
        MergeSort(arr,midpoint+1,end)
        ])

        await ms_merge(arr,start,midpoint,end);

    } 


}

