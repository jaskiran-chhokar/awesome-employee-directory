//Global Variables
const gallery = document.querySelector('#gallery'); 

//Fetch Request
fetch('https://randomuser.me/api/?results=12&nat=us')
.then(res => res.json())
.then(data => data.results.map(employee =>  employeeInfo(employee)))

const employeeInfo = employee => {
    gallery.innerHTML += 
    `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}</p>
        </div>
    </div>`; 
}
