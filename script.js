document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let isTransitioning = false;

    function updateSlider(instant = false) {
        if (instant) {
            slider.style.transition = 'none';
        } else {
            slider.style.transition = 'transform 0.5s ease-in-out';
        }
        slider.style.transform = `translateX(-${currentSlide * 25}%)`;
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentSlide++;
        updateSlider();

        if (currentSlide >= slides.length) {
            setTimeout(() => {
                currentSlide = 0;
                updateSlider(true);
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        if (currentSlide === 0) {
            currentSlide = slides.length;
            updateSlider(true);
            setTimeout(() => {
                currentSlide--;
                updateSlider();
            }, 20);
        } else {
            currentSlide--;
            updateSlider();
        }

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // 버튼 클릭 이벤트
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 터치 이벤트 처리
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        if (isTransitioning) return;
        touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    });

    // 자동 슬라이드 제거
    // let autoSlideInterval = setInterval(nextSlide, 5000);

    // 마우스 호버 시 자동 슬라이드 일시 정지 제거
    // slider.addEventListener('mouseenter', () => {
    //     clearInterval(autoSlideInterval);
    // });

    // slider.addEventListener('mouseleave', () => {
    //     autoSlideInterval = setInterval(nextSlide, 5000);
    // });
}); 