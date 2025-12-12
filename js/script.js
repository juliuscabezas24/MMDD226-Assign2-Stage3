document.addEventListener('DOMContentLoaded', function () {
    const heroImage = document.getElementById('hero-image-sequence');
    const heroSection = document.querySelector('.hero');
    const aboutModel = document.getElementById('about-3d-cake');
    const aboutSection = document.querySelector('.about-section');

    function clampProgress(value) {
        if (value < 0) {
            return 0;
        }
        if (value > 1) {
            return 1;
        }
        return value;
    }

    function setupSmoothLinks() {
        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(function (anchor) {
            anchor.addEventListener('click', function (event) {
                event.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function updateHeroImage() {
        if (!heroImage || !heroSection) {
            return;
        }

        const heroStart = heroSection.offsetTop;
        const heroEnd = heroStart + heroSection.offsetHeight * 0.4;
        let progress = (window.scrollY - heroStart) / (heroEnd - heroStart);
        progress = clampProgress(progress);

        const totalImages = 20;
        const imageIndex = Math.floor(progress * (totalImages - 1));
        
        const imageNumber = String(imageIndex).padStart(2, '0');
        heroImage.src = `img/cake${imageNumber}.png`;
    }

    function updateAboutRotation() {
        if (!aboutModel || !aboutSection) {
            return;
        }

        const aboutStart = aboutSection.offsetTop;
        const aboutEnd = aboutStart + aboutSection.offsetHeight;
        let progress = (window.scrollY - aboutStart) / (aboutEnd - aboutStart);
        progress = clampProgress(progress);

        const rotation = progress * 360;
        aboutModel.setAttribute('camera-orbit', `${rotation}deg 60deg 100%`);
    }

    function handleScroll() {
        updateHeroImage();
        updateAboutRotation();
    }

    function handleResize() {
        updateHeroImage();
        updateAboutRotation();
    }

    setupSmoothLinks();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
});

