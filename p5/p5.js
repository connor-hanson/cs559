window.onload = function() {

    var ctx;
    var canvas;


    setup();
    draw();

    slider1.addEventListener("input", draw);


    function draw() {

        var viewAngle = slider1.value * 0.02 * Math.PI;

        function moveToTx(loc, Tx) {
            var res = vec3.create();
            vec3.transformMat4(res, loc, Tx);
            ctx.moveTo(res[0], res[1]);
        }

        function lineToTx(loc, Tx) {
            var res = vec3.create();
            vec3.transformMat4(res, loc, Tx);
            ctx.lineTo(res[0], res[1]);
        }

        function triangleTx(p1, p2, p3, Tx, color) {
            ctx.beginPath();
            moveToTx(p1, Tx);
            lineToTx(p2, Tx);
            lineToTx(p3, Tx);
            lineToTx(p1, Tx);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.stroke();
        }

        function arcTx(loc, r, startRad, endRad, Tx) {
            var res = vec3.create();
            vec3.transformMat4(res, loc, Tx);
            ctx.arc(res[0], res[1], r, startRad, endRad);
        }

        function fillRectTx(loc, w, h, Tx, color) {
            // var res = vec3.create();
            // vec3.transformMat4(rec, loc, Tx);
            // ctx.fillStyle = color;
            // ctx.fillRect(res[0], res[1], w, h);
        }

        // // loc is x, y width, height
        // function fillRectTx(loc, Tx) {
        //     var res = vec3.create();
        //     vecUp.transformMat4(res, loc, Tx);
        //     ctx.fillRect(res[0], res[1], res[2], res[3]);
        // }

        function draw3DAxes(color, Tx) {
            ctx.strokeStyle = color;
            ctx.beginPath();
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

            ctx.stroke();
        }

        var nearFace = {
            normal: vec3.fromValues(0, 0, -1), // normal vector, pointing out,
            draw(tx, cam) { // xy plane
                if (checkNormal(this.normal, cam)) {
                    ctx.beginPath();
                    moveToTx([0, 0, 0], tx);
                    lineToTx([0, -1, 0], tx);
                    lineToTx([1, -1, 0], tx);
                    lineToTx([1, 0, 0], tx);
                    lineToTx([0, 0, 0], tx);
                    //moveToTx([0, 0, 0], tx);
                    //fillRectTx([0, 0, 0], )
                    ctx.fillStyle = 'brown';
                    ctx.fill(); // near face
                    ctx.strokeStyle = 'black';
                    ctx.stroke();
                }
            }
        };

        var farFace = {
            normal: vec3.fromValues(0, 0, 1),
            draw(tx, cam) { // xy plane
                if (checkNormal(this.normal, cam)) {
                    ctx.beginPath();
                    moveToTx([0, 0, -1], tx);
                    lineToTx([1, 0, -1], tx);
                    lineToTx([1, -1, -1], tx);
                    lineToTx([0, -1, -1], tx);
                    lineToTx([0, 0, -1], tx);
                    ctx.fillStyle = 'brown';
                    ctx.fill(); // far face
                    ctx.strokeStyle = 'black';
                    ctx.stroke();
                }
            }
        };

        var leftFace = { // yz plane
            normal: vec3.fromValues(1, 0, 0),
            draw(tx, cam) {
                if (checkNormal(this.normal, cam)) {
                    ctx.beginPath();
                    moveToTx([0, 0, 0], tx);
                    lineToTx([0, 0, -1], tx);
                    lineToTx([0, -1, -1], tx);
                    lineToTx([0, -1, 0], tx);
                    lineToTx([0, 0, 0], tx);
                    ctx.fillStyle = 'brown';
                    ctx.fill(); // left face
                    ctx.strokeStyle = 'black';
                    ctx.stroke();
                }
            }
        };

        var rightFace = { // yz plane
            normal: vec3.fromValues(-1, 0, 0),
            draw(tx, cam) {
                if (checkNormal(this.normal, cam)) {
                    ctx.beginPath();
                    moveToTx([1, 0, 0], tx);
                    lineToTx([1, -1, 0], tx);
                    lineToTx([1, -1, -1], tx);
                    lineToTx([1, 0, -1], tx);
                    lineToTx([1, 0, 0], tx);
                    ctx.fillStyle = 'brown';
                    ctx.fill(); // right face
                    ctx.strokeStyle = 'black';
                    ctx.stroke();
                }
            }
        };

        var topFace = { // xz plane
            normal: vec3.fromValues(0, -1, 0),
            draw(tx, cam) {
                if (checkNormal(this.normal, cam)) {
                    ctx.beginPath();
                    moveToTx([0, 0, 0], tx);
                    lineToTx([0, 0, -1], tx);
                    lineToTx([1, 0, -1], tx);
                    lineToTx([1, 0, 0], tx);
                    lineToTx([0, 0, 0], tx);
                    ctx.fillStyle = 'green';
                    ctx.fill(); // top face

                    // draw a road over the top face
                    ctx.beginPath();
                    moveToTx([0.4, 0, 0], tx);
                    lineToTx([0.4, 0, -1], tx);
                    lineToTx([0.6, 0, -1], tx);
                    lineToTx([0.6, 0, 0], tx);
                    lineToTx([0.4, 0, 0], tx);
                    ctx.fillStyle = 'grey';
                    ctx.fill();
                    //ctx.stroke();
                }
            }
        };

        var bottomFace = { // xz plane
            normal: vec3.fromValues(0, 1, 0),
            draw(tx, cam) {
                if (checkNormal(this.normal, cam)) {
                    ctx.beginPath();
                    moveToTx([0, -1, 0], tx);
                    lineToTx([0, -1, -1], tx);
                    lineToTx([1, -1, -1], tx);
                    lineToTx([1, -1, 0], tx);
                    lineToTx([0, -1, 0], tx);
                    ctx.strokeStyle = 'black';
                    ctx.stroke(); // bottom face
                }
            }
        };

        var car = {

        }

        // check OUTWARD facing normal to camera's, return true if should be seen
        function checkNormal(normal, camera) {
            var res = vec3.dot(normal, camera);
            if (res >= -1) {
                return true;
            } else {
                return false;
            }
        }

        // get normal of plane from 3 points
        function getNormal(p1, p2, p3) {
            var v1 = vec3.fromValues(-1 * (p1[0] - p2[0]), -1 * (p1[1] - p2[1]), -1 * (p1[2] - p2[1]));
            var v2 = vec3.fromValues(-1 * (p1[0] - p3[0]), -1 * (p1[1] - p3[1]), -1 * (p1[2] - p3[1]));
            var cross = vec3.create();
            vec3.cross(cross, v1, v2); // cross product will be perpendicular to both, thus normal
            vec3.normalize(cross, cross);
            return cross;
        }

        function drawWorld(tx, w) {
            // draw faces
            farFace.draw(tx, w);
            nearFace.draw(tx, w);
            leftFace.draw(tx, w);
            rightFace.draw(tx, w);
            topFace.draw(tx, w);
            bottomFace.draw(tx, w);

            // draw car(s?)
            plumbob(tx, viewAngle);

        }

        // car is drawn in its own object space
        function plumbob(tx, t) {
            var objSpace = mat4.create();
            objSpace = mat4.multiply(objSpace, tx, objSpace);
            objSpace = mat4.translate(objSpace, objSpace, [0.5, 0.1 + 0.2 * t, -0.5])

            ctx.beginPath();
            triangleTx([0, 0, 0], [0.1, 0, -0.2], [0.1, 1, -0.1], objSpace, 'yellow');

            // // p1 is the top, draw top triangles
            // var top = [0, 1, 0];
            // ctx.beginPath();
            // moveToTx(top, [-0.05, 0.5, 0], [-0.025, 0.5, 0.05], objSpace);
            // lineToTx(getNormal(top, [-0.05, 0.5, 0], [-0.025, 0.5, 0.05]), objSpace);
            // ctx.strokeStyle = 'red';
            // ctx.stroke();
            // if (checkNormal(getNormal(top, [-0.05, 0.5, 0], [-0.025, 0.5, 0.05]), tx)) {
            //     console.log(getNormal(top, [-0.05, 0.5, 0], [-0.025, 0.5, 0.05]));

            //     triangleTx(top, [-0.05, 0.5, 0], [-0.025, 0.5, 0.05], objSpace, 'limegreen');
            // }
            // if (checkNormal(getNormal(top, [-0.025, 0.5, 0.05], [0.025, 0.5, 0.05]), tx)) {
            //     console.log(getNormal(top, [-0.025, 0.5, 0.05], [0.025, 0.5, 0.05]), tx);
            //     triangleTx(top, [-0.025, 0.5, 0.05], [0.025, 0.5, 0.05], objSpace, 'limegreen');
            // }
            // if (checkNormal(getNormal(top, [0.025, 0.5, 0.05], [0.05, 0.5, 0]), tx)) {
            //     triangleTx(top, [0.025, 0.5, 0.05], [0.05, 0.5, 0], objSpace, 'limegreen');
            // }
            // if (checkNormal(getNormal(top, [0.05, 0.5, 0], [0.025, 0.5, -0.05]), tx)) {
            //     triangleTx(top, [0.05, 0.5, 0], [0.025, 0.5, -0.05], objSpace, 'limegreen');
            // }
            // if (checkNormal(getNormal(top, [0.025, 0.5, -0.05], [-0.025, 0.5, -0.05]), tx)) {
            //     triangleTx(top, [0.025, 0.5, -0.05], [-0.025, 0.5, -0.05], objSpace, 'limegreen');
            // }
            // if (checkNormal(getNormal(top, [-0.025, 0.5, -0.05], [-0.05, 0.5, 0]), tx)) {
            //     triangleTx(top, [-0.025, 0.5, -0.05], [-0.05, 0.5, 0], objSpace, 'limegreen');
            // }



        }

        // clear screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var vp = mat4.create(); // viewport
        vp = mat4.translate(vp, vp, [600, 300, 0]); // move where stuff gets drawn

        mat4.scale(vp, vp, [100, -100, 1]); // flip y

        var locCamera = vec3.create();
        var distCamera = 400.0;
        locCamera[0] = distCamera * Math.sin(viewAngle);
        locCamera[1] = 150;
        locCamera[2] = distCamera * Math.cos(viewAngle);
        var locTarget = vec3.fromValues(2.5, 1, -2.5); // aim at center of block
        var vecUp = vec3.fromValues(0, 1, 0);
        var TlookAt = mat4.create();
        mat4.lookAt(TlookAt, locCamera, locTarget, vecUp);

        var TprojectionCamera = mat4.create();
        mat4.perspective(TprojectionCamera, Math.PI / 4, 1, -1, 1);

        // Create transform t_VP_CAM that incorporates
        // Viewport and Camera transformations
        var tVP_CAM = mat4.create();
        mat4.multiply(tVP_CAM, vp, TprojectionCamera);
        mat4.multiply(tVP_CAM, vp, TlookAt);
        mat4.scale(tVP_CAM, tVP_CAM, [5, 1, 5])
        draw3DAxes("grey", tVP_CAM);

        //mat4.perspective(tVP_CAM, Math.PI / 3, 3 / 2, 1, null);

        // draw 'world map'
        var w = vec3.fromValues(locTarget[0] - locCamera[0], locTarget[1] - locCamera[1], locTarget[2] - locCamera[2])
        drawWorld(tVP_CAM, w);
    }


    function setup() {
        canvas = document.getElementById("p5canvas");
        ctx = canvas.getContext('2d');
        var slider1 = document.getElementById('slider1');
        slider1.value = 0;

    }
};