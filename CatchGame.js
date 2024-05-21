
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 655;
canvas.height = 570;


var roleWidth = 70;
var roleHeight = 70;
var bgBoundaryWidth = canvas.width - roleWidth;
var bgBoundaryHeight = canvas.height - roleHeight;
var patrickMoveId;
var speedInterval = 5000;



var bgReady = false;
var bgImg = new Image();
bgImg.src = "images/background.png";
bgImg.onload = function () {
    bgReady = true;
};


var spongebobReady = false;
var spongebobImg = new Image();
spongebobImg.src = "images/angry_spongebob.png";
spongebobImg.onload = function () {
    spongebobReady = true;
};

var patrickReady = false;
var patrickImg = new Image();
patrickImg.src = "images/patrick.png";
patrickImg.onload = function () {
    patrickReady = true;
};


var spongebob = {
    speed: 256,
    x: canvas.width / 2,
    y: canvas.height / 2
};
var patrick = {
    x: 0,
    y: 0
};
var patrickCaught = 0;


var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);



var reset = function () {
    
    patrick.x = Math.random() * bgBoundaryWidth;
    patrick.y = Math.random() * bgBoundaryHeight;

    if (patrick.x < 0 || patrick.x > bgBoundaryWidth || patrick.y < 0 || patrick.y > bgBoundaryHeight) {
        patrick.x = Math.random() * bgBoundaryWidth;
        patrick.y = Math.random() * bgBoundaryHeight;
    }
};



function startpatrickMove() {
    patrickMoveId = setInterval(reset, speedInterval);
}


function stoppatrickMove() {
    clearInterval(patrickMoveId);
}


function resetScore() {
    patrickCaught = 0;
}


function resetSpeedInterval() {
    stoppatrickMove();
    speedInterval = 5000;
}


var update = function (modifier) {
    if (38 in keysDown) { 
        if (spongebob.y > 0) {
            spongebob.y -= spongebob.speed * modifier;
        }
    }
    if (40 in keysDown) { 
        if (spongebob.y < bgBoundaryHeight) {
            spongebob.y += spongebob.speed * modifier;
        }
    }
    if (37 in keysDown) { 
        if (spongebob.x > 0) {
            spongebob.x -= spongebob.speed * modifier;
        }
    }
    if (39 in keysDown) { 
        if (spongebob.x < bgBoundaryWidth) {
            spongebob.x += spongebob.speed * modifier;
        }
    }
    
    
    if (
        spongebob.x <= (patrick.x + roleWidth / 2)
        && patrick.x <= (spongebob.x + roleWidth / 2)
        && spongebob.y <= (patrick.y + roleHeight / 2)
        && patrick.y <= (spongebob.y + roleHeight / 2)
       )
    {
        spongebobImg.src = "images/spongebob.png";
        patrickImg.src = "images/angry_patrick.png";
        setTimeout(function () {
            spongebobImg.src = "images/angry_spongebob.png";
            patrickImg.src = "images/patrick.png";
        }, 500);

        if (speedInterval > 500) {
            speedInterval -= 500;
        }
        stoppatrickMove();
        startpatrickMove();
        ++patrickCaught;
        reset();
    }
};


var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImg, 0, 0);
    }
    if (spongebobReady) {
        ctx.drawImage(spongebobImg, spongebob.x, spongebob.y, roleWidth, roleHeight);
    }
    if (patrickReady) {
        ctx.drawImage(patrickImg, patrick.x, patrick.y, roleWidth, roleHeight);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseLine = "top";
    ctx.fillText("Score: " + patrickCaught, roleWidth / 4, roleHeight / 2);

};


var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

 
    requestAnimationFrame(main);
};


var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


var then = Date.now();
reset();
main();


startpatrickMove();