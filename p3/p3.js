window.onload = function() {

    var canvas;
    var ctx;
    var dt;

    var treble, note, double_note;

    setupCtx();

    function run() {
        dt = 0;
        setInterval(function() {
            draw();
            dt++;
        }, 1000 / 60);
    }

    function setBaseTx() {
        var tx = mat3.create(); // center wheel containing other 3 wheels
        mat3.fromTranslation(tx, [300, 300]);
        ctx.setTransform(tx[0], tx[1], tx[3], tx[4], tx[6], tx[7]);
        return tx;
    }

    function draw() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        tx = setBaseTx();
        // wheel 1
        var w1 = mat3.create();
        mat3.fromTranslation(w1, [-200, 0]);
        mat3.rotate(tx, tx, dt * Math.PI / 180);
        mat3.rotate(w1, w1, dt * Math.PI / 180);
        mat3.mul(w1, tx, w1);
        ctx.setTransform(w1[0], w1[1], w1[3], w1[4], w1[6], w1[7]);
        drawColorWheel("treble");

        // wheel 2
        var w2 = mat3.create();
        tx = setBaseTx();
        mat3.fromTranslation(w2, [-200, 0]);
        mat3.rotate(tx, tx, (120 + dt) * Math.PI / 180);
        mat3.rotate(w2, w2, (-120 + 0.5 * dt) * Math.PI / 180);
        mat3.mul(w2, tx, w2);
        ctx.setTransform(w2[0], w2[1], w2[3], w2[4], w2[6], w2[7]);
        drawColorWheel("note");

        // wheel 3
        var w3 = mat3.create();
        tx = setBaseTx();
        mat3.fromTranslation(w3, [-200, 0]);
        mat3.rotate(tx, tx, (240 + dt) * Math.PI / 180);
        mat3.rotate(w3, w3, (-240 - dt) * Math.PI / 180);
        mat3.mul(w3, tx, w3);
        ctx.setTransform(w3[0], w3[1], w3[3], w3[4], w3[6], w3[7]);
        drawColorWheel("double_note");


    }

    // draw a color wheel with a specific kind of note inside
    // image loading is async, so pass current transform to image
    function drawColorWheel(noteType, img_tx) {
        ctx.beginPath();

        // draw outside color layer
        for (var i = 0; i < 8; ++i) {
            switch (i) {
                case 0: // Red
                    ctx.fillStyle = '#FF0000';
                    break;
                case 1: // Orange
                    ctx.fillStyle = '#FFA500';
                    break;
                case 2: // Yellow
                    ctx.fillStyle = '#FFFF00';
                    break;
                case 3: // Green
                    ctx.fillStyle = '#008000';
                    break;
                case 4: // Cyan
                    ctx.fillStyle = '#00FFFF';
                    break;
                case 5: // Blue
                    ctx.fillStyle = '#0000FF';
                    break;
                case 6: // Purp
                    ctx.fillStyle = '#800080';
                    break;
                case 7: // Magenta
                    ctx.fillStyle = '#FF00FF';
                    break;
                default: // black
                    ctx.fillStyle = '#0';
                    break;
            }
        }

        // draw inside color layer
        ctx.beginPath()
        ctx.moveTo(0, 0);
        for (var i = 0; i < 8; ++i) {
            switch (i) {
                case 0: // Red
                    ctx.fillStyle = '#FF0000';
                    break;
                case 1: // Orange
                    ctx.fillStyle = '#FFA500';
                    break;
                case 2: // Yellow
                    ctx.fillStyle = '#FFFF00';
                    break;
                case 3: // Green
                    ctx.fillStyle = '#008000';
                    break;
                case 4: // Cyan
                    ctx.fillStyle = '#00FFFF';
                    break;
                case 5: // Blue
                    ctx.fillStyle = '#0000FF';
                    break;
                case 6: // Purp
                    ctx.fillStyle = '#800080';
                    break;
                case 7: // Magenta
                    ctx.fillStyle = '#FF00FF';
                    break;
                default: // black
                    ctx.fillStyle = '#0';
                    break;
            }
            ctx.beginPath()
            ctx.moveTo(0, 0);
            // get weird
            ctx.arc(0, 0, 90 - (dt % 60) / 3, (45 * i) * (Math.PI / 180), 45 * (i + 1) * (Math.PI / 180), false);
            ctx.lineTo(0, 0)
            ctx.fill();

            ctx.lineTo(0, 0)
            ctx.fill();

        }

        // draw inside white layer
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.arc(0, 0, 70, 0, 2 * Math.PI, false);
        ctx.fill();

        var rad;
        // color circle in sections
        for (var i = 0; i < 8; ++i) {
            switch (i) {
                case 0: // Red
                    ctx.fillStyle = '#FF0000';
                    break;
                case 1: // Orange
                    ctx.fillStyle = '#FFA500';
                    break;
                case 2: // Yellow
                    ctx.fillStyle = '#FFFF00';
                    break;
                case 3: // Green
                    ctx.fillStyle = '#008000';
                    break;
                case 4: // Cyan
                    ctx.fillStyle = '#00FFFF';
                    break;
                case 5: // Blue
                    ctx.fillStyle = '#0000FF';
                    break;
                case 6: // Purp
                    ctx.fillStyle = '#800080';
                    break;
                case 7: // Magenta
                    ctx.fillStyle = '#FF00FF';
                    break;
                default: // black
                    ctx.fillStyle = '#0';
                    break;
            }
            ctx.beginPath()
            ctx.moveTo(0, 0);
            if (dt % 60 <= 6) {
                ctx.arc(0, 0, 55, (45 * i) * (Math.PI / 180), 45 * (i + 1) * (Math.PI / 180), false);
            } else {
                ctx.arc(0, 0, 50, (45 * i) * (Math.PI / 180), 45 * (i + 1) * (Math.PI / 180), false);
            }
            ctx.lineTo(0, 0)
            ctx.fill();

        }

        // draw empty space in middle
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(0, 0, 40, 0, 2 * Math.PI);
        ctx.fill();

        // insert note into middle
        drawNote(noteType);

    }

    function drawNote(noteType) {
        var img;
        if (noteType === 'treble') {
            img = treble;
        } else if (noteType === 'note') {
            img = note;
        } else {
            img = double_note;
        }
        //console.log(img);
        ctx.beginPath();
        ctx.drawImage(img, -15, -30, 30, 60);
        ctx.stroke();
    }

    function loadImages() {
        var img = new Image();
        var cwd = (window.location.pathname).substring(0, (window.location.pathname).lastIndexOf('/'));

        img.onload = function() {
            treble = img;
            img = new Image();
            img.onload = function() {
                note = img;
                img = new Image();
                img.onload = function() {
                    double_note = img;
                    run();
                }
                img.src = cwd + '/resources/double_note.png';
            }
            img.src = cwd + '/resources/note.png';
            //console.log("loaded");
        }

        img.onerror = function(err) {
            console.log(err);
        }
        img.src = cwd + '/resources/treble.png';
        //console.log(img.src);
    }

    function setupCtx() {
        canvas = document.getElementById("p3_canvas");
        ctx = canvas.getContext('2d');
        loadImages();
    }
};