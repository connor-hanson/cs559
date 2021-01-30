function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;

    function draw() {
        canvas.width = canvas.width;

        // use the sliders to get the angles
        var tParam = slider1.value * 0.01;
        var viewAngle = slider2.value * 0.02 * Math.PI;


        function moveToTx(loc, Tx) {
            var res = vec3.create();
            vec3.transformMat4(res, loc, Tx);
            context.moveTo(res[0], res[1]);
        }

        function lineToTx(loc, Tx) {
            var res = vec3.create();
            vec3.transformMat4(res, loc, Tx);
            context.lineTo(res[0], res[1]);
        }

        function drawObject(color, Tx) {
            context.beginPath();
            context.fillStyle = color;
            moveToTx([-.05, -.05, 0.5], Tx);
            lineToTx([-.05, .05, 0.5], Tx);
            lineToTx([.05, .05, 0.5], Tx);
            lineToTx([.1, 0, 0.5], Tx);
            lineToTx([.05, -.05, 0.5], Tx);
            context.closePath();
            context.fill();
        }

        function draw3DAxes(color, Tx) {
            context.strokeStyle = color;
            context.beginPath();
            // Axes
            moveToTx([1.2, 0, 0], Tx);
            lineToTx([0, 0, 0], Tx);
            lineToTx([0, 1.2, 0], Tx);
            moveToTx([0, 0, 0], Tx);
            lineToTx([0, 0, 1.2], Tx);
            // Arrowheads
            moveToTx([1.1, .05, 0], Tx);
            lineToTx([1.2, 0, 0], Tx);
            lineToTx([1.1, -.05, 0], Tx);
            moveToTx([.05, 1.1, 0], Tx);
            lineToTx([0, 1.2, 0], Tx);
            lineToTx([-.05, 1.1, 0], Tx);
            moveToTx([.05, 0, 1.1], Tx);
            lineToTx([0, 0, 1.2], Tx);
            lineToTx([-.05, 0, 1.1], Tx);
            // X-label
            moveToTx([1.3, 0, 0], Tx);
            lineToTx([1.4, .1, 0], Tx);
            moveToTx([1.3, .1, 0], Tx);
            lineToTx([1.4, 0, 0], Tx);
            // Y-label
            moveToTx([0, 1.35, 0], Tx);
            lineToTx([.05, 1.3, 0], Tx);
            lineToTx([.1, 1.35, 0], Tx);
            moveToTx([.05, 1.3, 0], Tx);
            lineToTx([.05, 1.23, 0], Tx);

            context.stroke();
        }

        function draw2DAxes(color, Tx) {
            context.strokeStyle = color;
            context.beginPath();
            // Axes
            moveToTx([120, 0, 0], Tx);
            lineToTx([0, 0, 0], Tx);
            lineToTx([0, 120, 0], Tx);
            // Arrowheads
            moveToTx([110, 5, 0], Tx);
            lineToTx([120, 0, 0], Tx);
            lineToTx([110, -5, 0], Tx);
            moveToTx([5, 110, 0], Tx);
            lineToTx([0, 120, 0], Tx);
            lineToTx([-5, 110, 0], Tx);
            // X-label
            moveToTx([130, 0, 0], Tx);
            lineToTx([140, 10, 0], Tx);
            moveToTx([130, 10, 0], Tx);
            lineToTx([140, 0, 0], Tx);
            context.stroke();
        }

        var Hermite = function(t) {
            return [
                2 * t * t * t - 3 * t * t + 1,
                t * t * t - 2 * t * t + t, -2 * t * t * t + 3 * t * t,
                t * t * t - t * t
            ];
        }

        var HermiteDerivative = function(t) {
            return [
                6 * t * t - 6 * t,
                3 * t * t - 4 * t + 1, -6 * t * t + 6 * t,
                3 * t * t - 2 * t
            ];
        }

        function Cubic(basis, P, t) {
            var b = basis(t);
            var result = vec3.create();
            vec3.scale(result, P[0], b[0]);
            vec3.scaleAndAdd(result, result, P[1], b[1]);
            vec3.scaleAndAdd(result, result, P[2], b[2]);
            vec3.scaleAndAdd(result, result, P[3], b[3]);
            return result;
        }

        var p0 = [0, 0, 0];
        var d0 = [1, 3, 0];
        var p1 = [1, 1, 0];
        var d1 = [-1, 3, 0];
        var p2 = [2, 2, 0];
        var d2 = [0, 3, 0];

        var P0 = [p0, d0, p1, d1]; // First two points and tangents
        var P1 = [p1, d1, p2, d2]; // Last two points and tangents

        var C0 = function(t_) { return Cubic(Hermite, P0, t_); };
        var C1 = function(t_) { return Cubic(Hermite, P1, t_); };

        var C0prime = function(t_) { return Cubic(HermiteDerivative, P0, t_); };
        var C1prime = function(t_) { return Cubic(HermiteDerivative, P1, t_); };

        var Ccomp = function(t) {
            if (t < 1) {
                var u = t;
                return C0(u);
            } else {
                var u = t - 1.0;
                return C1(u);
            }
        }

        var Ccomp_tangent = function(t) {
            if (t < 1) {
                var u = t;
                return C0prime(u);
            } else {
                var u = t - 1.0;
                return C1prime(u);
            }
        }

        function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
            context.strokeStyle = color;
            context.beginPath();
            moveToTx(C(t_begin), Tx);
            for (var i = 1; i <= intervals; i++) {
                var t = ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
                lineToTx(C(t), Tx);
            }
            context.stroke();
        }

        // make sure you understand these    

        draw2DAxes("black", mat4.create());

        // Create ViewPort transform
        var Tviewport = mat4.create();
        mat4.fromTranslation(Tviewport, [200, 300, 0]); // Move the center of the
        // "lookAt" transform (where
        // the camera points) to the
        // canvas coordinates (200,300)
        mat4.scale(Tviewport, Tviewport, [100, -50, -1]); // Flip the Y-axis,
        // scale everything by 100x
        draw3DAxes("brown", Tviewport); // Uncomment this to see the "camera" coords

        // Create Camera (lookAt) transform
        var locCamera = vec3.create();
        var distCamera = 400.0;
        locCamera[0] = distCamera * Math.sin(viewAngle);
        locCamera[1] = 100;
        locCamera[2] = distCamera * Math.cos(viewAngle);
        var locTarget = vec3.fromValues(0, 0, 0); // Aim at the origin of the world coords
        var vecUp = vec3.fromValues(0, 1, 0);
        var TlookAt = mat4.create();
        mat4.lookAt(TlookAt, locCamera, locTarget, vecUp);


        // Create transform t_VP_CAM that incorporates
        // Viewport and Camera transformations
        var tVP_CAM = mat4.create();
        mat4.multiply(tVP_CAM, Tviewport, TlookAt);
        draw3DAxes("grey", tVP_CAM);

        drawTrajectory(0.0, 1.0, 100, C0, tVP_CAM, "red");
        drawTrajectory(0.0, 1.0, 100, C1, tVP_CAM, "blue");

        // Create model(ing) transform
        // (from moving object to world)
        var Tmodel = mat4.create();
        mat4.fromTranslation(Tmodel, Ccomp(tParam));
        var tangent = Ccomp_tangent(tParam);
        var angle = Math.atan2(tangent[1], tangent[0]);
        mat4.rotateZ(Tmodel, Tmodel, angle);

        // Create transform t_VP_CAM_MOD that incorporates
        // Viewport, camera, and modeling transform
        var tVP_CAM_MOD = mat4.create();
        mat4.multiply(tVP_CAM_MOD, tVP_CAM, Tmodel);
        // draw3DAxes("green", tVP_CAM_MOD); // Uncomment to see "model" coords
        drawObject("green", tVP_CAM_MOD);
    }

    slider1.addEventListener("input", draw);
    slider2.addEventListener("input", draw);
    draw();
}
window.onload = setup;