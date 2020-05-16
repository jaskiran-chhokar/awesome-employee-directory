/* 
    GLOBAL VARIABLES 
*/ 

const gallery = document.querySelector('#gallery'); 
const body = document.getElementById('body'); 
const modal = document.createElement('div'); 
modal.className = 'modal-container';

/* 
    FETCH FUNCTIONS 
*/ 

fetch('https://randomuser.me/api/?results=12&nat=us')
.then(checkStatus)
.then(res => res.json())
.then(data => { 
    //console.log(data.results);
    generateEmployee(data.results);
   
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

function generateEmployee(employees) {
    employees.forEach(employee =>  {
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
    });

    cardInteract(employees); 
}

function cardInteract(employees) {
    gallery.addEventListener('click', e => {
        const cards = document.querySelectorAll('.card'); 
        const cardClicked = e.target.closest('.card');
        let cardClickedName;
        let cardNames; 

        if(cardClicked) {
            for(let i = 0; i < cards.length; i++) {
                cardClickedName = cardClicked.firstElementChild.nextElementSibling.firstElementChild.textContent;
                cardName = cards[i].firstElementChild.nextElementSibling.firstElementChild.textContent; 
                if(cardClickedName === cardName) { 
                    generateModal(employees[i]); 

                    //console.log(employees[i]);
                    modalToggle(i+1, i-1, employees);
                    
                }
                
            }
        }

    });
}

function generateModal(employee) {
    modal.innerHTML = `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong class="modal-close-x">X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text"> ${employee.cell}</p>
            <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.country} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${formatBirthday(employee)}</p>
        </div>
    </div>

    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>`;     

    body.appendChild(modal);

}

const formatBirthday = employee => {
    let birthday = employee.dob.date; 
    const regex = /[A-Za-z].+/gm; 
    birthday = birthday.replace(regex, ''); 
    return birthday; 
}

function closeModal() {
    body.addEventListener('click', (e) => {
        if(e.target.className === 'modal-close-x' || (e.target.className === 'modal-close-btn')) { 
            body.removeChild(modal); 
        }
    });
}

function modalToggle(nextIndex, prevIndex, employee) {

    body.addEventListener('click', e => {

        if(e.target.classList.contains('modal-prev')) {
            generateModal(employee[prevIndex--]);
            nextIndex--;          
        }
    
        if(e.target.classList.contains('modal-next')) {
            generateModal(employee[nextIndex++]);
            prevIndex++;  
        }

        if(prevIndex === -1) {
            const prevButton = document.querySelector('#modal-prev'); 
            prevButton.classList.add('pointer-none'); 
            return false;
        }

        if(nextIndex === 12) {
            const nextIndex = document.querySelector('#modal-next'); 
            nextIndex.classList.add('pointer-none');
            return false;
        }

    });
}

closeModal();