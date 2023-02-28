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

//Past Events card display functions:

function createPastCards() {
    for (event_ of eventsDB.events) {
        if (eventsDB.currentDate > event_.date) {
            pastCards += 
            `<div class="col-sm-12 col-md-6 col-lg-6 col-xl-4">
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
}

function paintPastCards() {
    pastCardsContainer.innerHTML = pastCards;
}

//Calling the functions:

createPastCards();
paintPastCards();

createNoRepeatCategories();
paintCategories();