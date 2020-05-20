/* 
    GLOBAL VARIABLES 
*/ 
const gallery = document.querySelector('#gallery'); 
const body = document.getElementById('body'); 
const modal = document.createElement('div'); 
modal.className = 'modal-container';

/* 
    FETCH FUNCTION
*/ 
fetch('https://randomuser.me/api/?results=12&nat=us')
.then(checkStatus)
.then(res => res.json())
.then(data => { 
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
/*
    Generate cards for each employee
*/
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
/*
    Responsible for user interaction with card
*/
function cardInteract(employees) {
    gallery.addEventListener('click', e => {
        const cards = document.querySelectorAll('.card'); 
        const cardClicked = e.target.closest('.card');
        let cardClickedName;

        if(cardClicked) {
            for(let i = 0; i < cards.length; i++) {
                cardClickedName = cardClicked.firstElementChild.nextElementSibling.firstElementChild;
                cardName = cards[i].firstElementChild.nextElementSibling.firstElementChild; 
                if(cardClickedName.textContent === cardName.textContent) { 
                    generateModal(employees[i],i); 
                    modalToggle(i+1, i-1, employees);
                }
            }
        }
    });
}

/*
    Generate modal window for corresponding employee
*/
function generateModal(employee, index) {

    if(employee !== undefined) {

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
        
        disableButton(index); 
        body.appendChild(modal);
    }
}

/*
    Format employee birthday for readibility
*/
const formatBirthday = employee => {
    let birthday = employee.dob.date; 
    const regex = /[A-Za-z].+/gm; 
    birthday = birthday.replace(regex, ''); 
    return birthday; 
}

/*
    Toggle back and forth between employees while modal window is open 
*/ 
function modalToggle(nextIndex, prevIndex, employee) {

    disableButton(prevIndex);
    disableButton(nextIndex);
    
    modal.addEventListener('click', e => {

        modalClose(e.target);

        if(e.target.classList.contains('modal-prev')) {
            generateModal(employee[prevIndex--],prevIndex);
            nextIndex--;    
        } else if(e.target.classList.contains('modal-next')) {
            generateModal(employee[nextIndex++],nextIndex);
            prevIndex++;
        } 
    }); 
}

/*
    Disable buttons on first and last modal window 
*/
function disableButton(index) {

    const prevButton = document.querySelector('#modal-prev'); 
    const nextButton = document.querySelector('#modal-next'); 

    if(index === -1) {
        prevButton.classList.add('pointer-none');
    } else if(index === 12) {
        nextButton.classList.add('pointer-none');
    }
}

/*
    Close modal window 
*/ 
function modalClose(closeButton) {
    if(closeButton.className === 'modal-close-x' || (closeButton.className === 'modal-close-btn')) { 
        modal.remove();
    }   
}
/* 
    Insert search input into DOM
*/
const insertSearch = () => {
    const searchContainer = document.querySelector('.search-container');
    const searchDiv = document.createElement('form'); 
    searchDiv.setAttribute('method','get'); 
    searchDiv.setAttribute('action','#'); 
    searchDiv.innerHTML = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">`; 
    searchContainer.appendChild(searchDiv);
}

insertSearch();

/*
    Search functionality 
*/ 
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-submit'); 
const searchMessage = document.createElement('p'); 

const search = () => {

    const names = document.querySelectorAll('.card-name'); 
    noSearchResultsMsg();

    for(let i = 0; i < names.length; i++) {

        const card = names[i].parentElement.parentElement; 
        card.classList.add('display-none');

        if(searchInput.value !== 0 && names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
            card.classList.remove('display-none');
            searchMessage.remove();
        }

        if(searchInput.value === '') {
            card.classList.remove('display-none');
            searchMessage.remove();
        } 
    }
}

/*
    Error message for 'No Search Results Found' 
*/
const noSearchResultsMsg = () => {
    searchMessage.className = 'no-results-message'; 
    gallery.appendChild(searchMessage);
    searchMessage.innerHTML = 'Sorry, No Search Results Found...';  
}

/* 
    EVENT LISTENERS 
*/ 
searchInput.addEventListener('keyup', () => {
    search();
}); 

searchButton.addEventListener('click', e => {
    search();
    e.preventDefault();
}); 