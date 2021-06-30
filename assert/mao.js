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
var json_data_url = "/assert/all.json";
//var json_data_url = "https://raw.githubusercontent.com/Co10/mao/main/all.json";

var localdata;

// apply data
getJSON(json_data_url, function(err, data) {
    if (err !== null) {
        alert('Sorry, 404 not found: ' + err);
    } else {
        localdata = data;
        
    }
})