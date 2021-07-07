let mymap = L.map('mapId').setView([44.479911, -73.214791], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap)

fetch('http://localhost:8080/all.json')
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        res.forEach(element => {
            fetch(`http://localhost:8080/${element}.json`)
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    document.getElementById("restaurantnames").innerHTML += `<li>${res.name}</li>`
                    fetch('https://nominatim.openstreetmap.org/search/?q=' + res.address + '&format=json')
                        .then((res) => {
                            return res.json()
                        })
                            .then((res)=>{
                                let marker = L.marker([res[0].lat, res[0].lon]).addTo(mymap);
                            marker.addEventListener("click", ()=>{
                                window.location = "http://localhost:8080/restaurant.html#" + element
                            })
                            })
                })
        });
    })