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


checkedRefe.addEventListener("click",(e) => {

  if(e.target.attributes.class.nodeValue === "checkbox"){

    if(e.target.checked){
      checkedCategories.push(e.target.value);

    }
    else{
      let index = checkedCategories.indexOf(e.target.value);
      let x = checkedCategories.splice(index, 1);

    }

    filterAlmacen();
  }

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
    }

  }

  return lista;
}


search.addEventListener("keyup", (e) =>{

  listenerValue = e.target.value;
  filterAlmacen();
});

function filterAlmacen(){
  let filtradoPorSearchbar = events.filter(e => e.name.toLowerCase().includes(listenerValue));
  let filtradoPorCheckbar = events.filter(e => checkedCategories.includes(e.category));


  if(listenerValue.length > 0){
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
  }
  if (allCardsContainer.innerHTML.length == 0){
    allCardsContainer.innerHTML =
    `<div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 cardCont">
      <div class="card">
        <img src="./assets/img/AmazingNotFound.png" class="nfImage">
        <div class="card-body nfCardBody">
          <h5 class="card-title">Ups!</h5>
          <p class="card-text centText">There are no Events that match your search.</p>
        </div>
      </div>
    </div`;
  }


}

//Calling the functions:

async function fetchingData(){
  const datosFetched = await getData();

  try{
  // console.log(events)

  createAllCards(eventsDB.events);
  paintAllCards();

  createNoRepeatCategories();
  paintCategories();

  }catch(err){

  }
}


fetchingData();



