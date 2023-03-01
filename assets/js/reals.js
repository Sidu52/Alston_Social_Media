const videoSlider = document.querySelector('.video-slider');
const videoSliderTrack = videoSlider.querySelector('.video-slider-track');
const videoSlides = videoSlider.querySelectorAll('.video-slide');
const prevButton = videoSlider.querySelector('.video-slider-prev');
const nextButton = videoSlider.querySelector('.video-slider-next');

let slideIndex = 0;
const slideHeight = videoSlides[0].offsetHeight;
let currentVideo = null; // added variable to keep track of current video element

// update slide index and play the corresponding video when it's clicked
function showSlide(index) {
  videoSliderTrack.style.transform = `translateY(${index * -slideHeight}px)`;
  if (currentVideo) {
    currentVideo.pause();
  }
  currentVideo = videoSlides[index].querySelector('video');
  currentVideo.addEventListener('click', () => {
    currentVideo.play();
  });
  currentVideo.play(); // add autoplay when navigating to a new slide
  slideIndex = index;
}

// add event listeners to prevButton and nextButton
prevButton.addEventListener('click', () => {
  if (slideIndex > 0) {
    showSlide(slideIndex - 1);
  }
});

nextButton.addEventListener('click', () => {
  if (slideIndex < videoSlides.length - 1) {
    showSlide(slideIndex + 1);
  }
});

// show first slide
showSlide(0);
