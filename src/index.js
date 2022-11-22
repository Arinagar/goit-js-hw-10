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
        console.log(data);
        let markup;
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          divEl.innerHTML = '';
          ulEl.innerHTML = '';
        } else if (data.length > 1) {
          ulEl.innerHTML = listTemplate(data);
          console.log(ulEl);
          // markup = data.map(el => {
          //   return `<li><img src='${el.flags.svg}' width='30' />${el.name.official}</li>`;
          // });
          // ulEl.innerHTML = markup.join('');
          divEl.innerHTML = '';
        } else {
          ulEl.innerHTML = '';
          divEl.innerHTML = divTemplate(data[0]);
        }
      })
      .catch(err => {
        inputEl.value = '';
        ulEl.innerHTML = '';
        divEl.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
