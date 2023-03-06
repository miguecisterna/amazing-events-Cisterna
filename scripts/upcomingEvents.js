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


//Upcoming events variables

let upcomingCards = "";
let upcomingCardsContainer = document.getElementById("upcomingCardsContainer");
let upcomingEvents = [];

//Upcoming events cards display functions:

function createUpcomingCards(arr) {
    upcomingCards ="";
    for (event_ of arr) {
        upcomingCards += 
        `<div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 cardCont">
            <div class="card">
                <img src="${event_.image}">
                <div class="card-body">
                    <h5 class="card-title">${event_.name}</h5>
                    <p class="card-text">${event_.description}</p>
                    <div class="cardFooter">
                        <p>Price: $${event_.price}</p>
                        <a href="#" class="btn btn-primary card-btn">More Info</a>
                    </div>
                </div>
            </div>
        </div>`;
    }
}

function filterUpcomingEvents(events){
    for(event_ of events){
        if(event_.date > today){
            upcomingEvents.push(event_);
        }
    }
    console.log(upcomingEvents);
}

function paintUpcomingCards(){
    upcomingCardsContainer.innerHTML = upcomingCards;
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

    createUpcomingCards(filtraPorNombre(search.value.toLowerCase(), upcomingEvents));
    paintUpcomingCards();


});


//Calling the functions:

filterUpcomingEvents(eventsDB.events);
createUpcomingCards(upcomingEvents);
paintUpcomingCards();

createNoRepeatCategories();
paintCategories();
