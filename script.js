class Carousel {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.carouselSlides = document.querySelector('.carousel-slides');
        this.currentIndex = 0;
        this.slideInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        this.startAutoPlay();

        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        this.updateSlidePosition();
    }

    updateSlidePosition() {
        // Move slides using transform
        const offset = -this.currentIndex * 100;
        this.carouselSlides.style.transform = `translateX(${offset}%)`;

        // Update indicators
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === this.currentIndex);
        });
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlidePosition();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlidePosition();
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.slideInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    handleKeyPress(e) {
        if (e.key === 'ArrowLeft') this.prevSlide();
        else if (e.key === 'ArrowRight') this.nextSlide();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});
