console.log('Hola Mundo')

const dire = 'http://localhost:4000/api/instagram';
var comentario = document.querySelector('div')
const contenedor = document.querySelector('.contenedor')

fetch(dire)
    .then(function (res) {
        return res.json()
        
    })
    .then(function (posts) {
    
        const contenido = posts.map(e=>{

            return `<div class="caja">
            <div class="img">
                <img src="${e.image}"/>
            </div>

            <div class="iconos">
                <i onclick = "rellenarCorazon(${e.id})" id="${e.id}" class=" far fa-heart"></i>
                <i class="far fa-comment" ></i>
                <i class="far fa-paper-plane"></i>
            </div>
            <div class="contador">
                Me gusta: <span id="likes">${e.likes}</span>
            </div>
            
            <div class="comentario">${e.text}</div>
            </div>`


        }).join('')

        contenedor.innerHTML = contenido;
    })

    const rellenarCorazon = e =>{
        const corazon = document.getElementById(e)
      
        corazon.classList.toggle('fas')
        corazon.classList.toggle('rojo')

    }

  document.getElementById('nuevo_post').onsubmit = function (e){
    e.preventDefault();

    const texto = document.querySelector('#nuevo_post input[name="texto"]').value;
    const imagen = document.querySelector('#nuevo_post input[name="foto"]').value;


    console.log(texto)
    console.log(imagen)

    const post= {
        imagen: imagen,
        text: texto,
        likes:0
    }

    fetch(dire, {
        method: 'post',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(res=> res.json())
    .then(nuevoPost =>{

        const postHTML = document.createElement('div');
    postHTML.classList.add('caja');
    postHTML.innerHTML = `
    <div class="img">
    <img src="${nuevoPost.image}"/>
</div>

<div class="iconos">
    <i onclick = "rellenarCorazon(${nuevoPost.id})" id="${nuevoPost.id}" class=" far fa-heart"></i>
    <i class="far fa-comment" ></i>
    <i class="far fa-paper-plane"></i>
</div>
<div class="contador">
    Me gusta: <span id="likes">${nuevoPost.likes}</span>
</div>

<div class="comentario">${nuevoPost.text}</div>
    `;

    contenedor.insertBefore(postHTML, contenedor.firstChild);
    })
}

  