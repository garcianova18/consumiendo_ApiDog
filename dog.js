//======================== llenar el select o Bombo box con las razas de============================//

let loading = document.getElementById("div_loading");

const url = "https://dog.ceo/api/breeds/list";
// este fecth es el encarado de listar las razas para llenar con select o combobox
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const select = document.getElementById("select");

    //Con este for llenamos el select con las razas de perros

    for (const raza of data.message) {
      //por cada raza un option para agrearlo al select

      const option = document.createElement("option");

      //le agregamos su value y su texto
      option.setAttribute("value", raza);
      option.textContent = raza;

      // agregamos cada opction a el select
      //asi se completa todo el listado de raza
      select.appendChild(option);
    }
  });

//===================================== agregar el evento al select==================================//

//le agregamos un evento change al select para que ejecute una funcion cada vez que se lecionemos una raza

select.addEventListener("change", Mostrarperros);

//funcion a ejecutar cuando selecionamos una raza

function Mostrarperros() {
  //aqui le agremaos a la url la raza que se selecciono en el select
  // de este modo solo me filtrara por esa raza

  const url2 = `https://dog.ceo/api/breed/${select.value}/images`;

  let texto_raza = document.getElementById("texto_raza");

  texto_raza.textContent = `Perros de la raza ${select.value}`;

  Listarperros(url2);
}

//===================================== Listar y pintar los card de perros==================================//

//funcion que lista todos los perros en este caso tenemos un limite de 15
let Listarperros = (url) => {
  //este loading se mostrara hasta que se carguen card o hasta que fecth nse resuelva
  loading.classList.add("mostrar_loading");

  //este fetch es el encarado de trabajar con la url de las razas
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //traemos el div donde pintaremos los card con la img de los perros

      const main_card = document.getElementById("main-card");

      //para que cada vez que selecionemos una raza se limpien los que ya se mostraban

      let card = "";
      // for para recorrer las img de los perros por raza
      for (let i = 0; i < data.message.length; i++) {
        //con este if solo mostramos un maximo de 15 img
        if (i >= 15) {
          break;
        }

        //aqui le pasamos el car que se mostrara por cada pero
        card += `
        
                    <div class="card my-3 ">
                        <img  src="${data.message[i]}" class="img ">
                        
                        <div class="card-body">
                        <h5 class="card-title"># ${i + 1}</h5>
                        
                    
                        </div>
                   </div>
      
      `;
      }

      main_card.innerHTML = card;

      //aqui ocultamos el loading despues que se han cargado los cards
      loading.classList.remove("mostrar_loading");
    });
};
