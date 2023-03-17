//                                    ========================> Variables: <========================

let statsEvents;
let topEvents;
let eventsTopPercents = [];
let eventsByCapacity = [];
let pastEvents = [];

//Tops td's:

let top1 = document.getElementById("top1");
let top2 = document.getElementById("top2");
let top3 = document.getElementById("top3");

let bot1 = document.getElementById("bot1");
let bot2 = document.getElementById("bot2");
let bot3 = document.getElementById("bot3");

let byCapacity1 = document.getElementById("byCapacity1");
let byCapacity2 = document.getElementById("byCapacity2");
let byCapacity3 = document.getElementById("byCapacity3");

// Upcoming Stats by Categories:

let tableUpCont = document.getElementById("upEventsByCat");
let categoryStats = [];
let categoriesPastStats = [];

// Past Stats by Categories:

let tablePastCont = document.getElementById("pastEventsByCat");



//                                    =======================> Functions: <=======================


//Getting the API Data and calling the fx's that depends on that data: 

async function getStatsData(){
    const statsFetched = await getData();
    try{
        filterPastEvents(events);
        createTops(pastEvents);
        createEventsByCapacity(pastEvents);
        createUpEventsStatsByCat();
        paintUpEventsStats();
        createPastEventsStatsByCat();
        paintPastEventsStats();
        
    }catch(err){

    }
}

// ----------------  Events Statistics Top 3:

//Creating the Top's Event Statistics:

function createTops(arr){

    arr.forEach(element => {
        eventsTopPercents.push({
            name:element.name,
            category: element.category,
            percentage: ((element.assistance * 100) / element.capacity),
            capacity: element.capacity,
            price: element.price,
            assistance: element.assistance
        })
    });

    eventsTopPercents.sort((a, b) => b.percentage - a.percentage);

    top1.innerText = eventsTopPercents[0].name + " = " + Number.parseFloat(eventsTopPercents[0].percentage).toFixed(2) + " %";
    top2.innerText = eventsTopPercents[1].name + " = " + Number.parseFloat(eventsTopPercents[1].percentage).toFixed(2) + " %";
    top3.innerText = eventsTopPercents[2].name + " = " + Number.parseFloat(eventsTopPercents[2].percentage).toFixed(2) + " %";

    bot1.innerText = eventsTopPercents[eventsTopPercents.length -1].name + " = " + Number.parseFloat(eventsTopPercents[eventsTopPercents.length -1].percentage).toFixed(2) + " %";
    bot2.innerText = eventsTopPercents[eventsTopPercents.length -2].name + " = " + Number.parseFloat(eventsTopPercents[eventsTopPercents.length -2].percentage).toFixed(2) + " %";
    bot3.innerText = eventsTopPercents[eventsTopPercents.length -3].name + " = " + Number.parseFloat(eventsTopPercents[eventsTopPercents.length -3].percentage).toFixed(2) + " %";

}

// Filtering Events to get the Past ones: 

function filterPastEvents(arr){
    
    for(event_ of arr){
        if(event_.date < today){
            pastEvents.push(event_);
        }
    }
}

// Painting the Top 3 Events:

function createEventsByCapacity(arr){
    arr.forEach(element => eventsByCapacity.push(element));
    eventsByCapacity.sort((a,b) => b.capacity - a.capacity);
    
    byCapacity1.innerText = eventsByCapacity[0].name;
    byCapacity2.innerText = eventsByCapacity[1].name;
    byCapacity3.innerText = eventsByCapacity[2].name;
}

// ----------------  Upcoming Events Stats by Categories fx's:

function createUpEventsStatsByCat(){

    let upcoming = [];

    events.forEach(event => {
        if(event.date > today){
            upcoming.push(event);
        }        
    })

    noRepeatCategories.forEach(category =>{
        let revenue = 0;
        let atendance = 0;
        let capacity = 0;

        for(let i = 0; i < upcoming.length; i++){
            if(upcoming[i].category == category){

                revenue = revenue + upcoming[i].price * upcoming[i].estimate;
                atendance = atendance + upcoming[i].estimate;
                capacity = capacity + upcoming[i].capacity;
            }
        }
        if(capacity == 0){
            atendance = 0;
        }else{
            atendance = (atendance*100)/capacity
        }
        categoryStats.push({
            category: category,
            revenues: revenue,
            atendance: atendance
        })
    })
}

function paintUpEventsStats(){
    categoryStats.forEach(category =>{
        let inner = "";
        inner += `
        <tr>
            <td> ${category.category}</td>
            <td> ${category.revenues}</td>
            <td> ${Number.parseFloat(category.atendance).toFixed(2)}%</td>
        </tr>
        `
        tableUpCont.innerHTML += inner;
    })
    
}

// ------------------- Past Events Stats by categories fx's:

function createPastEventsStatsByCat(){

    let past = [];

    

    events.forEach(event => {
        if(event.date < today){
            past.push(event);
        }        
    })

    // console.log(past)

    noRepeatCategories.forEach(category =>{
        let revenue = 0;
        let atendance = 0;
        let capacity = 0;
        // console.log("hasta acá llego")

        for(let i = 0; i < past.length; i++){
            if(past[i].category == category){
                
                revenue = revenue + past[i].price * past[i].assistance;
                atendance = atendance + past[i].assistance;
                capacity = capacity + past[i].capacity;
                console.log("hasta acá llego")
            }
        }
        if(capacity == 0){
            atendance = 0;
        }
        else{
            atendance = (atendance*100)/capacity
        }
        categoriesPastStats.push({
            category: category,
            revenues: revenue,
            atendance: atendance
        })
    })
    console.log(categoriesPastStats);
}

function paintPastEventsStats(){
    categoriesPastStats.forEach(category =>{
        let inner = "";
        inner += `
        <tr>
            <td> ${category.category}</td>
            <td> ${category.revenues}</td>
            <td> ${Number.parseFloat(category.atendance).toFixed(2)}%</td>
        </tr>
        `
        tablePastCont.innerHTML += inner;
    })
    
}

getStatsData();