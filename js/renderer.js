// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var kanal1 = document.getElementById("kanal1"),
    kanal2 = document.getElementById("kanal2"),
    kanal3 = document.getElementById("kanal3"),
    kanal4 = document.getElementById("kanal4"),
    kanal5 = document.getElementById("kanal5"),
    tube1 = document.getElementsByName("tube1")[0],
    tube2 = document.getElementsByName("tube2")[0],
    tube3 = document.getElementsByName("tube3")[0],
    tube4 = document.getElementsByName("tube4")[0],
    tube5 = document.getElementsByName("tube5")[0],
    ges1 = document.getElementById("ges1"),
    ges2 = document.getElementById("ges2"),
    ges3 = document.getElementById("ges3"),
    gesEnd = document.getElementById("ges-end"),
    timeFulling = document.getElementsByClassName("timeFulling"),
    volume = document.getElementsByClassName("volume");

function speedViewer(s) {
    s = Number(s);
    if(s < 0 || s === undefined || s === null){ s = 0;}
    if(s > 10){ s = 10;}
    return s;
}

function deactivateInput(input, cond) {
    if(cond){input.readOnly = "readonly"}
    else{input.readOnly = ""}
}

function percentCounter(y0, y1, diffY) {
    var percent = (((y0 - y1) * 80) / diffY + 20).toFixed(2);
    if (percent > 100) percent = 100;
    if (percent < 20) percent = 20;
    return percent;
}

function TimeFull(y0, y1, dy, t) {
    t /= 1000;
    var time = ( 500 * t - ((t * (y0 - y1) * diff) / dy)).toFixed(2);
    if (time < 0) time = 0;
    return time;
}

var mainSpeed = 500;
var time = 0,
    condition = true,
    filling = true,
    starter = true,
    empty = true,
    full = false;

function HPS1() {
    var speed = speedViewer(tube1.value),
        speedOutput = speedViewer(tube2.value);

    if (!condition2){ HPS2();}

    if (speed > speedOutput){

        time = mainSpeed / (speed - speedOutput);
        condition = true;
        filling = true;
        if (starter) {fillInHPS(); starter = false;}

    }else if (speedOutput === speed){
        condition = false;
        starter = true;
    }else {

        time = mainSpeed / (speedOutput - speed);
        condition = true;
        filling = false;
        if (starter) {fillInHPS(); starter = false;}
    }
}

tube1.oninput = function(){ HPS1(); Tube1();};

var x1 = 74.695, y1 = 46.682, x2 = 83.305,
    diffX, diffY, diffX2, diff = 500, heightTube;

function fillInHPS() {
    diffX = 1.895; diffY = 16; diffX2 = 4.595; heightTube = 0.2;
    deactivateInput(tube2, empty);
    var speed = speedViewer(tube1.value);

    if (filling){
        x1 -= diffX / diff;
        x2 += diffX2 / diff;
        y1 -= diffY / diff;

        if (x1 < 72.8){ condition = false; starter = true; full = true; HPS2();}
        if (y1 < (46.682 - heightTube * speed)) empty = false;

    }else {
        full = false;
        x1 += diffX / diff;
        x2 -= diffX2 / diff;
        y1 += diffY / diff;

        if (x2 < 83.3 || y1 > (46.682 - heightTube * speed)){
            condition = false; starter = true; empty = true; HPS2();
        }
    }

    volume[0].innerText = percentCounter(46.682, y1, diffY) + "%";
    timeFulling[0].innerText = TimeFull(46.682, y1, diffY, time) + "c";

    ges1.style.clipPath = "polygon(" + x1 + "% " + y1 + "%, " + x2 + "% " + y1 + "%, 82.8% 49.1%, 75.3% 49.1%)";

    if (condition) setTimeout(fillInHPS, time);
}

var time2 = 0,
    condition2 = true,
    filling2 = true,
    starter2 = true,
    empty2 = true,
    full2 = false;

function HPS2() {

    var speed = speedViewer(tube2.value),
        speedOutput = speedViewer(tube3.value),
        speedHPS1 = speedViewer(tube1.value);

    if ((full && speed < speedHPS1) || (empty && speed > speedHPS1)){
        deactivateInput(tube2, false);
        tube2.value = tube1.value;
        speed = speedViewer(tube1.value);
    }
    Tube2();

    if (speed > speedOutput){
        time2 = mainSpeed / (speed - speedOutput);
        condition2 = true;
        filling2 = true;
        if (starter2) {fillInHPS2(); starter2 = false;}

    }else if (speedOutput === speed){
        condition2 = false; starter2 = true;
    }else {

        time2 = mainSpeed / (speedOutput - speed);
        condition2 = true;
        filling2 = false;
        if (starter2) {fillInHPS2(); starter2 = false;}
    }
}

tube3.oninput = tube2.oninput = function () { HPS2(); Tube3();};

