const queryString = location.search;
console.log(queryString);
const params = new URLSearchParams(queryString);
console.log(params);
const idEvent = params.get("id");
console.log(idEvent);



const detailsCard = document.getElementById("detailsCard");
let event_ = events[idEvent - 1];
detailsCard.innerHTML = `
<div class="row detailsCardContent g-0">
    <div class="col-md-4">
        <img src="${event_.image}" class="img-fluid rounded-start" alt="...">
</div>
<div class="col-md-8">
<div class="card-body">
    <h5 class="card-title">${event_.name}</h5>
    <p class="card-text"><small>${event_.date}</small></p>
    <p class="card-text">${event_.description}</p>
    <p class="card-text">Categories: <a href="">Night</a> - <a href="">${event_.category}</a></p>
    <p class="card-text">Location: ${event_.place}</p>
    <p class="card-text">Capacity: ${event_.capacity}</p>
    <p class="card-text">Asistance or estimate: ${event_.assistance}</p>
    <p class="card-text">Price: $${event_.price}</p>
</div>
</div>
</div>
`

