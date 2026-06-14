document.addEventListener('DOMContentLoaded', () => {
    const bioP = document.querySelector('.home-bio-content p');
    if (bioP) {
        const fullText = bioP.textContent.trim();
        bioP.innerHTML = '';

        const cursor = document.createElement('span');
        cursor.className = 'bio-cursor';
        bioP.appendChild(cursor);

        let i = 0;

        function getDelay(ch) {
            if (ch === '.' || ch === ',') return 80 + Math.random() * 60;
            if (ch === ' ') return 10 + Math.random() * 15;
            return 16 + Math.random() * 14;
        }

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

        setTimeout(type, 650);
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

    if (streams) countUp(streams,   800, 2200, 1200);
    if (listeners) countUp(listeners, 630, 2200, 1350);
    if (countries) countUp(countries,  38, 1800, 1500);

    setTimeout(() => {
        document.querySelectorAll(
            '.home-header,.home-section,.home-main-image,' +
            '.home-top-track,.home-social,.friend,.home-main-img'
        ).forEach(el => { el.style.willChange = 'auto'; });
    }, 5000);

});
    