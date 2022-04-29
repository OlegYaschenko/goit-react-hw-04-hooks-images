const API_KEY = '25371259-9d972d577815028f5429dc99a';
const BASE_URL = 'https://pixabay.com/api';

function fetchImages(value, page) {
  return fetch(`${BASE_URL}/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Упс :( Что-то произошло. Повторите запрос! `))
  });
  
};

export default fetchImages;
