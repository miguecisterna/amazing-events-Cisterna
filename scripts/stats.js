// Variables:

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

let tableCont = document.getElementById("upEventsByCat");


async function getStatsData(){
    const statsFetched = await getData();
    try{
        //console.log(statsEvents);
        filterPastEvents(events);
        createTops(pastEvents);
        createEventsByCapacity(pastEvents);
        createUpEventsStatsByCat();
    }catch(err){

    }
}

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

    // console.log(eventsTopPercents[eventsTopPercents.length -1]);
    // console.log(eventsTopPercents[eventsTopPercents.length -2]);
    // console.log(eventsTopPercents[eventsTopPercents.length -3]);

}

function filterPastEvents(arr){
    
    for(event_ of arr){
        if(event_.date < today){
            pastEvents.push(event_);
        }
    }
}

function createEventsByCapacity(arr){
    arr.forEach(element => eventsByCapacity.push(element));
    eventsByCapacity.sort((a,b) => b.capacity - a.capacity);
    
    byCapacity1.innerText = eventsByCapacity[0].name;
    byCapacity2.innerText = eventsByCapacity[1].name;
    byCapacity3.innerText = eventsByCapacity[2].name;
}

function createUpEventsStatsByCat(){
    let categoryStats = [];
    let upcoming = [];

    events.forEach(event => {
        if(event.date > today){
            upcoming.push(event);
            // console.log(upcoming);
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
                            atendance: atendance,
                            })
    })

    console.log(categoryStats);

    // for(let i = 0; i < events.length; i++){
    //     if(events[i].date > today){
    //         upcoming.push(events[i]);

    //         for(let j = 0; j <= categoryStats.length; j++){
    //             if(events[i].name != categoryStats[j].name){
    //                 categoryStats.push({
    //                     category: events[i].category,
    //                     revenues: events[i].price * events[i].estimate,
    //                     atendance: (events[i].estimate * 100) / events[i].capacity
    //                 });
    //             }
    //             else if(categoryStats[j].name == events[i].name){
    //                 categoryStats[j].revenues = categoryStats[j].revenues + (events[i].price * events[i].estimate);
    //             }  
    //             //console.log("entré")
    //         }

            

    //     }

    //     console.log(upcoming)
    // }

    // // console.log(upcoming);
}

getStatsData();