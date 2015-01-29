
var gl;
var points;
var int = 0;
var vertices = new Float32Array;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	//declare verts for triangle, square, then pentagon
	var vertices = ([-.5, -.5, 0, .5, .5, -.5, -0.5, -0.5,-0.5,  0.5, 0.5, 0.5 ,0.5, -0.5,-0.333, -0.26 ,0.333,  -0.26 ,0.333, 0.26 ,0.0, 0.666 , -0.333, 0.26]);
		
    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, 0, 1.0 );
    
    //  Load shaders and initialize attribute buffers   
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU   
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	
	
	canvas.addEventListener("mousedown", function(event){ int += 1; }); //Increments the index for the image being rendered
    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    
	if (int == 0){
	gl.drawArrays( gl.TRIANGLES, 0, 3 ); //Triangles
	}else if (int == 1){
   	gl.drawArrays( gl.TRIANGLE_FAN, 3, 4 ); //Square
	}else{
	gl.drawArrays( gl.TRIANGLE_FAN, 7, 5 ); //Pentagon
	int=0;
	}
	
	window.requestAnimFrame(render); //allows image change 

}
