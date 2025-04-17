document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
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

    // --- 스크롤 효과 추가 --- 
    const scrollThreshold = 50; // 스크롤 임계값 (px)
    let isMobile = window.innerWidth <= 768; // 초기 모바일 확인

    function handleScroll() {
        if (isMobile && sliderContainer) { // 모바일이고 sliderContainer가 있을 때만 실행
            if (window.scrollY > scrollThreshold) {
                sliderContainer.classList.add('shrink');
            } else {
                sliderContainer.classList.remove('shrink');
            }
        }
    }

    // 창 크기 변경 시 모바일 여부 재확인
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
        // 리사이즈 시 스크롤 상태 즉시 반영 (선택 사항)
        if (!isMobile && sliderContainer) {
            sliderContainer.classList.remove('shrink'); // PC에서는 shrink 제거
        }
        handleScroll(); // 리사이즈 후 스크롤 상태 다시 확인
    });

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 페이지 로드 시 초기 스크롤 상태 확인
    handleScroll();
    // --- 스크롤 효과 끝 --- 
}); 