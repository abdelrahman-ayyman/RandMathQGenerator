/*global document ,setInterval, window*/
var time = document.getElementById('time'),
    out = document.getElementById('output'),
    btn = document.getElementById('btn'),
    again = document.getElementById('again'),
    hid = document.getElementById('style'),
    randomAns = document.getElementsByTagName('label'),
    x = 9,
    se,
    randomSelect;
if (btn.innerHTML === 'Start') {
    again.style.display = 'none';
    hid.style.display = 'none';
    btn.style = "margin:10px auto;display:block";
    btn.onclick = function start() {
        "use strict";

        var y = (Math.floor(Math.random() * 10) + 1),
            z = (Math.floor(Math.random() * 10) + 1);

        var answers = [
                y + " + " + z + " = ?",
                y + " x " + z + " = ?"
            ],
            add = [],
            ans = [],
            ans_1 = document.getElementById('one'),
            ans_2 = document.getElementById('two'),
            test = document.getElementsByTagName('input'),
            ans_3 = document.getElementById('three');

        function end() {
            randomSelect = Math.floor(Math.random() * 3);
            if (out.innerHTML === y + " + " + z + " = ?<br>") {
                randomAns[randomSelect].innerHTML = (y + z).toString();
                for (var c = 0; c <= 2; c++) {
                    if (c === randomSelect) {
                        continue;
                    }
                    if (c === (randomSelect - 1)) {
                        randomAns[c].innerHTML = (y + z + y + 2);
                    } else if (c === (randomSelect + 1)) {
                        randomAns[c].innerHTML = (y + z - 1);
                    } else if (c === (randomSelect + 2)) {
                        randomAns[c].innerHTML = (y + z + 2);
                    } else if (c === (randomSelect - 2)) {
                        randomAns[c].innerHTML = (y + z + y);
                    }
                }
            } else if (out.innerHTML === y + " x " + z + " = ?<br>") {
                randomAns[randomSelect].innerHTML = (y * z).toString();
                for (var c = 0; c <= 2; c++) {
                    if (c === randomSelect) {
                        continue;
                    }
                    if (c === (randomSelect - 1)) {
                        randomAns[c].innerHTML = (y * z) + 5;
                    } else if (c === (randomSelect + 1)) {
                        randomAns[c].innerHTML = (y * z) + 6;
                    } else if (c === (randomSelect + 2)) {
                        randomAns[c].innerHTML = (y * z) + 2;
                    } else if (c === (randomSelect - 2)) {
                        randomAns[c].innerHTML = (y * z) + 3;
                    }
                }
            }
            if (add.length === 5) {
                btn.innerHTML = "Finish";
            }
        }

        function random2() {
            y = (Math.floor(Math.random() * 10) + 1);
            z = (Math.floor(Math.random() * 10) + 1);
            answers = [
                y + " + " + z + " = ?",
                y + " x " + z + " = ?"
            ];
            again.style.display = "none";
            var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
            if (add.indexOf(randomAnswer) === -1 && add.length < 5) {
                time.innerHTML = "0:10";
                btn.style = "";
                hid.style.display = '';
                btn.innerHTML = "Next";
                x = 9;
                var ad = add.push(randomAnswer);
                out.innerHTML = add[(ad - 1)] + "<br>";
            } else if (add.length === 5) {
                again.style = "margin:10px auto;display:block";
                return false;
            } else {
                random2();
            }
        }
        // {random()} work with {end()} onclick
        function random() {
            if (test[randomSelect].checked === true) {
                ans.push(1);
            }
            ans_1.checked = false;
            ans_2.checked = false;
            ans_3.checked = false;
            if (add.length === 5) {
                btn.style.display = "none";
                hid.style.display = "none";
                window.clearInterval(se);
                time.innerHTML = "0:00";
                out.style = 'text-align:center';
                if (ans.length >= 3) {
                    out.innerHTML = ans.length + "/ 5<br><strong style='color:rgb(66, 209, 0)'>You Win!!</strong>";
                } else if (ans.length < 3) {
                    out.innerHTML = ans.length + "/ 5<br><strong style='color:#F00'>You Lost!!</strong>";
                }
            }
            random2();
        }

        se = setInterval(function ti() {
            if (x === 0 && add.length !== 5) {
                time.innerHTML = "0:10";
                random();
                x = 9;
                end();
            } else if (x === 0 && add.length === 5) {
                random();
                btn.style.display = "none";
                hid.style.display = "none";
                window.clearInterval(se);
                time.innerHTML = "0:00";
                out.style = 'text-align:center';
                if (ans.length >= 3) {
                    out.innerHTML = ans.length + "/ 5<br><strong style='color:#080'>You Win!!</strong>";
                } else if (ans.length < 3) {
                    out.innerHTML = ans.length + "/ 5<br><strong style='color:#F00'>You Lost!!</strong>";
                }
            } else {
                time.innerHTML = "0:0" + x;
                x = x - 1;
            }
        }, 1000);
        random2();
        end();

        // after finishing
        function repeat() {
            btn.style = "";
            again.style = "";
            hid.style.display = "block";
            time.innerHTML = "0:10";
            x = 9;
            out.style = '';
            add = [];
            ans = [];
            se = setInterval(function ti() {
                if (x === 0 && add.length !== 5) {
                    time.innerHTML = "0:10";
                    random();
                    x = 9;
                    end();
                } else if (x === 0 && add.length === 5) {
                    random();
                    btn.style.display = "none";
                    hid.style.display = "none";
                    window.clearInterval(se);
                    time.innerHTML = "0:00";
                    out.style = 'text-align:center';
                    if (ans.length >= 3) {
                        out.innerHTML = ans.length + "/ 5<br><strong style='color:#080'>You Win!!</strong>";
                    } else if (ans.length < 3) {
                        out.innerHTML = ans.length + "/ 5<br><strong style='color:#F00'>You Lost!!</strong>";
                    }
                } else {
                    time.innerHTML = "0:0" + x;
                    x = x - 1;
                }
            }, 1000);
            random2();
            end();
        }
        btn.onclick = function () {
            random();
            end();
        };
        again.onclick = function () {
            repeat();
        };
    };
}