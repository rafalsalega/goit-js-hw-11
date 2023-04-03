import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import axios from 'axios';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const imagesPerPage = 40;


let i = 1;
let end = null;
let inputQuery = null;

form.addEventListener('submit', handleSubmit);

const fetchPictures = async (name, page = 1) => {
    const table = await axios.get(
      `https://pixabay.com/api/?key=35039655-92320119e5842251ded6e1c0f&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${imagesPerPage}`
    );
    return table;
  };

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

function handleSubmit(event) {
  event.preventDefault();
  inputQuery = input.value;
  i = 1;
  end = false;
  gallery.innerHTML = '';
  fetchPictures(inputQuery)
    .then(function (response) {
      // handle success
      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      renderImages(response);
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function handleSubmit(event) {
  event.preventDefault();
  inputQuery = input.value;
  i = 1;
  end = false;
  gallery.innerHTML = '';
  fetchPictures(inputQuery)
    .then(function (response) {
      // handle success
      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      renderImages(response);
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function renderImages(response) {
  const markupList = response.data.hits
    .map(
      image => `<div class="photo-card">
   <a href="${image.largeImageURL}"><img class="album" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${image.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markupList);
  lightbox.refresh();
}

