const BACKGROUND_FILL = 50;
const COMPARE_FILL = '#8B0000';
const DEFAULT_FILL = 255;

const CANVAS_LENGTH = 1201
const CANVAS_HEIGHT = 400

var NUM_ELEMENTS = 112

let i = 0;

function setup(){
    let cnv = createCanvas(CANVAS_LENGTH, CANVAS_HEIGHT);
    cnv.parent("sketch");
    //centerCanvas();
    background(BACKGROUND_FILL);
    var _elements
    generate_array()
}

function draw(){
    if (Array.isArray(_elements) && _elements.length){
        background(BACKGROUND_FILL);
        
        w = width/(_elements.length + 1)
        m = (width - w * _elements.length) / 2
        
        for (let i = 0; i < _elements.length; i++){
            
            stroke(0);
            fill(DEFAULT_FILL);
            rect(i * w + m, height - _elements[i], w, height);
   
        }
    }
}

function generate_array(){
    _elements = Array(NUM_ELEMENTS)
    
    for (let i = 0; i < _elements.length; i++){
        _elements[i] = random(20,height);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}