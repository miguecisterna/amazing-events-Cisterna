//Home events variables:
let allCards = "";
let allCardsContainer = document.getElementById("allCardsContainer");

//Filter variables:
let search = document.getElementById("search");
let filteredArr = [];
let listenerValue = "";

//Filter by categories variables:
let checkedCategories = [];
let checkedevents = [];
let checkedRefe = document.getElementById("allCategoriesContainer");

//Categories Functions
function createNoRepeatCategories(){
  for(category of noRepeatCategories){ 
    allCategoriesHTML += 
    `<div class="col-sm-4 category" id="category">
      <input type="checkbox" name="category" class="checkbox" id="${category}" value="${category}">${category}
    </div>`
  }
}

// function createCheckedCategoryCards(arr){
//   allCards="";
//   allCardsContainer.innerHTML = "";
//   for(event_ of eventsDB.events){
//     if(arr.includes(event_.category)){
//       allCards += 
//       `<div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 cardCont">
//       <div class="card">
//         <img src="${event_.image}">
//         <div class="card-body">
//           <h5 class="card-title">${event_.name}</h5>
//           <p class="card-text">${event_.description}</p>
//           <div class="cardFooter">
//             <p>Price: $${event_.price}</p>
//             <a href="./details.html" class="btn btn-primary card-btn">More Info</a>
//           </div>
//         </div>
//       </div>
//     </div>`;
//     }
//   }
// }

checkedRefe.addEventListener("click",(e) => {

  if(e.target.attributes.class.nodeValue === "checkbox"){

    if(e.target.checked){
      checkedCategories.push(e.target.value);
      //createCheckedCategoryCards(checkedCategories);
      //paintAllCards();
    }
    else{
      let index = checkedCategories.indexOf(e.target.value);
      let x = checkedCategories.splice(index, 1);
      //createCheckedCategoryCards(checkedCategories);
      //paintAllCards();
    }

    filterAlmacen();
  }
  //if(checkedCategories.length === 0){
  //createAllCards(eventsDB.events);
  //paintAllCards();
  //}

})

function paintCategories(){
  allCategoriesContainer.innerHTML = allCategoriesHTML;
}

//Home events cards display functions:

function createAllCards(arr) {
  allCards="";

  for (event_ of arr) {
    allCards += 
    `<div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 cardCont">
      <div class="card">
        <img src="${event_.image}">
        <div class="card-body">
          <h5 class="card-title">${event_.name}</h5>
          <p class="card-text">${event_.description}</p>
          <div class="cardFooter">
            <p>Price: $${event_.price}</p>
            <a href="./details.html?id=${event_._id}" class="btn btn-primary card-btn">More Info</a>
          </div>
        </div>
      </div>
    </div>`;
    
  }
  return allCards;
}

function paintAllCards(){
  allCardsContainer.innerHTML = allCards;
}

//Filter fx:
function filtraPorNombre(nombre,eventos){
  let lista = [];

  for(event_ of eventos){

    if(event_.name.toLowerCase().includes(nombre)){
      lista.push(event_);
      // console.log(nombre);
      // console.log(event_.name);
      // console.log("condicion del if " + event_.name.includes(nombre));
    }

  }
  // console.log(lista);
  return lista;
}




// function checkboxFilter(lista, evento){
//   let lista = [];

//   for(event_ of evento){
//     if(evento.category.toLowerCase().includes(lista)){

//     }
//   }
// }

search.addEventListener("keyup", (e) =>{
  // if(checkedCategories.length === 0){
  //   createAllCards(filtraPorNombre(search.value.toLowerCase(), eventsDB.events));
  //   paintAllCards();
  // }else{
  //   createAllCards(filtraPorNombre(search.value.toLowerCase(), checkedEvents));
  //   paintAllCards();
  // }
  listenerValue = e.target.value;
  filterAlmacen();
});

function filterAlmacen(){
  let filtradoPorSearchbar = events.filter(e => e.name.toLowerCase().includes(listenerValue));
  let filtradoPorCheckbar = events.filter(e => checkedCategories.includes(e.category));
  
  // console.log(filtradoPorSearchbar);
  // console.log(filtradoPorCheckbar);
  // console.log(filtradoPorCheckbar.forEach());
  // console.log(events);
  // console.log(checkedCategories);

  if(listenerValue.length > 0){
    // createAllCards(filtradoPorSearchbar);
    // paintAllCards();
    allCardsContainer.innerHTML = createAllCards(filtradoPorSearchbar);
    let controlFinal = filtradoPorSearchbar.filter(fs => fs.category.includes(checkedCategories.toString()));
    allCardsContainer.innerHTML = createAllCards(controlFinal);
  }else if(listenerValue.length == 0){
    allCardsContainer.innerHTML = createAllCards(events);
  }
  if(checkedCategories.length > 0){
    allCardsContainer.innerHTML = createAllCards(filtradoPorCheckbar);
    let controlFinal2 = filtradoPorCheckbar.filter(fs => fs.name.toLowerCase().includes(listenerValue.toString()));
    allCardsContainer.innerHTML = createAllCards(controlFinal2);
    console.log(controlFinal2);
  }


}

//Calling the functions:

createAllCards(events);
paintAllCards();

createNoRepeatCategories();
paintCategories();


