const requestTarget = document.querySelector('#request');
const itemContainer = document.querySelector('#item-cont');
const intersectionOptions = {
    threshold: 1
}

let apiUrl = 'https://rickandmortyapi.com/api/character';
let loading = false;

const onIntersect = ([entry]) => {
    if(apiUrl && !loading && entry.isIntersecting)
        makeRequest();
}

const makeRequest = () => {
    loading = true;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cleanUp(data.info.next);
            renderItems(data.results);
        });
}

const cleanUp = nextPage => {
    apiUrl = nextPage;
    loading = false;
}

const renderItems = results => {
    results.forEach(item => {
        itemContainer.appendChild(createItem(item));
    });
}



const createItem = item => {
    const newItem = document.createElement('div');
   
    newItem.classList.add('item');
    newItem.innerHTML = (
        
        `   
            <div class="row">
            <div class="col-md-4">
            <img class="imagen" src=${item.image} />

           </div>
           <div class="cn col-md-8 align-self-center">
            <div class="nombre">${item.name}</div>
            
            <div class="especies"> ${item.status} - ${item.species}</div>
            <div class="origen">${item.location.name}</div>
            
        <div>
            </div>
        `
        
    );
    return newItem;
}



let observer = new IntersectionObserver(onIntersect, intersectionOptions);

observer.observe(requestTarget);

