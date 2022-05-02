const API_KEY = '25371259-9d972d577815028f5429dc99a';
const BASE_URL = 'https://pixabay.com/api';

export function fetchAPI(value, page) {
  return fetch(`${BASE_URL}/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Упс :( Что-то произошло. Повторите запрос! `))
    }).then(r => { 
      return r.hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
        id,
        largeImageURL,
        webformatURL,
        tags,
      }));
    });
  
};

export function fetchTotalHits(value, page) {
  return fetch(`${BASE_URL}/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Упс :( Что-то произошло. Повторите запрос! `))
    }).then(r => { 
      return r.totalHits;
    });
  
};
