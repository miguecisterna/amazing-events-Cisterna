//Home events variables:
let allCards = "";
let allCardsContainer = document.getElementById("allCardsContainer");

//Filter variables:
let search = document.getElementById("search");
let filteredArr = [];

//Filter by categories variables:
let selectedCategories = [];


//Categories Functions
function createNoRepeatCategories(){
  for(category of noRepeatCategories){ 
    allCategoriesHTML += 
    `<div class="col-sm-4 category" id="category">
      <input type="checkbox" name="category" class="checkbox" id="${category}" value="${category}">${category}
    </div>`
  }
}

function paintCategories(){
  allCategoriesContainer.innerHTML = allCategoriesHTML;
}

function createCategoriesSelected(){
  for(category of noRepeatCategories){
    selectedCategories.push(category);
  }
  console.log([selectedCategories]);
}


//Home events cards display functions:
function createAllCards(arr) {
  allCards="";
  allCardsContainer.innerHTML = "";
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
            <a href="./details.html" class="btn btn-primary card-btn">More Info</a>
          </div>
        </div>
      </div>
    </div>`;
    
  }
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
      console.log(nombre);
      console.log(event_.name);
      console.log("condicion del if " + event_.name.includes(nombre));
    }

  }
  console.log(lista);
  return lista;
}

search.addEventListener("keyup", () =>{

  createAllCards(filtraPorNombre(search.value.toLowerCase(), eventsDB.events));
  paintAllCards();


})

//Calling the functions:

createAllCards(eventsDB.events);
paintAllCards();

createNoRepeatCategories();
paintCategories();

createCategoriesSelected();






