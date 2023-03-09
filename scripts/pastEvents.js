//Filter variables:
let search = document.getElementById("search");
let filteredArr = [];

//Categories Functions
function createNoRepeatCategories(){
    for(category of noRepeatCategories){ 
        allCategoriesHTML += `<div class="col-sm-4 category"><input type="checkbox" name="category" class="checkbox">${category}</div>`
    }
    }
    
    function paintCategories(){
    allCategoriesContainer.innerHTML = allCategoriesHTML;
    }


//Past Events variables:

let pastCards = "";
let pastCardsContainer = document.getElementById("pastCardsContainer");
let pastEvents = [];

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

}

function filterPastEvents(events){
    for(event_ of events){
        if(event_.date < today){
            pastEvents.push(event_);
        }
    }
    console.log(pastEvents);
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
    console.log(lista);
    return lista;
}

search.addEventListener("keyup", () =>{

    createPastCards(filtraPorNombre(search.value.toLowerCase(), pastEvents));
    paintPastCards();


});

//Calling the functions:

filterPastEvents(eventsDB.events);
createPastCards(pastEvents);
paintPastCards();

createNoRepeatCategories();
paintCategories();

