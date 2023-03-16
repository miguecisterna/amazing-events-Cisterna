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


async function getStatsData(){
    const statsFetched = await getData();
    try{
        //console.log(statsEvents);
        filterPastEvents(events);
        createTops(pastEvents);
        createEventsByCapacity(pastEvents);
    }catch(err){

    }
}

function createTops(arr){

    arr.forEach(element => {
        eventsTopPercents.push({
            name:element.name,
            percentage: ((element.assistance * 100) / element.capacity),
            capacity: element.capacity
        })
    });

    eventsTopPercents.sort((a, b) => b.percentage - a.percentage);

    top1.innerText = eventsTopPercents[0].name + " = " + Number.parseFloat(eventsTopPercents[0].percentage).toFixed(2) + " %";
    top2.innerText = eventsTopPercents[1].name + " = " + Number.parseFloat(eventsTopPercents[1].percentage).toFixed(2) + " %";
    top3.innerText = eventsTopPercents[2].name + " = " + Number.parseFloat(eventsTopPercents[2].percentage).toFixed(2) + " %";

    bot1.innerText = eventsTopPercents[eventsTopPercents.length -1].name + " = " + Number.parseFloat(eventsTopPercents[eventsTopPercents.length -1].percentage).toFixed(2) + " %";
    bot2.innerText = eventsTopPercents[eventsTopPercents.length -2].name + " = " + Number.parseFloat(eventsTopPercents[eventsTopPercents.length -2].percentage).toFixed(2) + " %";
    bot3.innerText = eventsTopPercents[eventsTopPercents.length -3].name + " = " + Number.parseFloat(eventsTopPercents[eventsTopPercents.length -3].percentage).toFixed(2) + " %";

    console.log(eventsTopPercents[eventsTopPercents.length -1]);
    console.log(eventsTopPercents[eventsTopPercents.length -2]);
    console.log(eventsTopPercents[eventsTopPercents.length -3]);

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

getStatsData();