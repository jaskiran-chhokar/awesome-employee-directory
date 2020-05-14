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
.then(data => data.results.map(employee =>  employeeInfo(employee)))
.then(cardInteract)
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

function generateModal() {
    const body = document.querySelector('body'); 
    body.innerHTML = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>

    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    </div>
    `; 
}

function cardInteract() {
    const cards = document.querySelectorAll('.card'); 
    cards.forEach(card => {
        card.addEventListener('click', () => {
            generateModal();
        }); 
    }); 
}

/* 
    EVENT LISTENERS
*/



// window.addEventListener('DOMContentLoaded', test);

