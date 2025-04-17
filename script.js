document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let isTransitioning = false;

    // 첫 번째 슬라이드와 마지막 슬라이드를 복제하여 앞뒤에 추가
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);
    slider.appendChild(firstSlideClone);
    slider.insertBefore(lastSlideClone, slides[0]);

    // 초기 위치 설정 (첫 번째 슬라이드로)
    currentSlide = 1;
    slider.style.transform = `translateX(-${currentSlide * 25}%)`;

    function updateSlider(instant = false) {
        if (instant) {
            slider.style.transition = 'none';
        } else {
            slider.style.transition = 'transform 0.3s ease';
        }
        slider.style.transform = `translateX(-${currentSlide * 25}%)`;
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        if (currentSlide === slides.length - 1) {
            // 마지막 슬라이드에서 첫 번째로 즉시 전환
            slider.style.transition = 'none';
            currentSlide = 0;
            slider.style.transform = `translateX(0)`;
            isTransitioning = false;
        } else {
            currentSlide++;
            slider.style.transition = 'transform 0.3s ease';
            slider.style.transform = `translateX(-${currentSlide * 25}%)`;
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        if (currentSlide === 0) {
            // 첫 번째 슬라이드에서 마지막으로 즉시 전환
            slider.style.transition = 'none';
            currentSlide = slides.length - 1;
            slider.style.transform = `translateX(-${currentSlide * 25}%)`;
            isTransitioning = false;
        } else {
            currentSlide--;
            slider.style.transition = 'transform 0.3s ease';
            slider.style.transform = `translateX(-${currentSlide * 25}%)`;
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }
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