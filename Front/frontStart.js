var cart = [];
let tokens = JSON.parse(localStorage.getItem('token'));

window.onload = async () => {
    let tokenRecivied = JSON.parse(localStorage.getItem('token'));
    let products = await getProducts(tokenRecivied);
    let productos = await JSON.parse(products);
    //productos[i].id .nombre .precio .urlimagen
    for (let i = 0; i < productos.length; i++) {
        await printProduct(productos[i].id, productos[i].urlimagen, productos[i].nombre, productos[i].precio);
    };
}

function pusher(id, valor) {
    cart.push(document.getElementById(id).value);
    document.getElementById(id).className = "min";
    document.getElementById(id).textContent = "-";
    document.getElementById(id).setAttribute("onclick", "shifter(this.id, this.value)");
}

function shifter(id, valor) {
    console.log("id: " + id + "valor: " + valor);
    document.getElementById(id).textContent = "+";
    var indice = cart.indexOf(valor);
    cart.splice(indice, 1);
    document.getElementById(id).className = "mas";
    document.getElementById(id).setAttribute("onclick", "pusher(this.id, this.value)");
}

function printProduct(id, img, title, price) {
    let container = document.createElement("div");
    container.id = id;
    container.className = "productCont";
    let imagen = document.createElement("img");
    imagen.src = img;
    imagen.className = "productImg"
    imagen.id = "image" + id;
    let textos = document.createElement("div");
    textos.id = id;
    textos.className = "textCont";
    let titulo = document.createElement("h5");
    titulo.textContent = title;
    titulo.className = "titleProduct";
    titulo.id = "title" + id;
    let precio = document.createElement("p");
    precio.textContent = "$ " + price;
    precio.className = "priceProduct";
    precio.id = "price" + id;
    textos.appendChild(titulo);
    textos.appendChild(precio);
    let mas = document.createElement("div");
    mas.setAttribute("onclick", "pusher(this.id, this.value)");
    mas.textContent = "+";
    mas.className = "mas";
    mas.id = "mas" + id;
    mas.value = id;
    container.appendChild(imagen);
    container.appendChild(textos);
    container.appendChild(mas);
    document.getElementById("allProducts").appendChild(container);
}

async function getProducts(token) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let resultados;
    let aux = await fetch("http://127.0.0.1:3000/get/productos?token=" + token, requestOptions)
        .then(response => response.text())
        .then(result => resultados = result)
        .catch(error => console.log('error', error));

    if (resultados != null) { return resultados }
}

async function sendPedido() {
    if (cart.length == 0) { return }
    let body = JSON.stringify({ "pedido": cart });
    console.log("BODY: " + body);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    };

    let rta = await fetch("http://127.0.0.1:3000/register/pedidos?token=" + tokens, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    location.assign("./registred.html");
}