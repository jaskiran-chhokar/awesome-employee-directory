/* 
    GLOBAL VARIABLES 
*/ 
const gallery = document.querySelector('#gallery'); 

/* 
    FETCH FUNCTIONS 
*/ 

fetch('https://randomuser.me/api/?results=12&nat=us')
.then(checkStatus)
.then(res => res.json())
.then(data => {

    const employees = data.results.forEach(employee =>  {
        generateEmployee(employee);
    });

   // console.log(data.results);
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

function generateEmployee(employee) {
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

function generateModal(name, cardEmail,cardCity, cardImage) {

    console.log(name.textContent, cardEmail.textContent,cardCity.textContent, cardImage.src);

    modal.innerHTML = `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong class="modal-close-x">X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${cardImage.src}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${name.textContent}</h3>
            <p class="modal-text">${cardEmail.textContent}</p>
            <p class="modal-text cap">${cardCity.textContent}</p>
            <hr>

            xxxxxx

        </div>
    </div>

    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    `; 

    // <p class="modal-text"> ${employee.cell}</p>
    // <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.country} ${employee.location.postcode}</p>
    // <p class="modal-text">Birthday: ${employee.dob.date}</p>

   body.appendChild(modal);
}

cardInteract();

function closeModal() {
    const modalClose = document.querySelector('.modal-close-btn strong'); 
    body.addEventListener('click', (e) => {
        if(e.target.className === 'modal-close-x') { body.removeChild(modal); }
    });
}

function cardInteract() {

    gallery.addEventListener('click', e => {

        
            let card; 
            

            if(e.target.closest('.card')) {

                if(e.target.classList.contains('card') === false) {

                    if(e.target.classList.contains('card-info-container') || (e.target.classList.contains('card-img-container'))){
                        card = e.target.parentElement;
                        //console.log(e.target.parentElement);
                    } else {
                        card = e.target.parentElement.parentElement; 
                        //console.log(e.target.parentElement.parentElement);
                    }

                } else {
                    //console.log(e.target);
                    card = e.target;
                }
            }

            console.log(card);

            const cardImage = card.firstElementChild.firstElementChild; 
            const cardName = card.firstElementChild.nextElementSibling.firstElementChild;
            const cardEmail = cardName.nextElementSibling;
            const cardCity = cardEmail.nextElementSibling;

            generateModal(cardName, cardEmail,cardCity, cardImage); 
        

    }); 


    
    







}

closeModal();

/*
    EVENT LISTENERS
*/

