const carousel = document.querySelector(".carousel__inner");
const items = document.querySelectorAll(".carousel__item");
const prevButton = document.querySelector(".carousel__control--prev");
const nextButton = document.querySelector(".carousel__control--next");
const indicators = document.querySelectorAll(".carousel__indicator");

let currentIndex = 0;

const showSlide = (index) => {
    items.forEach((item, i) => {
        item.classList.toggle("active", i === index);
        indicators[i].classList.toggle("active", i === index);
    });
};

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
});

indicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
        currentIndex = i;
        showSlide(currentIndex);
    });
});


 setInterval(() => {
     currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
}, 5000);