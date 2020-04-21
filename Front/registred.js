let tokens = JSON.parse(localStorage.getItem('token'));
let usuario = "Usuario ";
document.getElementById("user").textContent=usuario;
var pedidos = followPedido(tokens);

async function getFollow(promise){
  //document.getElementsByTagName("section")[1].remove(); document.getElementsByTagName("section")[0].remove();
  let clientpedido = promise.then(rr=>{
    let arr = (rr[rr.length-1]);
    let id = arr.id;
    let estado = arr.estado;
    let hora = arr.hora;
    let pago = arr.pago;
    let user = arr.usuario;
  console.log("Id: "+id+" Estado: "+estado+" Hora: "+hora+" Pago: "+pago+" User: "+user);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let productosxpedido;
    fetch("http://127.0.0.1:3000/get/productosxpedidos?token="+token+"&id="+arr.id, requestOptions)
    .then(response => response.text())
    .then(result => {productosxpedido = JSON.parse(result)})
    .catch(error => console.log('Error', error));
  });

  let rta = {
    arr,
    productosxpedido
  }
  console.log(rta);
  
  return(rta)

}

async function followPedido(token){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let resultados;
    let aux = await fetch("http://127.0.0.1:3000/get/pedidos?token="+token, requestOptions)
      .then(response => response.text())
      .then(result => {resultados = JSON.parse(result)})
      .catch(error => console.log('Error', error));
    
    if(resultados!=null){return resultados}else{return "Error"}
    }