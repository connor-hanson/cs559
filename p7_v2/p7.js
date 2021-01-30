function start() {

    var time = 0.0;

    var CartonBottom = {
        vPos: new Float32Array([-0.5, -1, 0.25,  0.5, -1, 0.25,  -0.5, 0.1, 0.25,  0.5, 0.1, 0.25, // front
            -0.5, -1, 0.25,  -0.5, -1, -0.25,  -0.5, 0.1, -0.25,  -0.5, 0.1, 0.25, // left
            0.5, -1, 0.25,  0.5, -1, -0.25,  0.5, 0.1, 0.25,  0.5, 0.1, -0.25, // right
            -0.5, -1, 0.25, -0.5, -1, -0.25, 0.5, -1, -0.25, 0.5, -1, 0.25, // bottom
            -0.5, -1, -0.25, 0.5, -1, -0.25, -0.5, 0.1, -0.25, 0.5, 0.1, -0.25 // back
        ]),

        vNorms: new Float32Array([
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // front
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, // left
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, // right
            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // bottom
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1 // back
        ]),

        vColors: new Float32Array([
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // front
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // left
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // r
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // bottom
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 // back
        ]),

        triangleIndices: new Uint8Array([
            0, 1, 2, 1, 2, 3, // f
            4, 5, 6, 4, 6, 7, // l
            8, 9, 10, 10, 11, 9, // r
            12, 13, 14, 12, 14, 15, // bottom
            16, 17, 18, 17, 18, 19 // back
        ])
    };

    var CartonLid = {
        vPos: new Float32Array([
            -0.51, 0.26, 0.51,  0.51, 0.26, 0.51,  -0.51, 0.26, -0.01,  0.51, 0.26, -0.01, // top
            -0.51, 0.26, 0.51,  0.51, 0.26, 0.51,  0.51, -0.2, 0.51,  -0.51, -0.2, 0.51, //front
            -0.51, 0.26, -0.01,  -0.51, 0, -0.01,  -0.51, -0.2, 0.51,  -0.51, 0.26, 0.51, // left
            -0.51, 0.26, -0.01,  0.51, 0.26, -0.01,  0.51, 0, -0.01,  -0.51, 0, -0.01, // back
            0.51, 0.26, -0.01,  0.51, 0, -0.01,  0.51, -0.2, 0.51,  0.51, 0.26, 0.51, // right
        ]),

        vNorms: new Float32Array([
            0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0, // top
            0, 0, 1,  0, 0, 1,  0, 0, 1,  0, 0, 1, // front
            -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0, // left
            0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1, // back
            1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0, // right
        ]),

        vColors: new Float32Array([
            1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0,// top
            1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0, //front
            1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0, //left
            1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0, // back
            1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0,// right
        ]),

        triangleIndices: new Uint8Array([
            0, 1, 2,  1, 2, 3, // top
            4, 5, 6,  4, 6, 7, // front
            8, 9, 10, 8, 10, 11, // left
            12, 13, 14,  12, 14, 15, // back
            16, 17, 18, 16, 18, 19 // right
        ])
    };

    function initCigVPos() {
        var vertices = [];
        var origin = [0,0,0];
        vertices.push( origin[0], origin[1], origin[2]);     
        for(var i = 0; i <= 360; i+=1){
            var j = i*Math.PI/110; // why not 180?
            var vert = [Math.sin(j),Math.cos(j), 0];
            vertices.push( vert[0], vert[1], vert[2]);     
        }

        let x = new Float32Array;
        return Float32Array.from(vertices);
    }

    function initCigNorms() {
        var array = [];

        for (var i = 0; i < 360; ++i) {
            if (i % 3 == 1) {
                array[i] = 1;
            } else {
                array[i] = 0;
            }
        }

        let x = new Float32Array;
        return Float32Array.from(array);
    }

    function initCigColors() {
        var array = [];

        for (var i = 0; i < 360*3; ++i) {
            array[i] = 1;
        }

        return Float32Array.from(array);
    }

    function initCigTriInd() {

        var array = [0];

        // link top triangles
        for (var i = 1; i < 360; i++) {
            array[i] = i;
            //array[i + 1] = i+1;
            // array[i + 2] = 0;
        }
        return Uint8Array.from(array);
    }
// "https://live.staticflickr.com/65535/50703045847_67237a3a05_b.jpg"
    var cigarette = {

        vPos: 0,

        vNorms: 0,

        vColors: 0,

        triangleIndices: 0
    };

    function createShader(gl, shaderType, shaderSrc) {
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSrc);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        } else {
            return shader;
        }
    }

    // attach shaders and link
    function createProgram(gl, vShader, fShader) {
        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vShader);
        gl.attachShader(shaderProgram, fShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Error initializing shaders");
        } else {
            gl.useProgram(shaderProgram);
            return shaderProgram;
        }
    }

    function setupShader1() {
        var vertexShader = createShader(gl, gl.VERTEX_SHADER, document.getElementById("vertexShader").text);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, document.getElementById("fragmentShader").text)

        var shaderProgram = createProgram(gl, vertexShader, fragmentShader);

        // with the vertex shader, we need to pass it positions
        // as an attribute - so set up that communication
        shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
        gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
        console.log(shaderProgram.PositionAttribute);

        shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
        gl.enableVertexAttribArray(shaderProgram.NormalAttribute);
        console.log(shaderProgram.NormalAttribute);

        shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "time");
        gl.enableVertexAttribArray(shaderProgram.ColorAttribute);

        // shaderProgram.texcoordAttribute = gl.getAttribLocation(shaderProgram, "vTexCoord");
        // gl.enableVertexAttribArray(shaderProgram.texcoordAttribute);

        // this gives us access to the matrix uniform
        shaderProgram.MVmatrix = gl.getUniformLocation(shaderProgram, "uMV");
        shaderProgram.MVNormalmatrix = gl.getUniformLocation(shaderProgram, "uMVn");
        shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram, "uMVP");
        return shaderProgram;
    }

    // Get canvas, WebGL context, twgl.m4
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    // Sliders at center
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 0;

    var shaderProgram = setupShader1();

    // setup buffers and draw separately for each object
    function bindAndDraw(obj, tMatrix) {
        // we need to put the vertices into a buffer so we can
        // block transfer them to the graphics hardware
        var trianglePosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, obj.vPos, gl.STATIC_DRAW);
        trianglePosBuffer.itemSize = 3;
        trianglePosBuffer.numItems = obj.vPos.length / 3;

        // a buffer for normals
        var triangleNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, obj.vNorms, gl.STATIC_DRAW);
        triangleNormalBuffer.itemSize = 3;
        triangleNormalBuffer.numItems = obj.vNorms.length / 3;

        // a buffer for colors
        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, obj.vColors, gl.STATIC_DRAW);
        colorBuffer.itemSize = 3;
        colorBuffer.numItems = obj.vColors.length / 3;

        //var timeBuffer = gl.createBuffer();
        //gl.bindBuffer()

        // a buffer for indices
        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, obj.triangleIndices, gl.STATIC_DRAW);


        // drawing code
        // Translate slider values to angles in the [-pi,pi] interval
        var angle1 = slider1.value * 0.01 * Math.PI;
        var angle2 = slider2.value * 0.01 * Math.PI;

        // Circle around the y-axis
        var eye = [400 * Math.sin(angle1), 150.0, 400.0 * Math.cos(angle1)];
        var target = [0, 0, 0];
        var up = [0, 1, 0];

        var tModel = mat4.create();
        mat4.fromScaling(tModel, [100, 100, 100]);
        mat4.rotate(tModel, tModel, angle2, [1, 1, 1]);
        mat4.multiply(tModel, tModel, tMatrix);

        var tCamera = mat4.create();
        mat4.lookAt(tCamera, eye, target, up);

        var tProjection = mat4.create();
        mat4.perspective(tProjection, Math.PI / 4, 1, 10, 1000);

        var tMV = mat4.create();
        var tMVn = mat3.create();
        var tMVP = mat4.create();
        mat4.multiply(tMV, tCamera, tModel); // "modelView" matrix
        mat3.normalFromMat4(tMVn, tMV);
        mat4.multiply(tMVP, tProjection, tMV);


        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgram.MVmatrix, false, tMV);
        gl.uniformMatrix3fv(shaderProgram.MVNormalmatrix, false, tMVn);
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix, false, tMVP);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, triangleNormalBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
        //gl.bindBuffer(gl.ARRAY_BUFFER, time);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, 1,
            gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawElements(gl.TRIANGLES, obj.triangleIndices.length, gl.UNSIGNED_BYTE, 0);

    }

    // Scene (re-)draw routine
    function draw() {
        time += 0.01;
        // Clear screen, prepare for rendering
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // setup transforms
        var tMatrix = mat4.create();

        bindAndDraw(CartonBottom, tMatrix);

        mat4.fromTranslation(tMatrix, [0, 0, -0.25]);
        mat4.rotate(tMatrix, tMatrix, (1/45) * slider3.value, [-1, 0, 0]);
        bindAndDraw(CartonLid, tMatrix);

        // draw cigs
        //bindAndDraw(cigarette, tMatrix);
        
    }

    slider1.addEventListener("input", draw);
    slider2.addEventListener("input", draw);
    slider3.addEventListener("input", draw);

    // cigarette.vPos = initCigVPos();
    // cigarette.vNorms = initCigNorms();
    // cigarette.vColors = initCigColors();
    // cigarette.triangleIndices = initCigTriInd();

    // console.log(cigarette.triangleIndices);

    draw();
}

window.onload = start;