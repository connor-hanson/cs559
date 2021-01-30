var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var slider = document.getElementById('ctxslider');
var output = slider.value;


drawImage();
console.log("draw");

slider.oninput = function() {
    output = slider.value;
    console.log(output);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage();

    if (output == 10) {
        tripballs();
    }
}

function drawImage() {
    // top arc of shroom
    ctx.beginPath();
    ctx.arc(200, 100, 50, (5 * Math.PI) / 4, (7 * Math.PI) / 4, false);
    ctx.fill();

    // (-5, -35) relative to center of circle
    ctx.beginPath();
    ctx.rect(195, 64, 10, 40);
    ctx.fill();

    // bear body
    ctx.save();
    ctx.beginPath();
    ctx.scale(1, 2); // remember y*2 for everything
    ctx.arc(200, 175, 50, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "White";
    ctx.beginPath();
    ctx.arc(200, 175, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // head
    ctx.beginPath();
    ctx.arc(200, 225, 40, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "White";
    ctx.beginPath();
    // eyes
    ctx.arc(185, 215, 10, 0, 2 * Math.PI);
    ctx.arc(215, 215, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.arc(185, 210, 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.arc(215, 210, 3, 0, 2 * Math.PI);
    ctx.fill();

    // mouth
    ctx.save();
    ctx.fillStyle = "White";
    ctx.scale(2, 1)
    ctx.beginPath();
    ctx.arc(100, 240, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.arc(100, 235, 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(100, 245, 6, 0, Math.PI, true);
    ctx.fill();

    ctx.restore();

    //ears
    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.arc(230, 195, 15, 0, 2 * Math.PI);
    ctx.arc(170, 195, 15, 0, 2 * Math.PI);
    ctx.fill();

    //arms - move with slider
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(170, 300);
    ctx.lineTo(100, 175);
    ctx.lineTo(200 - output, 75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(230, 300);
    ctx.lineTo(300, 175);
    ctx.lineTo(2 + output, 75);
    ctx.stroke();
}

function tripballs() {
    // top arc of shroom
    ctx.fillStyle = "Red";
    ctx.beginPath();
    ctx.arc(200, 100, 50, (5 * Math.PI) / 4, (7 * Math.PI) / 4, false);
    ctx.fill();

    // (-5, -35) relative to center of circle
    ctx.fillStyle = "#654321";
    ctx.beginPath();
    ctx.rect(195, 64, 10, 40);
    ctx.fill();

    // bear body
    ctx.fillStyle = "Black";
    ctx.save();
    ctx.beginPath();
    ctx.scale(1, 2); // remember y*2 for everything
    ctx.arc(200, 175, 50, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "White";
    ctx.beginPath();
    ctx.arc(200, 175, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // head
    ctx.beginPath();
    ctx.arc(200, 225, 40, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "White";
    ctx.beginPath();
    // eyes
    ctx.arc(185, 215, 10, 0, 2 * Math.PI);
    ctx.arc(215, 215, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.arc(185, 210, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.arc(215, 210, 5, 0, 2 * Math.PI);
    ctx.fill();

    // mouth
    ctx.save();
    ctx.fillStyle = "White";
    ctx.scale(2, 1)
    ctx.beginPath();
    ctx.arc(100, 240, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.arc(100, 235, 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(100, 240, 8, 0, Math.PI);
    ctx.fill();

    ctx.restore();

    //ears
    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.arc(230, 195, 15, 0, 2 * Math.PI);
    ctx.arc(170, 195, 15, 0, 2 * Math.PI);
    ctx.fill();

    //arms - move with slider
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(170, 300);
    ctx.lineTo(100, 175);
    ctx.lineTo(200 - output, 75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(230, 300);
    ctx.lineTo(300, 175);
    ctx.lineTo(2 + output, 75);
    ctx.stroke();
}








// context.beginPath();
// context.moveTo(100, 100);
// context.lineTo(200, 100);