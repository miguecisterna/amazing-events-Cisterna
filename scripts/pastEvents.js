//Filter variables:
let search = document.getElementById("search");
let filteredArr = [];
let listenerValue = "";

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


//Past Events variables:

let pastCards = "";
let pastCardsContainer = document.getElementById("pastCardsContainer");
let pastEvents = [];

//Filter by categories variables:
let checkedCategories = [];
let checkedevents = [];
let checkedRefe = document.getElementById("allCategoriesContainer");

//Past Events card display functions:

function createPastCards(arr) {
    pastCards="";
    for (event_ of arr) {
    pastCards += 
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
    return pastCards;

}

function filterPastEvents(events){
    for(event_ of events){
        if(event_.date < today){
            pastEvents.push(event_);
        }
    }
}

function paintPastCards() {
    pastCardsContainer.innerHTML = pastCards;
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

    // createPastCards(filtraPorNombre(search.value.toLowerCase(), pastEvents));
    // paintPastCards();
    listenerValue = e.target.value;
    filterAlmacen();
});

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

function filterAlmacen(){
    let filtradoPorSearchbar = pastEvents.filter(e => e.name.toLowerCase().includes(listenerValue));
    let filtradoPorCheckbar = pastEvents.filter(e => checkedCategories.includes(e.category));
    
    // console.log(filtradoPorSearchbar);
    // console.log(filtradoPorCheckbar);
    // console.log(filtradoPorCheckbar.forEach());
    // console.log(events);
    // console.log(checkedCategories);

    if(listenerValue.length > 0){
      // createAllCards(filtradoPorSearchbar);
      // paintAllCards();
    pastCardsContainer.innerHTML = createPastCards(filtradoPorSearchbar);
    let controlFinal = filtradoPorSearchbar.filter(fs => fs.category.includes(checkedCategories.toString()));
    pastCardsContainer.innerHTML = createPastCards(controlFinal);
    }else if(listenerValue.length == 0){
    pastCardsContainer.innerHTML = createPastCards(pastEvents);
    }
    if(checkedCategories.length > 0){
    pastCardsContainer.innerHTML = createPastCards(filtradoPorCheckbar);
    let controlFinal2 = filtradoPorCheckbar.filter(fs => fs.name.toLowerCase().includes(listenerValue.toString()));
    pastCardsContainer.innerHTML = createPastCards(controlFinal2);
    }
    if (pastCardsContainer.innerHTML.length == 0){
    pastCardsContainer.innerHTML =
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

filterPastEvents(eventsDB.events);
createPastCards(pastEvents);
paintPastCards();

createNoRepeatCategories();
paintCategories();

