import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

const inputEl = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

function onInputChange(event) {
  fetchCountries(event.target.value).then(data => {
    console.log(data);
  });
}

inputEl.addEventListener('input', onInputChange);
