

//JUST AN EXAMPLE, PLEASE USE YOUR OWN PICTURE!
var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg"; 
var downloadSize = 4995374; //bytes


function ShowProgressMessage(bandwidth) {

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        geoloc = JSON.stringify(xhr.responseText,null,2);

        var xhr1 = new XMLHttpRequest();
        xhr1.open("POST", 'http://127.0.0.1:8000/schools', true);
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr1.send(JSON.stringify({"bandwidth": bandwidth, "school": geoloc}));
    }
  } 
  xhr.open("GET", 'http://ip-api.com/json?', true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(null);
  
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
      showResults();
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        ShowProgressMessage(speedKbps);
    }
}


setInterval(
  function(){
    MeasureConnectionSpeed();
 }, 3000);



