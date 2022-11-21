import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import listTemplate from './templates/list.hbs';
import divTemplate from './templates/full-info.hbs';
import debounce from 'lodash.debounce';

const ulEl = document.querySelector('.country-list');
const inputEl = document.querySelector('#search-box');
const divEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

function onInputChange(event) {
  const searchQuery = event.target.value.trim().toLowerCase();
  if (searchQuery) {
    fetchCountries(searchQuery)
      .then(data => {
        let markup;
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          divEl.innerHTML = '';
          ulEl.innerHTML = '';

          return;
        } else if (data.length > 1) {
          console.log('Hello');
          markup = data.map(el => {
            return `<li><img src='${el.flags.svg}' width='30' />${el.name.official}</li>`;
          });
          divEl.innerHTML = '';
          ulEl.innerHTML = markup.join('');
        } else {
          ulEl.innerHTML = '';
          divEl.innerHTML = divTemplate(data[0]);
        }
      })
      .catch(err => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        inputEl.value = '';
      });
  }
}

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
