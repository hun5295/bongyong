document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let isTransitioning = false;

    function updateSlider() {
        // 각 슬라이드 너비가 25%이므로 transform 값도 25% 기준으로 계산
        slider.style.transform = `translateX(-${currentSlide * 25}%)`; 
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // 애니메이션 시간과 동일하게 설정
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // 애니메이션 시간과 동일하게 설정
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

    // 트랜지션 종료 이벤트 리스너
    slider.addEventListener('transitionend', () => {
        isTransitioning = false;
    });
}); 