var x11 = 52.1, y11 = 70.182, x21 = 60.305;
function fillInHPS2() {
    diffX = 2.2; diffY = 16; diffX2 = 5.2; heightTube = 0.22;
    HPS1();

    deactivateInput(tube3, empty2);
    var speed = speedViewer(tube2.value);

    if (filling2){
        x11 -= diffX / diff;
        x21 += diffX2 / diff;
        y11 -= diffY / diff;

        if (x11 < 49.9) { condition2 = false; starter2 = true; full2 = true; Tube3();}
        if (y11 < (70.182 - heightTube * speed)) empty2 = false;

    }else {
        full2 = false;
        x11 += diffX / diff;
        x21 -= diffX2 / diff;
        y11 += diffY / diff;
        if (x21 < 60.3 || y11 > (70.182 - heightTube * speed)){
            condition2 = false; starter2 = true; empty2 = true; Tube3();
        }
    }

    volume[1].innerText = percentCounter(70.182, y11, diffY) + "%";
    timeFulling[1].innerText = TimeFull(70.182, y11, diffY, time2) + "c";

    ges2.style.clipPath = "polygon(" + x11 + "% " + y11 + "%, " + x21 + "% " + y11 + "%, 60% 72.5%, 52.5% 72.5%)";

    if (condition2) setTimeout(fillInHPS2, time2)
}

var time3 = 0,
    condition3 = true,
    filling3 = true,
    starter3 = true,
    empty3 = true,
    full3 = false;

function HPS3() {
    var speed = speedViewer(tube4.value),
        speedOutput = speedViewer(tube5.value);

    if (speed > speedOutput){
        time3 = mainSpeed / (speed - speedOutput);
        condition3 = true;
        filling3 = true;
        if (starter3) {fillInHPS3(); starter3 = false;}

    }else if (speedOutput === speed){
        condition3 = false;
        starter3 = true;
    }else {
        time3 = mainSpeed / (speedOutput - speed);
        condition3 = true;
        filling3 = false;
        if (starter3) {fillInHPS3(); starter3 = false;}
    }
}

tube5.oninput = tube4.oninput = function () { HPS3(); Tube4(); Tube5(); };

var x12 = 15.8, y12 = 40.182, x22 = 24.1;
function fillInHPS3() {
    heightTube = 0.35;
    diffX = 4.7; diffX2 = 2.2; diffY = 16.582;

    deactivateInput(tube5, empty3);
    var speed = speedViewer(tube4.value);

    if (filling3){
        x12 -= diffX / diff;
        x22 += diffX2 / diff;
        y12 -= diffY / diff;

        if (x12 < 11.1) {condition3 = false; starter3 = true; full3 = true; Tube5();}
        if (y12 < (40.182 - heightTube * speed)) empty3 = false;

    }else {

        full3 = false;
        x12 += diffX / diff;
        x22 -= diffX2 / diff;
        y12 += diffY / diff;
        if (x22 < 24.1 || y12 > (40.182 - heightTube * speed)){ condition3 = false; starter3 = true; empty3 = true; Tube5();}
    }

    volume[2].innerText = percentCounter(40.182, y12, diffY) + "%";
    timeFulling[2].innerText = TimeFull(40.182, y12, diffY, time3) + "c";

    ges3.style.clipPath = "polygon(" + x12 + "% " + y12 + "%, " + x22 + "% " + y12 + "%, 23.7% 42%, 16.2% 42%)";

    if (condition3) setTimeout(fillInHPS3, time3);
}

function Tube1() {
    var kub = speedViewer(tube1.value);

    var xk1 = 82.5, yk1 = 36.5, xk2 = 80.8, yk2 = 40.1, xk3 = 79.9, yk3 = 43,
        xk4 = 78.9, yk4 = 47.8, xk5 = 85.1, yk5 = 33.1, xk6 = 97.9, yk6 = 22.8;

        xk1 += 0.03 * kub; yk1 -= 0.29 * kub;
        xk2 -= 0.04 * kub; yk2 -= 0.19 * kub;
        xk3 -= 0.1  * kub; /** yk3 = const*/
        xk4 -= 0.09 * kub; /** yk4 = const*/
        xk5 -= 0.06 * kub; yk5 -= 0.17 * kub;
        xk6 -= 0.04 * kub; yk6 -= 0.19 * kub;

    kanal1.style.clipPath = "polygon(" + xk1 + "% " + yk1 + "%, " + xk2 + "% " + yk2 + "%, "
                                       + xk3 + "% " + yk3 + "%, " + xk4 + "% " + yk4 + "%, "
                                       + "78.9% 47.8%, 79.9% 43%, 80.8% 40.1%, 82.5% 36.5%,"
                                       + "85.1% 33.1%, 97.9% 22.8%,"
                                       + xk6 + "% " + yk6 + "%, " + xk5 + "% " + yk5 +  "%)";
}

