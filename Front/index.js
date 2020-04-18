function login(){
    let user = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    var myHeaders = new Headers();
    let body = JSON.stringify({"user":user,"pass":pass});
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: body,
  redirect: 'follow'
};

fetch("http://127.0.0.1:3000/api/login", requestOptions)
  .then(response => response.text())
  .then(result => setToken(result))
  .catch(error => console.log('error', error));
}

function setToken(token){
  if(token!=null || token!=error){
    localStorage.setItem("token", token)
    location.assign("./Front/aplication.html");
  }
}