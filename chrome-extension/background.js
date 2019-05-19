
setInterval(
  function(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://unicef-isp-manager.ngrok.io/schools', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(JSON.stringify({ "ip": "172.20.5.142"}));
 }, 30000);