window.onload = function() {

    // Skateboarder riding through a randomly generated 'city'
    // His head bobs to some music he is listening to (no way!)
    // He is also very talented (omg how so?). He can ollie while still bobbing his head (wow)
    //     if you press the jump button under the canvas
    // Author: Connor Hanson, cbhanson2@wisc.edu

    console.log("Window loaded");
    var canvas;
    var ctx; // graphics context being manipulated
    var jumpActive = false; // flag to check if jump is in progress
    var jumpDown = false;
    const speed = 2; // -1 to jump up, 1 to jump down
    var dy = 0,
        dx = 0,
        rot = 0;

    var headRot = 0;
    var headDir = 1; // 1 to rotate foward, -1 for backwards
    // lol get it? head..Dir //

    setupContext();
    document.getElementById("jump_button").addEventListener("click", () => jumpActive = !jumpActive);

    // arbitrary values
    const xDiff = 175;
    const yDiff = canvas.height;

    var backDropData = genBackdrop(); // pass array data

    // 60 fps
    window.setInterval(
        function() {

            ctx.restore(); // pop default ctx
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            dx -= speed;
            if (dx <= -1100) {
                dx = 0;
            }
            ctx.translate(dx, yDiff);
            drawBackdrop(backDropData);
            ctx.restore();
            ctx.save();
            ctx.translate(xDiff, yDiff); // move to where the drawing starts
            ctx.scale(3, 3);

            if (jumpActive) {
                doJump(); // figure & board drawn inside jump method
            } else {
                drawFigure("none");
                drawBoard();
            }
            ctx.restore();
        }, 1000 / 60);

    // randomly generate variables for moving backdrop. Nothing drawn yet.
    // return height and width of 'buildings' in array of arrays
    function genBackdrop() {
        var height = [];
        var width = [];

        for (var i = 0; i < 20; i++) {
            height[i] = -1 * Math.floor(Math.random(1) * (500 - 200) + 200); // between 200 & 499
            width[i] = Math.floor(Math.random(1) * (200 - 50) + 50); // 50 - 199
        }

        var arr = [height, width];
        return arr;
    }

    // draw this on 1st ctx transform
    // param is an array[2] of arrays
    function drawBackdrop(arrayData) {
        var drawHeight = arrayData[0]; // building height
        var drawWidth = arrayData[1];
        var currX = 0;
        var currY = 0; // current draw coords

        for (var i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(currX, currY);
            ctx.lineTo(currX, drawHeight[i]);
            ctx.lineTo(currX + drawWidth[i], drawHeight[i]);
            ctx.stroke();
            // set variables for next iteration
            currX = currX + drawWidth[i];
            currY = drawHeight[i];
        }
    }


    function doJump() {
        ctx.save();
        drawPop(); // draw text
        if (jumpDown) { // down
            ctx.translate(0, dy += speed);
            jumpDown == true;
        } else { // up
            ctx.translate(0, dy -= speed);
        }

        // draw rotation of board
        ctx.save();
        drawBoard(0, 0);
        drawFigure("ollie");
        ctx.restore();

        // still jumping up
        if (dy >= 0) {
            jumpActive = false;
            jumpDown = false;
            dy = 0;
            rot = 0;
        } else if (dy <= -100) { // now on descent
            jumpDown = true;
        }
        // jump popped from stack
        ctx.restore();
    }

    function drawBoard() {
        // adjust context for board rotation
        if (jumpActive && !jumpDown && dy >= -50) {
            ctx.rotate(rot-- * Math.PI / 180);
        } else if (jumpActive && !jumpDown && dy < -50) {
            ctx.rotate(rot++ * Math.PI / 180);
        }
        // draw in halves to make jumping more intuitive
        ctx.beginPath()
        ctx.moveTo(0, -5);
        ctx.lineTo(25, -5);
        ctx.stroke();

        ctx.beginPath()
        ctx.moveTo(0, -5);
        ctx.lineTo(-25, -5);
        ctx.stroke();

        // wheels
        ctx.beginPath();
        ctx.arc(15, -2.5, 2.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-15, -2.5, 2.5, 0, 2 * Math.PI);
        ctx.fill();
    }

    // stick figure riding a skateboard over jumps and stuff
    // int x, y as parameters for bottom corner of hitbox
    function drawFigure(trick) {
        ctx.save();
        if (trick == "ollie") {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, -25);
            ctx.lineTo(10 - rot / 4, -15 + rot / 4);
            ctx.lineTo(15, -5)
            ctx.stroke();
            ctx.moveTo(0, -25);
            ctx.lineTo(-15 + rot / 4, -5);
            ctx.stroke();
            ctx.restore();
        } else {
            // stick figure; legs
            ctx.beginPath();
            ctx.moveTo(-15, -5);
            ctx.lineTo(0, -25);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(15, -5);
            ctx.lineTo(0, -25);
            ctx.stroke();
        }

        //bod
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(0, -60);
        ctx.stroke();
        ctx.moveTo(0, -55);
        ctx.lineTo(-20, -45);
        ctx.stroke();
        ctx.moveTo(0, -55);
        ctx.lineTo(20, -45);
        ctx.stroke();

        // head bobbing to music
        ctx.save();
        ctx.translate(0, -60);
        if (headRot >= 35 || headRot <= -25) {
            headDir *= -1;
        }
        headRot += headDir;

        ctx.rotate(headRot * Math.PI / 180);
        ctx.clearRect(-10, -20, 20, 20);
        ctx.beginPath();
        ctx.arc(0, -10, 10, 0, 2 * Math.PI);
        ctx.stroke();

        //draw his hat
        ctx.beginPath();
        ctx.arc(0, -10, 10, 180 * Math.PI / 180, -45 * Math.PI / 180);
        ctx.fill();

        //sunglasses
        ctx.beginPath();
        ctx.arc(6, -12, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        ctx.restore();
    }

    // little pop appears when jumping
    function drawPop() {
        ctx.save();
        ctx.font = "10px Comic Sans MS";
        ctx.strokeText("POP!", -40, -10);
        ctx.restore();
    }

    function setupContext() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        ctx.save();
    }

};