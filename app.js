const searchForm = document.querySelector('form');

const searchResult = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';

const app_ID = 'f1f50f68';
const app_key = 'e35128d34c5b4805527fceaa1b980af2';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  searchQuery = e.target.querySelector('input').value;

  fetchAPI(searchQuery);
});

async function fetchAPI (term) {
  const base_url = `https://api.edamam.com/search?q=${term}&app_id=${app_ID}&app_key=${app_key}`;
  const response = await fetch(base_url);

  const data = await response.json();

  generateHTML(data.hits);

}

function generateHTML(results){

  container.classList.remove('initial');

  let output ='';

  results.map(result => {
    output += `
      <div class="item">
        <img src= "${result.recipe.image}" alt="">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a href="${result.recipe.url}" class="btn">View Recipe</a>
        </div>
        <p class="item-data">Calories : ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet Label : ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found' }</p>
        <p class="item-data">Heath Label : ${result.recipe.healthLabels}</p>
      </div>
    `;
  })

  searchResult.innerHTML = output;
}