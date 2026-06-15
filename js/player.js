document.addEventListener('DOMContentLoaded', () => {
    const tracks = document.querySelectorAll('.home-top-track');

    tracks.forEach(track => {
        const audio = track.querySelector('audio');
        const btn = track.querySelector('.player-btn');
        const playIcon = track.querySelector('.home-play');
        const pauseIcon = track.querySelector('.home-pause');

        audio.volume = 0.3;

        btn.addEventListener('click', () => {
            
            if (!audio.paused) {
                audio.pause();
                playIcon.classList.remove('hide-icon');
                pauseIcon.classList.add('hide-icon');
            } 
            else {
                tracks.forEach(otherTrack => {
                    const otherAudio = otherTrack.querySelector('audio');
                    if (otherAudio !== audio && !otherAudio.paused) {
                        otherAudio.pause();
                        otherTrack.querySelector('.home-play').classList.remove('hide-icon');
                        otherTrack.querySelector('.home-pause').classList.add('hide-icon');
                    }
                });

                audio.play();
                playIcon.classList.add('hide-icon');
                pauseIcon.classList.remove('hide-icon');
            }
        });

        audio.addEventListener('ended', () => {
            playIcon.classList.remove('hide-icon');
            pauseIcon.classList.add('hide-icon');
        });
    });
});
