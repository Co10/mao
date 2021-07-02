(function () {
  "use strict";

  var fa_div = document.getElementsByClassName("fav_main")[0];

  function readSto() {
    let res0 = localStorage.getItem("mark");
    if (res0 === "" || res0 === null) {
      fa_div.innerHTML = "";
      fa_div.innerHTML = "空空如也";
      return null;
    } else {
      return res0.split(",").map((e) => parseInt(e));
    }
  }

  function resizeM() {
    document.getElementsByClassName("fav_list")[0].style.height =
      window.innerHeight - 15 + "px";
  }

  window.addEventListener("resize", resizeM);

  var cur_res;

  resizeM();

  document.getElementById("starButton").addEventListener("click", function () {
    document.getElementsByClassName("fav_list")[0].style.display = "block";
    maList();
  });

  document.getElementById("closeStar").addEventListener("click", function () {
    document.getElementsByClassName("fav_list")[0].style.display = "none";
  });

  function maList() {
    cur_res = [];
    let res1 = readSto();
    if (res1 !== null) {
      for (var i of res1) {
        cur_res.push(localdata[i - 1]);
      }
      fa_div.innerHTML = "";
      for (var i of cur_res) {
        appList(i);
      }
    }
  }

  function appList(d) {
    let to_choose = "";
    if (d.type.toString() === "单选题" || d.type.toString() === "多选题") {
      let choices = d.answers.split("/");
      for (let i = 0; i < choices.length; i++) {
        to_choose += `<li><span>${choices[i]}</span></li>`;
      }
    }

    let tHTML = `<div class="sheetMark">
                    <div class="mark_stem"><span>${d.stem}</span></div>
                    <ol type='A' class="mark_choice"> ${to_choose} </ol>
                    <div class="mark_analysis">${
                      d.correctAnswer + "\n" + d.analysis
                    }</div>
                </div>`;
    let x = document.createElement("ul");
    x.innerHTML = tHTML;
    fa_div.appendChild(x);
  }

  document.getElementById("markfilter").addEventListener("input", search_mark);
  function search_mark() {
    let input, filter;
    input = document.getElementById("markfilter");
    filter = input.value;

    let mlist = document.getElementsByClassName("fav_main")[0];

    if (filter !== "") {
      for (let i = 0; i < mlist.children.length; i++) {
        let resM = mlist.children[i];
        console.log(resM);
        if (resM.innerText.indexOf(filter) !== -1) {
          resM.style.display = "block";
        } else {
          resM.style.display = "none";
        }
      }
    } else {
      for (let i of mlist.children) {
        i.style.display = "block";
      }
    }
  }
})();
