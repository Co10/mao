var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
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
var json_data_url = "assert/all2.json";

var localdata;

// apply data
getJSON(json_data_url, function (err, data) {
  if (err !== null) {
    alert("Sorry, 404 not found: " + err);
  } else {
    localdata = data;
  }
});

iniF_KEY();

function iniF_KEY() {
  if (
    localStorage.getItem("mark") === "" ||
    localStorage.getItem("mark") === null
  )
    localStorage.setItem("mark", "");
}

function addTofavorite(n) {
  let res0 = localStorage.getItem("mark");
  if (res0 === "" || res0 === null) localStorage.setItem("mark", n);
  else {
    localStorage.setItem("mark", res0 + "," + n);
  }
}

function ifMarked(n) {
  let res0 = localStorage.getItem("mark");
  if (res0 === "" || res0 === null) return false;
  let res1 = res0.split(",").map((e) => parseInt(e));
  let res2 = res1.find((e) => e === parseInt(n));
  if (res2 === undefined) return false;
  return true;
}

function switchStatus(n) {
  let res0 = localStorage.getItem("mark");
  if (res0 === "" || res0 === null) {
    // marked
    addTofavorite(n);
    return 1;
  }
  let res1 = res0.split(",").map((e) => parseInt(e));
  let res2 = res1.find((e) => e === parseInt(n));
  if (res2 === undefined) {
    // marked
    addTofavorite(n);
    return 1;
  } else {
    let str = "";
    for (let i = 0; i < res1.length; i++) {
      if (res1[i] !== parseInt(n)) {
        str += res1[i] + ",";
      }
    }
    localStorage.setItem("mark", str.substring(0, str.length - 1));
    return 0;
  }
}

const markedColor = "#f2941f66";
const unmarkedColor = "#b3b3b366";
