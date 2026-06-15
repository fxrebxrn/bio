document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    const bioP = document.querySelector('.home-bio-content p');
    let fullText = '';
    let bioStarted = false;

    if (bioP) {
        fullText = bioP.textContent.trim();
        bioP.innerHTML = '';
        const cursor = document.createElement('span');
        cursor.className = 'bio-cursor';
        bioP.appendChild(cursor);
    }

    function getDelay(ch) {
        if (ch === '.' || ch === ',') return 80 + Math.random() * 60;
        if (ch === ' ') return 10 + Math.random() * 15;
        return 16 + Math.random() * 14;
    }

    function startBioTyping() {
        if (bioStarted || !bioP) return;
        bioStarted = true;
        const cursor = bioP.querySelector('.bio-cursor');
        let i = 0;
        function type() {
            if (i < fullText.length) {
                bioP.insertBefore(document.createTextNode(fullText[i]), cursor);
                const delay = getDelay(fullText[i]);
                i++;
                setTimeout(type, delay);
            } else {
                setTimeout(() => cursor.classList.add('bio-cursor-done'), 1500);
                setTimeout(() => cursor.remove(), 3000);
            }
        }
        type();
    }

    function countUp(el, target, duration, startDelay) {
        el.textContent = '0';
        setTimeout(() => {
            const t0 = performance.now();
            (function tick(now) {
                const t = Math.min((now - t0) / duration, 1);
                const v = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                el.textContent = Math.round(v * target);
                if (t < 1) requestAnimationFrame(tick);
            })(t0);
        }, startDelay);
    }

    const streams = document.querySelector('.home-stats-streams h1 span');
    const listeners = document.querySelector('.home-stats-listeners h1 span');
    const countries = document.querySelector('.home-stats-countries h1');
    let statsStarted = false;

    function startStats(baseDelay) {
        if (statsStarted) return;
        statsStarted = true;
        if (streams) countUp(streams, 800, 2200, baseDelay);
        if (listeners) countUp(listeners, 630, 2200, baseDelay + 150);
        if (countries) countUp(countries, 38, 1800, baseDelay + 300);
    }

    if (!isMobile) {
        setTimeout(startBioTyping, 650);
        startStats(1200);
        setTimeout(() => {
            document.querySelectorAll(
                '.home-header,.home-section,.home-main-image,' +
                '.home-top-track,.home-social,.friend,.home-main-img'
            ).forEach(el => { el.style.willChange = 'auto'; });
        }, 5000);
        return;
    }

    if (streams) streams.textContent = '0';
    if (listeners) listeners.textContent = '0';
    if (countries) countries.textContent = '0';

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.classList.contains('bio')) {
                    setTimeout(startBioTyping, 400);
                }
                if (entry.target.classList.contains('stats')) {
                    startStats(200);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.home-header, .home-section, .home-main-image').forEach(el => {
        observer.observe(el);
    });
});
