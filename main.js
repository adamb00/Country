const btnSearch = document.querySelector('.btnSearch');
const inputElement = document.querySelector('.inputCountry');
const container = document.querySelector('.container');
const countryContainer = document.querySelector('.countryContainer');

async function fetchCountry() {
  try {
    let countryName = inputElement.value;
    const URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    const country = await fetch(URL);
    const response = await country.json();

    const getCountryData = function () {
      countryContainer.style.visibility = 'visible';
      countryContainer.innerHTML = `
      <div class="country">
        <div class="flag">
          ${response[0].flag}
        </div> 
          <div class="currency">
           Currency:  ${
             response[0].currencies[Object.keys(response[0].currencies)].name
           } - ${Object.keys(response[0].currencies)[0]}
          </div>
          <div class="population">
           Population:  ${response[0].population}
          </div>
          <div class="region">
           Region:  ${response[0].region}
          </div>
          <div class="capital">
           Capital:  ${response[0].capital}
          </div>
          <div class="languages">
           Languages:  ${Object.values(response[0].languages)
             .toString()
             .split(',')
             .join(', ')}
          </div>
      </div>
        `;
    };
    getCountryData();
  } catch (error) {
    countryContainer.innerHTML = error;
  }
}

btnSearch.addEventListener('click', e => {
  e.preventDefault();
  fetchCountry();
});
