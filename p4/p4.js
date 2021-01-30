// bee vistiting flower and home nest. does loops and shit

window.onload =
    function() {
        var canvas;
        var ctx;

        var showLine = true;

        var button = document.getElementById("toggle_btn");
        button.addEventListener('click', () => {
            showLine = !showLine;
        });

        // variable returning [x,y] vector
        var sineSpiro = function(t) {
            var R = 20 * Math.sin(t); // sin(t)
            var x = R * Math.cos(2 * Math.PI * t); // R * cos(2pit)
            var y = R * Math.sin(2 * Math.PI * t); // R * sin(2pit)
            return [x, y]
        };

        // fuck hermite functions but they make cool shapes so whatever
        var Hermite = function(t) {
            return [
                2 * t * t * t - 3 * t * t + 1,
                t * t * t - 2 * t * t + t, -2 * t * t * t + 3 * t * t,
                t * t * t - t * t
            ]
        };

        // P = [p0, p1, d0, d1]
        function cubic(basis, P, t) {
            var b = basis(t);
            var result = vec2.create();
            vec2.scale(result, P[0], b[0]);
            vec2.scaleAndAdd(result, result, P[1], b[1]);
            vec2.scaleAndAdd(result, result, P[2], b[2]);
            vec2.scaleAndAdd(result, result, P[3], b[3]);
            return result;
        }

        setupContext();
        run();

        function run() {
            var dt = 0;

            setInterval(function() {
                drawPath(dt);
                dt += 1;

                if (dt > 2700) {
                    dt = 0;
                }
            }, 1000 / 60);
        }

        // [start point]
        // [start slope]
        // [end point]
        // [end slope]
        var H0 = [
            [0, 0],
            [0, 200],
            [100, 75],
            [0, 0]
        ];

        // loop
        var H1 = [
            [0, 0],
            [0, 0],
            [50, -25],
            [0, -100]
        ];

        // top of loop
        var H2 = [
            [0, 0],
            [0, -100],
            [-30, 0],
            [0, 100]
        ];

        var H3 = [
            [0, 0],
            [0, 100],
            [50, 25],
            [0, 0]
        ];

        // flower area
        var H4 = [
            [0, 0],
            [0, 0],
            [100, -50],
            [-100, -100]
        ];

        var H6 = [
            [0, 0],
            [200, -200],
            [-125, -100],
            [-200, 0]
        ]

        var H7 = [
            [0, 0],
            [-200, 0],
            [-140, 70],
            [0, 200]
        ]


        var C0 = function(t_) { return cubic(Hermite, H0, t_); };
        var C1 = function(t_) { return cubic(Hermite, H1, t_); };
        var C2 = function(t_) { return cubic(Hermite, H2, t_); };
        var C3 = function(t_) { return cubic(Hermite, H3, t_); };
        var C4 = function(t_) { return cubic(Hermite, H4, t_); };
        var C5 = function(t_) { return sineSpiro(t_); }
        var C6 = function(t_) { return cubic(Hermite, H6, t_); };
        var C7 = function(t_) { return cubic(Hermite, H7, t_); };
        var C8 = function(t_) { return sineSpiro(t_); }

        // context transformations done using matrices
        function drawPath(dt) {
            //var tmp = 1;
            // [1 0 0]
            // [0 1 0]
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // translate to 250, 250
            var txhome = mat3.create();
            txhome = mat3.translate(txhome, txhome, [100, 250]);
            ctx.setTransform(txhome[0], txhome[1], txhome[3], txhome[4], txhome[6], txhome[7]);
            background();

            // p0, d0, p1, d1
            var pos = drawTraj(0, 1, 100, C0);

            // translate more
            tx1 = mat3.create();
            tx1 = mat3.translate(tx1, tx1, pos);
            tx1 = mat3.mul(tx1, txhome, tx1);
            ctx.setTransform(tx1[0], tx1[1], tx1[3], tx1[4], tx1[6], tx1[7]);
            pos = drawTraj(0, 1, 100, C1);


            var tx2 = mat3.create();
            tx2 = mat3.translate(tx2, tx2, pos);
            tx2 = mat3.mul(tx2, tx2, tx1);
            ctx.setTransform(tx2[0], tx2[1], tx2[3], tx2[4], tx2[6], tx2[7]);
            pos = drawTraj(0, 1, 100, C2);

            var tx3 = mat3.create();
            tx3 = mat3.translate(tx3, tx3, pos);
            tx3 = mat3.mul(tx3, tx2, tx3);
            ctx.setTransform(tx3[0], tx3[1], tx3[3], tx3[4], tx3[6], tx3[7]);
            pos = drawTraj(0, 1, 100, C3);

            var tx4 = mat3.create();
            tx4 = mat3.translate(tx4, tx4, pos);
            tx4 = mat3.mul(tx4, tx3, tx4);
            ctx.setTransform(tx4[0], tx4[1], tx4[3], tx4[4], tx4[6], tx4[7]);
            pos = drawTraj(0, 1, 100, C4);

            // Jittery motion by flower
            var tx5 = mat3.create();
            tx5 = mat3.translate(tx5, tx5, pos);
            tx5 = mat3.mul(tx5, tx4, tx5);
            ctx.setTransform(tx5[0], tx5[1], tx5[3], tx5[4], tx5[6], tx5[7]);
            pos = drawTraj(0, 10, 100, C5);

            var tx6 = mat3.create();
            tx6 = mat3.translate(tx6, tx6, pos);
            tx6 = mat3.mul(tx6, tx5, tx6);
            ctx.setTransform(tx6[0], tx6[1], tx6[3], tx6[4], tx6[6], tx6[7]);
            pos = drawTraj(0, 1, 100, C6);

            var tx7 = mat3.create();
            tx7 = mat3.translate(tx7, tx7, pos);
            tx7 = mat3.mul(tx7, tx6, tx7);
            ctx.setTransform(tx7[0], tx7[1], tx7[3], tx7[4], tx7[6], tx7[7]);
            pos = drawTraj(0, 1, 100, C7);

            var tx8 = mat3.create();
            tx8 = mat3.translate(tx8, tx8, pos);
            tx8 = mat3.mul(tx8, tx7, tx8);
            ctx.setTransform(tx8[0], tx8[1], tx8[3], tx8[4], tx8[6], tx8[7]);
            pos = drawTraj(0, 10, 100, C8); // more squigglies

            var t = dt / 100;

            if (t <= 1) {
                ctx.setTransform(txhome[0], txhome[1], txhome[3], txhome[4], txhome[6], txhome[7]);
                drawBee(C0(t))
            } else if (t > 1 && t <= 2) {
                ctx.setTransform(tx1[0], tx1[1], tx1[3], tx1[4], tx1[6], tx1[7]);
                drawBee(C1(t - 1));
            } else if (t > 2 && t <= 3) {
                ctx.setTransform(tx2[0], tx2[1], tx2[3], tx2[4], tx2[6], tx2[7]);
                drawBee(C2(t - 2));
            } else if (t > 3 && t <= 4) {
                ctx.setTransform(tx3[0], tx3[1], tx3[3], tx3[4], tx3[6], tx3[7]);
                drawBee(C3(t - 3));
            } else if (t > 4 && t <= 5) {
                ctx.setTransform(tx4[0], tx4[1], tx4[3], tx4[4], tx4[6], tx4[7]);
                drawBee(C4(t - 4));
            } else if (t > 5 && t <= 15) {
                ctx.setTransform(tx5[0], tx5[1], tx5[3], tx5[4], tx5[6], tx5[7]);
                drawBee(C5(t - 5));
            } else if (t > 15 && t <= 16) {
                ctx.setTransform(tx6[0], tx6[1], tx6[3], tx6[4], tx6[6], tx6[7]);
                drawBee(C6(t - 15));
            } else if (t > 16 && t <= 17) {
                ctx.setTransform(tx7[0], tx7[1], tx7[3], tx7[4], tx7[6], tx7[7]);
                drawBee(C7(t - 16));
            } else if (t > 17 && t <= 27) {
                ctx.setTransform(tx8[0], tx8[1], tx8[3], tx8[4], tx8[6], tx8[7]);
                drawBee(C8(t - 17));
            }


        }

        // return final position as a vector
        function drawTraj(tStart, tEnd, intervals, curve, tx, dt) {
            if (showLine) { ctx.beginPath(); }
            for (var i = 0; i < intervals; i++) {
                var t = ((intervals - i) / intervals) * tStart + (i / intervals) * tEnd;
                var tmp = curve(t);
                if (showLine) { ctx.lineTo(tmp[0], tmp[1]); }
            }
            if (showLine) { ctx.stroke() }
            return [tmp[0], tmp[1]];
        }

        function drawBee(curve) {
            ctx.save();
            ctx.translate(curve[0], curve[1]);
            ctx.save();
            ctx.scale(2, 1); // elongate body
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            ctx.beginPath();
            ctx.arc(10, 0, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();

        }

        function background() {
            ctx.save();
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.rect(-100, 0, canvas.width, canvas.height); // grass

            ctx.fill();
            ctx.restore();
        }

        function setupContext() {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext('2d');
        }
    }