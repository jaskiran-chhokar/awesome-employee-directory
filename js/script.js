/* 
    GLOBAL VARIABLES 
*/ 
const gallery = document.querySelector('#gallery'); 


/* 
    FETCH FUNCTIONS 
*/ 

fetch('https://randomuser.me/api/?results=12&nat=us')
.then (checkStatus)
.then(res => res.json())
.then(data => {

    const employees = data.results.map(employee =>  {
        employeeInfo(employee);
        cardInteract(employee);
    });

    console.log(data.results);

})
.catch(err => console.log('Looks like something went wrong.', err))

/*
    HELPER FUNCTIONS
*/

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response); 
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function employeeInfo(employee) {
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

const body = document.getElementById('body'); 
const modal = document.createElement('div'); 
modal.className = 'modal-container';

function generateModal(employee) {
    modal.innerHTML = `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.cell}</p>
            <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.country} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${employee.dob.date}</p>
        </div>
    </div>

    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    `; 

   body.appendChild(modal);

}

function cardInteract(employee) {
    const cards = document.querySelectorAll('.card'); 

    cards.forEach(card => {
        card.addEventListener('click', e => {
            generateModal(employee);
        }); 
    });

}