function Tube2() {
    var kub = speedViewer(tube2.value);

    var xk1 = 60.3, yk1 = 59,   xk2 = 58.6, yk2 = 62.1, xk3 = 56.9, yk3 = 66.9,
        xk4 = 56.1, yk4 = 71.2, xk5 = 62.2, yk5 = 56.7, xk6 = 75, yk6 = 46.7;

        xk1 -= 0.02 * kub; yk1 -= 0.23 * kub;
        xk2 -= 0.07 * kub; yk2 -= 0.14 * kub;
        xk3 -= 0.09 * kub; yk3 -= 0.04 * kub;
        xk4 -= 0.09 * kub; /** yk4 = const*/
        xk5 -= 0.07 * kub; yk5 -= 0.17 * kub;
        xk6 -= 0.03 * kub; yk6 -= 0.25 * kub;

    kanal2.style.clipPath = "polygon(" + xk1 + "% " + yk1 + "%, " + xk2 + "% " + yk2 + "%, "
                                       + xk3 + "% " + yk3 + "%, " + xk4 + "% " + yk4 + "%, "
                                       + "56.1% 71.2%, 56.9% 66.9%, 58.6% 62.1%, 60.3% 59%,"
                                       + "62.2% 56.7%, 75%   46.7%,"
                                       + xk6 + "% " + yk6 + "%, " + xk5 + "% " + yk5 +  "%)";
}

function Tube3() {

    var speed = speedViewer(tube3.value),
        speedHPS2 = speedViewer(tube2.value);

    if ((full2 && speed < speedHPS2) || (empty2 && speed > speedHPS2)){
        deactivateInput(tube3, false);
        tube3.value = tube2.value;
    }

    var kub = speedViewer(tube3.value);
    var x1 = 38, y1 = 79.8, x2 = 52.2, y2 = 70.2;

    x1 -= 0.05 * kub; y1 -= 0.21 * kub;
    x2 -= 0.03 * kub; y2 -= 0.24 * kub;

    kanal3.style.clipPath = "polygon(" + x1 + "% " + y1 + "%, " + x2 + "% " + y2 + "%, 52.2% 70.2%, 38% 79.8%)";
    GesEnd();

}

function Tube4() {
    var kub = speedViewer(tube4.value);

    var xk1 = 16.2, yk1 = 29,   xk2 = 17.6, yk2 = 31.9, xk3 = 19.2, yk3 = 36.9,
        xk4 = 19.8, yk4 = 40.6, xk5 = 14,   yk5 = 26.1, xk6 = 1.1,  yk6 = 15.8;

    xk1 += 0.02 * kub; yk1 -= 0.22 * kub;
    xk2 += 0.08 * kub; yk2 -= 0.14 * kub;
    xk3 += 0.07 * kub; yk3 -= 0.18 * kub;
    xk4 += 0.09 * kub; /** yk4 = const*/
    /**xk5 = const*/   yk5 -= 0.23 * kub;
    xk6 += 0.04 * kub; yk6 -= 0.18 * kub;

    kanal4.style.clipPath = "polygon(" + xk1 + "% " + yk1 + "%, " + xk2 + "% " + yk2 + "%, "
                            + xk3 + "% " + yk3 + "%, " + xk4 + "% " + yk4 + "%, "
                            + "19.8% 40.6%, 19.2% 36.9%, 17.6% 31.9%, 16.2% 29%,"
                            + "14%   26.1%, 1.1%  15.8%,"
                            + xk6 + "% " + yk6 + "%, " + xk5 + "% " + yk5 +  "%)";
}

function Tube5() {

    var speed = speedViewer(tube5.value),
        speedHPS2 = speedViewer(tube4.value);

    if ((full3 && speed < speedHPS2) || (empty3 && speed > speedHPS2)){
        deactivateInput(tube5, false);
        tube5.value = tube4.value;
    }

    var kub = speedViewer(tube5.value);
    var x1 = 24, y1 = 39.8, x2 = 38.1, y2 = 79.2;

    x1 += 0.04 * kub; y1 -= 0.29 * kub;
    x2 += 0.1  * kub; y2 -= 0.09 * kub;

    kanal5.style.clipPath = "polygon(" + x1 + "% " + y1 + "%, " + x2 + "% " + y2 + "%, 38.1% 79.2%, 23.9% 39.6%)";
    GesEnd();

}

function GesEnd() {
    var kub = speedViewer(tube5.value) + speedViewer(tube3.value);

    var x1 = 21, y1 = 92.4, x2 = 39.3, y2 = 79.1;

    x1 -= 0.05 * kub; y1 -= 0.22  * kub;
    x2 -= 0.07 * kub; y2 -= 0.215 * kub;

    gesEnd.style.clipPath = "polygon(" + x1 + "% " + y1 + "%, " + x2 + "% " + y2 + "%, 39.3% 79.1%, 21% 92.4%)";
}

function fadeInOutInfo(ges, info) {
    ges.onmouseover = function () {
        info.style.visibility = "visible";
        info.style.opacity = 1;
    };

    ges.onmouseout = function () {
        info.style.visibility = "hidden";
        info.style.opacity = 0;
    };
}

var map = document.getElementsByName("gesMap")[0],
    sangtuda = document.getElementById("sangtuda"),
    roghun = document.getElementById("roghun"),
    norak = document.getElementById("norak");

fadeInOutInfo(map.firstElementChild, sangtuda);
fadeInOutInfo(map.children[1], roghun);
fadeInOutInfo(map.children[2], norak);
