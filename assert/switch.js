(function(){
    'use strict';
    var switchToggle = document.getElementById("switch_div").children[0];
    var switchText = switchToggle.children[0];
    var s_texts = ["搜题", "刷题"];
    var current = 1;
    var themode = [document.getElementById("search_mode"), document.getElementById("answer_mode")];

    switchToggle.addEventListener("click", switchmode);

    function switchmode() {
        themode[current].style.display = "block";
        localStorage.setItem("mode", current);
        current ^= 1;
        switchText.innerText = s_texts[current];
        themode[current].style.display = "none";
    }

    if (localStorage.getItem("mode") === "" || isNaN(localStorage.getItem("mode"))) {
        localStorage.setItem("mode", 0);
    }
    else {
        if (localStorage.getItem("mode") === "1") {
            themode[0].style.display = "none";
            themode[1].style.display = "block";
        }
    }
}())