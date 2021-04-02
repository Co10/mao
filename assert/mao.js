/* search */

// get JSON func
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

// URL of data_list
//var json_data_url = "all.json";
var json_data_url = "https://raw.githubusercontent.com/Co10/temp_json/main/all.json";

var localdata = [];

// apply data
getJSON(json_data_url, function(err, data) {
    if (err !== null) {
        alert('Sorry, something went wrong: ' + err);
    } else {
        var thedata = data;

        for (var j = 0; j < thedata.length; j++) {
            localdata.push(thedata[j]);
        }
        //localdata = thedata;
        
    }
})


function searchList() {
    // Declare variables
    var input, filter, the_List;
    input = document.getElementById("searchInput");
    filter = input.value;

    the_list = localdata;

    var filter_list = [];

    //console.log(the_list, the_lists, input, filter);
    if (filter != "") {
        for (var i = 0; i < the_list.length; i++) {
            if (the_list[i].stem.indexOf(filter) != -1 || filter == "" || 
                the_list[i].answers.indexOf(filter) != -1 ||
                the_list[i].analysis.indexOf(filter) != -1 ||
                the_list[i].type.indexOf(filter) != -1) {
                
                filter_list.push(the_list[i]);
            } else {
                var x;
                //the_list[i].style.display = "none";
                //console.log(the_list[i],"nn");
            }
        }
    }
    // Loop through all list items, and hide those who don't match the search query
    
    var layout = document.getElementById("ans");
    layout.innerHTML = '';

    display(filter_list);
}

function display(d) {
    for(var i = 0; i < d.length; i++) {
        var layout = document.getElementById("ans");

        var li = document.createElement("li");
        li.setAttribute("class", "list");

        var stem0 = document.createElement("div");
        var answers0 = document.createElement("ol");
        var correct0 = document.createElement("div");
        var analysis0 = document.createElement("div");
        var difficult0 = document.createElement("div");
        answers0.setAttribute("type", "A");

        var choice = true;
        if (d[i].type == "单选题" || d[i].type == "多选题" || d[i].type == "填空题") {
            var getAns = d[i].answers.split('/');
            for (var j = 0; j < (+d[i].answerCount); j++) {
                var ans = document.createElement("li");
                ans.innerText = getAns[j];
                answers0.appendChild(ans);
            }
        }
        else {
            choice = false;
        }

        var stem = document.createElement("label");
        if (choice == false) {
            var answers = document.createElement("label");
            answers.setAttribute("class", "answers");
            answers.innerText = d[i].answers;
            answers0.appendChild(answers);
        }
        
        var correctAnswer = document.createElement("label");
        var analysis = document.createElement("label");
        var difficult = document.createElement("label");
        stem.innerText = d[i].stem;
        
        correctAnswer.innerText = "答案: " + d[i].correctAnswer;
        analysis.innerText = "分析: " + d[i].analysis;
        difficult.innerText = "难度: " + d[i].difficult;

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

        li.appendChild(stem0);
        li.appendChild(answers0);
        li.appendChild(correct0);
        li.appendChild(analysis0);
        li.appendChild(difficult0);

        layout.appendChild(li);
    }
}