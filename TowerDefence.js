var soldier = document.getElementById("soldier");
var bullet1 = document.getElementById("bullet1");
var bullet2 = document.getElementById("bullet2");
var bomb = document.getElementById("bomb");
var movementBoost = document.getElementById("movementBoost");
var shootBoost = document.getElementById("shootBoost");
var heal = document.getElementById("heal");
var myHp = document.getElementById("myHp");
var bum = document.getElementById("bum");
var lostHp = document.getElementById("lostHp");
var endWindow = document.getElementById("endWindow");
var endText = document.getElementById("endText");
var lostImage = document.getElementById("lostImage");
var counter = 0;
var attackSpeed = 2;
var shootSpeed = 2;
var movementSpeed = 13;
var x = Math.floor(Math.random() * 930);
var isActive = false;
var restart = document.getElementById("restart");
let start;

function pause() {
    alert("Zapauzowałeś swoją grę, ale wracaj szybko bo sama się nie dogra ;)");
}

function refresh() {
    window.location.reload()
}

function play() {
    if(!isActive) {
        setTimeout(attack, 2);
        setTimeout(boost.bind(null, heal), 7000);
        setTimeout(boost.bind(null, movementBoost), 16000);
        setTimeout(boost.bind(null, shootBoost), 24000);
        window.addEventListener('keydown', move);
        showScore();
        isActive = true;
    }
}

function attack() {
    bomb.x.baseVal.value = x;
    bomb.y.baseVal.value += attackSpeed;
    if(bomb.y.baseVal.value+160 >= 740) {
        bomb.y.baseVal.value = -250;
        x = Math.floor(Math.random() * 930);
        bomb.x.baseVal.value = x;
        lostHp.width.baseVal.value += 30;
    }
    if(counter < 5) attackSpeed = 1;
    else if(counter <25) attackSpeed = 2;
    else if(counter <50) attackSpeed = 3;
    else if(counter <75) attackSpeed = 4;
    else attackSpeed = 5;
    setTimeout(attack, 5);
    gameOver();
}

function gameOver() {
    if(lostHp.width.baseVal.value == 300) {
        endWindow.x.baseVal.value = 0;
        endWindow.y.baseVal.value = 0;
        endText.setAttribute("x", 300);
        endText.setAttribute("y", 300);
        endText.setAttribute("font-size", 160);
        lostImage.setAttribute("x", 20);
        lostImage.setAttribute("y", 460);
        restart.setAttribute("x", 500);
        restart.setAttribute("y", 400);
    }
}

function boost(object) {
    object.y.baseVal.value += 2;
    var xPosition = Math.floor(Math.random() * 930);
    setTimeout(boost.bind(null, object, xPosition), 50);
    if(object.y.baseVal.value + 170 == 740) {
        object.y.baseVal.value = -850;
        xPosition = Math.floor(Math.random() * 930);
        object.x.baseVal.value = xPosition;
    }
    hitBoost(object, xPosition);
}

function hitBoost(object, xPosition) {
    if(bullet1.cy.baseVal.value <= object.y.baseVal.value+170
        && bullet1.cy.baseVal.value >= object.y.baseVal.value+80
        && bullet1.cx.baseVal.value >= object.x.baseVal.value
        && bullet1.cx.baseVal.value <= object.x.baseVal.value+170) {
        hitBoostHelp(object);
    }
    if(bullet2.cy.baseVal.value <= object.y.baseVal.value+170
        && bullet2.cy.baseVal.value >= object.y.baseVal.value+80
        && bullet2.cx.baseVal.value >= object.x.baseVal.value
        && bullet2.cx.baseVal.value <= object.x.baseVal.value+170) {
        hitBoostHelp(object);
    }
}

function hitBoostHelp(object) {
    clearInterval(start);
    start = null;
    bullet1.cy.baseVal.value = 540;
    bullet2.cy.baseVal.value = 540;
    object.y.baseVal.value = -850;
    var xPosition = Math.floor(Math.random() * 930);
    object.x.baseVal.value = xPosition;
    if(object == heal)  lostHp.width.baseVal.value -= 30;
    if(object == shootBoost)  shootSpeed += 0.5;
    if(object == movementBoost)  movementSpeed += 2;
}

function move(e) {
    switch (e.keyCode) {
        case 65:
            leftPressed();
            break;
        case 37:
            leftPressed();
            break;
        case 68 :
            rightPressed();
            break;
        case 39 :
            rightPressed();
            break;
        case 16 :
            if(!start) {
                start = setInterval('shoot()', 0);
            }
            break;
    }
}

function rightPressed() {
    var x = soldier.x.baseVal.value;
    var xb1 = bullet1.cx.baseVal.value;
    var xb2 = bullet2.cx.baseVal.value;
    x += movementSpeed;
    xb1 += movementSpeed;
    xb2 += movementSpeed;
    if(x > 930) {
        x = 930;
        xb1 = 1000;
        xb2 = 1070;
    }
    bullet1.cx.baseVal.value = xb1;
    bullet2.cx.baseVal.value = xb2;
    soldier.x.baseVal.value = x;
}

function leftPressed() {
    var x = soldier.x.baseVal.value;
    var xb1 = bullet1.cx.baseVal.value;
    var xb2 = bullet2.cx.baseVal.value;
    x -= movementSpeed;
    xb1 -= movementSpeed;
    xb2 -= movementSpeed;
    if(x < 2) {
        x = 2;
        xb1 = 72;
        xb2 = 145;
    }
    bullet1.cx.baseVal.value = xb1;
    bullet2.cx.baseVal.value = xb2;
    soldier.x.baseVal.value = x;
}

function shoot() {
    bullet1.cy.baseVal.value -= shootSpeed;
    bullet2.cy.baseVal.value -= shootSpeed;
    hit();
    endOfArea();
}

function endOfArea() {
    if(bullet1.cy.baseVal.value == 20) {
        clearInterval(start);
        start = null;
        bullet1.cy.baseVal.value = 540;
        bullet2.cy.baseVal.value = 540;
    }
}

function hit() {
    if(bullet1.cy.baseVal.value <= bomb.y.baseVal.value+160
        && bullet1.cy.baseVal.value >= bomb.y.baseVal.value+80
        && bullet1.cx.baseVal.value >= bomb.x.baseVal.value
        && bullet1.cx.baseVal.value <= bomb.x.baseVal.value+220) {
        hitHelp();
    }
    if(bullet2.cy.baseVal.value <= bomb.y.baseVal.value+160
        && bullet2.cy.baseVal.value >= bomb.y.baseVal.value+80
        && bullet2.cx.baseVal.value >= bomb.x.baseVal.value
        && bullet2.cx.baseVal.value <= bomb.x.baseVal.value+220) {
        hitHelp();
    }
}

function hitHelp(a) {
    clearInterval(start);
    start = null;
    bullet1.cy.baseVal.value = 540;
    bullet2.cy.baseVal.value = 540;
    bum.y.baseVal.value = bomb.y.baseVal.value - 20;
    bum.x.baseVal.value = bomb.x.baseVal.value;
    setTimeout(() => {bum.style.display='none';}, 1000);
    bum.style.display='block';
    bomb.y.baseVal.value = -320;
    counter += 1;
    showScore();
    x = Math.floor(Math.random() * 930);
}

function showScore() {
    const score = document.getElementById("score");
    score.firstChild.data = counter;
}