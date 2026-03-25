document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.getElementById('welcome');
    welcomeSection.classList.remove('hidden');
    welcomeSection.classList.add('visible');

    // Reproductor de musica
    const musicToggle = document.getElementById('music-toggle');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const progressFill = document.getElementById('progress-fill');
    let isPlaying = false;
    const audio = new Audio('tu_amor_por_siempre_axel.mp3');
    audio.loop = true;
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = progress + '%';
        }
    });
    musicToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            audio.play().catch(error => {
                console.log("Audio play failed (interaction needed):", error);
                isPlaying = false;
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            });
        } else {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            audio.pause();
        }
    });

    // Animaciones al scrollear
    const observerOptions = {
        threshold: 0.15
    };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    const revealElements = document.querySelectorAll('.reveal, .fade-in');
    revealElements.forEach(el => revealObserver.observe(el));

    // Contador regresivo para la fecha
    const countDownDate = new Date('2026-07-04T11:00:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        if (distance < 0) {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        daysEl.innerText = days < 10 ? `0${days}` : days;
        hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
        minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();
    const photoContainer = document.querySelector('.photo-container');
    if (photoContainer) {
        setTimeout(() => {
            photoContainer.style.bottom = '42%';
        }, 800);
    }
});

