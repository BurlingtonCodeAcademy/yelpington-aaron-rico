let filename = document.location.href.split("#")[1];

let mymap = L.map('mapId').setView([51.505, -0.09], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap) 

fetch(`http://localhost:8080/${filename}.json`)
.then((res)=>{
   return res.json()
}).then((object)=>{
   document.getElementById("name").innerHTML = object.name;
   document.getElementById("address").innerHTML = object.address;
   document.getElementById("phone").innerHTML = object.phone;
   document.getElementById("hours").innerHTML = object.hours;
   object.notes.forEach(element => {
     
   document.getElementById("notes").innerHTML += marked(element) + "<br></br>"
});
   fetch('https://nominatim.openstreetmap.org/search/?q='+ object.address + '&format=json')
   .then((res)=>{
      return res.json()
   })
   .then((object)=>{
      let marker = object[0];
      mymap.setView([marker.lat, marker.lon], 19)
      let markerSpot = L.marker([marker.lat, marker.lon]).addTo(mymap);
   })

})

