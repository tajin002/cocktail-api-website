const loadElementsData = (searchText , dataLimit) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => displayElementsData(data.drinks , dataLimit))
}

/**this is web view section  */
const displayElementsData = (elements , dataLimit) => {
    const elementContainer = document.getElementById('elements-container');
    elementContainer.textContent = ``;
    //show 10 item code here
    const detailsDiv = document.getElementById('details-div');
    if (dataLimit && elements?.length > 10) {
        elements = elements.slice(0, 10);
        detailsDiv.classList.remove('d-none');
    
    }
    else {
        detailsDiv.classList.add('d-none');
    }

    //show no found result
    const noFound = document.getElementById('no-found-msg');
    if (elements === null) {
        noFound.classList.remove('d-none');
        
    }
    else {
        noFound.classList.add('d-none');
    
    }
    
    elements?.forEach(element => {
        // console.log(element)
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('col');
        elementDiv.innerHTML = `
        <div class="container col">
        <div class="container shadow rounded p-4 mt-4">
          <div class="card-body">
          <img src="${element.strDrinkThumb}" class="card-img-top w-75 rounded" alt="...">
            <h4 class="card-title mt-4 fw-bold">Drink Name : ${element.strDrink}</h4>
            <p class="card-text text-success fw-semibold">Category : ${element.strCategory}</p>

            <button onclick="loadElementDetails(${element.idDrink})" id="details-btn" type="button" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#showDetails">Show Details</button>
          </div>
        </div>
      </div>
        `;

        elementContainer.appendChild(elementDiv);
    });
}

/**this is only for search section to find product input+btn  just click btn search show result*/
document.getElementById('btn-Field').addEventListener('click', function () {
    processData(10);
});

const processData = (dataLimit) => {
    const searchField = document.getElementById('input-Field');
    const searchText = searchField.value;
    loadElementsData(searchText, dataLimit);
}

document.getElementById('details-btn').addEventListener('click', function () {
    processData()
})

const loadElementDetails = id => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
    .then(data => displayDetails(data.drinks[0]))
}

displayDetails = element => {
    console.log(element);
    const modalTittle = document.getElementById('showDetailsLabel');
    modalTittle.innerHTML = element.strDrink;
    const detailsElements = document.getElementById('details-element');
    detailsElements.innerHTML = `
    <div class="col">
    <div class="card">
      <div class="card-body">
      <h4 class="card-title mt-4 fw-bold">Drink Name : ${element.strDrink}</h4>
      <p class="card-text text-success fw-semibold"><span class="text-black">Category</span> : ${element.strCategory}</p>
      <p class="card-text text-success fw-semibold"><span class="text-black">Category</span> : ${element.strAlcoholic}</p>
      <p class="card-text text-success fw-semibold"><span class="text-black">Type</span> : ${element.strGlass}</p>
      <p class="card-text text-success fw-semibold"><span class="text-black">Contemporary</span> : ${element.strIBA}</p>
      <p class="card-text text-success fw-semibold"><span class="text-black">Drink materials</span> : ${element.strIngredient1}, ${element.strIngredient2}, ${element.strIngredient3}, ${element.strIngredient4}</p>
      <p>Instruction : ${element.strInstructions}</p>

      </div>
    </div>
  </div>
    `;
}
loadElementDetails();
  loadElementsData('');