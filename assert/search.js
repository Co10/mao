document.getElementById("searchInput").addEventListener("input", searchList);

function searchList() {
  // Declare variables
  let input, filter, the_list;
  input = document.getElementById("searchInput");
  filter = input.value;

  the_list = localdata;

  let filter_list = [];

  if (filter !== "") {
    //console.log(the_list);
    for (let i = 0; i < the_list.length; i++) {
      if (
        the_list[i].stem.toString().indexOf(filter) !== -1 ||
        the_list[i].answers.toString().indexOf(filter) !== -1 ||
        the_list[i].analysis.toString().indexOf(filter) !== -1 ||
        the_list[i].type.toString().indexOf(filter) !== -1
      ) {
        filter_list.push(the_list[i]);
      } else {
        //var x;
        //the_list[i].style.display = "none";
        //console.log(the_list[i],"nn");
      }
    }
  }
  let layout = document.getElementById("ans");
  layout.innerHTML = "";

  display(filter_list);
}

function display(d) {
  for (let i = 0; i < d.length; i++) {
    var layout = document.getElementById("ans");

    var li = document.createElement("li");
    li.setAttribute("class", "list");

    /* add to favorite */
    var favo0 = document.createElement("div");
    favo0.setAttribute("class", "favo_div");
    var favoB = document.createElement("button");
    favoB.innerText = "★";
    let thenum = +d[i].no;
    if (ifMarked(thenum)) {
      favoB.style.color = markedColor;
    } else {
      favoB.style.color = unmarkedColor;
    }
    favoB.nummucked = thenum;
    favoB.addEventListener("click", function () {
      let ress = switchStatus(this.nummucked);
      if (ress === 0) {
        // unmarked
        this.style.color = unmarkedColor;
      } else {
        this.style.color = markedColor;
      }
    });
    favo0.appendChild(favoB);

    var stem0 = document.createElement("div");
    var answers0 = document.createElement("ol");
    var correct0 = document.createElement("div");
    var analysis0 = document.createElement("div");
    var difficult0 = document.createElement("div");
    answers0.setAttribute("type", "A");

    var choice = true;
    if (
      d[i].type.toString() === "单选题" ||
      d[i].type.toString() === "多选题" ||
      d[i].type.toString() === "填空题"
    ) {
      var getAns = d[i].answers.toString().split("/");
      for (var j = 0; j < +d[i].answerCount; j++) {
        var ans = document.createElement("li");
        ans.innerText = getAns[j];
        answers0.appendChild(ans);
      }
    } else {
      choice = false;
    }

    var stem = document.createElement("label");
    if (choice == false) {
      var answers = document.createElement("label");
      answers.setAttribute("class", "answers");
      answers.innerText = d[i].answers.toString();
      answers0.appendChild(answers);
    }

    var correctAnswer = document.createElement("label");
    var analysis = document.createElement("label");
    var difficult = document.createElement("label");
    stem.innerText = d[i].stem.toString();

    correctAnswer.innerText = "答案: " + d[i].correctAnswer.toString();
    analysis.innerText = "分析: " + d[i].analysis.toString();
    difficult.innerText = "难度: " + d[i].difficult.toString();

    if (analysis.innerText == "分析: ") {
      analysis.innerHTML = "";
    }
    if (difficult.innerText == "难度: ") {
      difficult.innerHTML = "";
    }

    stem.setAttribute("class", "stem");

    correctAnswer.setAttribute("class", "correctAnswer");
    analysis.setAttribute("class", "analysis");
    difficult.setAttribute("class", "difficult");

    stem0.appendChild(stem);

    correct0.appendChild(correctAnswer);
    analysis0.appendChild(analysis);
    difficult0.appendChild(difficult);

    li.appendChild(favo0);
    li.appendChild(stem0);
    li.appendChild(answers0);
    li.appendChild(correct0);
    li.appendChild(analysis0);
    li.appendChild(difficult0);

    layout.appendChild(li);
  }
}
