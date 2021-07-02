(function () {
  "use strict";

  var max_show_per = 50;

  Set.prototype.getByIndex = function (index) {
    return [...this][index];
  };

  initialize();

  document.getElementById("refresh_now").addEventListener("click", random_func);
  document
    .getElementsByClassName("modifications")[0]
    .addEventListener("click", checkAllbox2);

  function checkAllbox() {
    document.getElementById("ch_01").checked = smallStatus(getSto("ch01"));
    document.getElementById("ch_02").checked = smallStatus(getSto("ch02"));
    document.getElementById("ch_03").checked = smallStatus(getSto("ch03"));
  }

  function checkAllbox2() {
    setStorage("ch01", document.getElementById("ch_01").checked);
    setStorage("ch02", document.getElementById("ch_02").checked);
    setStorage("ch03", document.getElementById("ch_03").checked);
  }

  function setStorage(key, val) {
    localStorage.setItem(key, val);
  }
  function getSto(key) {
    return localStorage.getItem(key);
  }

  function smallStatus(a) {
    if (a === "true" || a === true || a === 1 || a === "1") return true;
    else return false;
  }

  function initialize() {
    var items = ["hasAnswered", "ch01", "ch02", "ch03"];
    var item_val = ["", true, true, true];
    for (var i in items) {
      if (getSto(items[i]) === null) {
        setStorage(items[i], item_val[i]);
      }
    }
    checkAllbox();
    document.getElementById("ch_01").addEventListener("click", function () {
      if (this.checked) {
        setStorage("ch01", "true");
      } else {
        setStorage("ch01", "false");
      }
    });
    document.getElementById("ch_02").addEventListener("click", function () {
      if (this.checked) {
        setStorage("ch02", "true");
      } else {
        setStorage("ch02", "false");
      }
    });
  }

  var answering;

  function random_func() {
    for (var i of document.getElementsByClassName("all_submit"))
      i.style.display = "inline";

    var hasAnswered = new Set(getSto("hasAnswered").split(","));
    //console.log(hasAnswered);
    var toBeAnswered = new Set();
    //console.log("len", localdata);
    for (let i = 1; i <= localdata.length; i++) {
      if (hasAnswered.has(i)) {
        continue;
      } else {
        toBeAnswered.add(i);
      }
    }
    answering = new Set();
    for (let i = 0; i < toBeAnswered.size && i < max_show_per; i++) {
      let randNum = Math.floor(Math.random() * toBeAnswered.size);
      let theNum = toBeAnswered.getByIndex(randNum);
      answering.add(theNum);
      toBeAnswered.delete(theNum);
    }
    newList();
  }

  function newList() {
    document.getElementsByClassName("questions_to_answer")[0].innerHTML = "";
    if (answering.size === 0) {
      alert("全都刷完啦，点击从头开始");
      setStorage("hasAnswered", "");
    } else {
      for (let ii of answering) {
        let it = localdata[ii - 1];
        createSheet(
          it.no,
          it.stem,
          it.type,
          it.answers.toString().split("/"),
          it.correctAnswer,
          it.analysis
        );
      }
    }
  }

  /* idx, the stem, the type, the choices, answer, analisis */
  function createSheet(idx, stem, ty, choices, ans, ana) {
    let multichoice = "";
    let to_choose = "";
    let b_text = "";
    let analy_text = ans + "\n";
    if (ty === "单选题" || ty === "多选题" || ty === "判断题") {
      if (ty === "多选题") multichoice = "【多选题】";
      for (let i = 0; i < choices.length; i++) {
        to_choose += `<li><input type='checkbox' id='${idx}yourch${i}'><label for='${idx}yourch${i}'>${choices[i]}</label></li>`;
      }
      b_text = `<button class="all_the_submits">提交</button>`;
    } else if (ty === "填空题") {
      to_choose += "本题是填空题，请在心里默念答案";
    } else {
      to_choose += "本题是简答题";
      analy_text = ans + "\n";
    }

    if (ana !== "" && ans !== null) {
      analy_text += "解析: " + ana;
    }
    let theHTML = `<div class="sheetAnswer" id="the_sheet_idx_${idx}">
                    <div class="sheet_title"><span>${
                      multichoice + stem
                    }</span></div>
                    <ol type='A' class="sheet_choice" id="sheet_choice_${idx}"> ${to_choose} </ol>
                    <div class="sheet_submit">${b_text}<button class="all_view" id="ans_for_${idx}">查看答案与解析</button></div>
                    <div class="analysis" id="ans_show_ana_${idx}">${analy_text}</div>
                </div>`;
    let x0 = document.createElement("ul");
    x0.innerHTML = theHTML;

    var favo0 = document.createElement("div");
    favo0.setAttribute("class", "favo_div");
    var favoB = document.createElement("button");
    favoB.innerText = "★";
    if (ifMarked(idx)) {
      favoB.style.color = markedColor;
    } else {
      favoB.style.color = unmarkedColor;
    }
    favoB.nummucked = idx;
    favoB.addEventListener("click", function () {
      let ress = switchStatus(this.nummucked);
      if (ress === 0) {
        this.style.color = unmarkedColor;
      } else {
        this.style.color = markedColor;
      }
    });
    favo0.appendChild(favoB);
    x0.children[0].appendChild(favo0);

    document.getElementsByClassName("questions_to_answer")[0].appendChild(x0);

    let the_sheet_div = document.getElementById("the_sheet_idx_" + idx);

    // show analysis
    document
      .getElementById("ans_for_" + idx)
      .addEventListener("click", function () {
        document.getElementById("ans_show_ana_" + idx).style.display = "block";
      });

    if (ty === "单选题" || ty === "多选题" || ty === "判断题") {
      let all_choices = document.getElementById("sheet_choice_" + idx).children;

      // check answer
      the_sheet_div.children[2].children[0].addEventListener(
        "click",
        function () {
          // submit
          this.style.display = "none";

          //for (let i of all_choices)
          //i.removeEventListener("click", this.A);

          if (smallStatus(getSto("ch02")) === true) {
            the_sheet_div.children[2].children[1].click();
          }

          var yourAnswer = [];
          for (let j of all_choices) {
            if (j.children[0].checked) {
              yourAnswer.push(true);
            } else {
              yourAnswer.push(false);
            }
          }

          // green correct choice
          let c_ans = convertAns(ans, yourAnswer.length);
          for (let j in c_ans) {
            if (c_ans[j] === true) {
              the_sheet_div.children[1].children[j].children[1].style[
                "background-color"
              ] = "#82f6a194";
            }
          }
          // check if you are all correct
          let allright = true;
          for (let j = 0; j < yourAnswer.length; j++) {
            if (c_ans[j] !== yourAnswer[j]) {
              allright = false;
              break;
            }
          }
          if (allright === true) {
            the_sheet_div.style["background-color"] = "#d5ffec";
          } else {
            the_sheet_div.style["background-color"] = "#ffc8c8";
            if (smallStatus(getSto("ch03")) === true) {
              the_sheet_div.children[4].children[0].style.color = markedColor;
              addTofavorite(the_sheet_div.children[4].children[0].nummucked);
            }
          }
        }
      );

      // when answering
      for (let i of all_choices) {
        i.addEventListener("click", function () {
          record_done(idx);
          if (i.children[0].checked) {
            this.style["background-color"] = "#c7c0ff7a";
          } else {
            this.style["background-color"] = "";
          }
          // if enable auto submit
          if (
            (ty === "单选题" || ty === "判断题") &&
            smallStatus(getSto("ch01")) === true
          ) {
            the_sheet_div.children[2].children[0].click();
          }
        });
      }
    }
  }

  function convertAns(ans, len) {
    let a = ans.split("");
    let x = [];
    for (let i = 0; i < len; i++) {
      x.push(false);
    }
    let iniI = 0;
    if (ans[0] === "(") {
      iniI = 1;
    }
    for (let i = iniI; i < a.length && a[i] !== ")"; i++) {
      if (a[i].charCodeAt(0) >= 65 && a[i].charCodeAt(0) <= 90)
        x[a[i].charCodeAt(0) - 65] = true;
      else if (a[i].charCodeAt(0) >= 97 && a[i].charCodeAt(0) <= 122)
        x[a[i].charCodeAt(0) - 97] = true;
    }
    return x;
  }

  all_submit_apply();

  function all_submit_apply() {
    let x = document.getElementsByClassName("all_submit");
    for (let i of x) {
      i.addEventListener("click", submitAll);
    }
  }

  function submitAll() {
    let aaa = document.getElementsByClassName("all_the_submits");
    for (let i of aaa) {
      i.click();
    }
    let bbb = document.getElementsByClassName("all_view");
    for (let i of bbb) {
      i.click();
    }
  }

  function record_done(idx) {
    if (answering.has(idx)) {
      answering.delete(idx);
      let s = getSto("hasAnswered");
      if (s === "" || s === null) {
        s = idx.toString();
      } else {
        s += "," + idx.toString();
      }
      setStorage("hasAnswered", s);
    }
  }
})();
