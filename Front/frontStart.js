window.onload = async()=>{
    let tokenRecivied = JSON.parse(localStorage.getItem('token')); 
    let products =  await getProducts(tokenRecivied);
    let productos = await JSON.parse(products);
    //productos[i].id .nombre .precio .urlimagen
    for(let i =0; i<productos.length; i++){
        printProduct(productos[i].id,productos[i].urlimagen, productos[i].nombre, productos[i].precio);
    };
    
}

function printProduct(id, img, title, price){
    let container = document.createElement("div");
        container.id=id;
        container.className="productCont";
    let imagen = document.createElement("img");
        imagen.src=img;
        imagen.className = "productImg"
        imagen.id = "image"+id;
    let textos = document.createElement("div");
        textos.id=id;
        textos.className="textCont";
        let titulo = document.createElement("h5");
            titulo.textContent = title;
            titulo.className = "titleProduct";
            titulo.id = "title"+id;
        let precio = document.createElement("p");
            precio.textContent = "$ "+price;
            precio.className = "priceProduct";
            precio.id= "price"+id;
    textos.appendChild(titulo);
    textos.appendChild(precio);
    let mas = document.createElement("div");
        mas.textContent="+";
        mas.className="mas";
container.appendChild(imagen);
container.appendChild(textos);
container.appendChild(mas);
document.getElementById("allProducts").appendChild(container);
}


async function getProducts(token){
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
let resultados;
let aux = await fetch("http://127.0.0.1:3000/get/productos?token="+token, requestOptions)
  .then(response => response.text())
  .then(result => resultados = result)
  .catch(error => console.log('error', error));

if(resultados!=null){return resultados}
}


