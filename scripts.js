document.addEventListener('DOMContentLoaded', () => {

    const anchors = document.querySelectorAll('a[href^="#"]');
    if (!anchors.length) {
        console.warn('No anchor links with href^="#" found.');
    }
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) {
                console.warn('Empty href value detected.');
                return;
            }
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.warn(`Element with ID "${targetId}" not found.`);
            }
        });
    });

    
    const openBtn = document.querySelector('.welcome-buttons .btn-dark');
    const closeBtn = document.querySelector('.modal-close');
    const modal = document.getElementById('changelogModal');

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('is-open');
            document.body.style.overflow = 'auto';
        });
    }

    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });
    }

    
    const video = document.getElementById('mainVideo');
    const overlay = document.getElementById('videoOverlay');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const muteBtn = document.getElementById('muteBtn');

    if (video && overlay && playPauseBtn && volumeSlider && muteBtn) {
        
        video.volume = 0.3;
        volumeSlider.value = 30;
        volumeSlider.style.background = `linear-gradient(to right, #ff0073 0%, #4760ff 100%) 0 0 / 30% 100% no-repeat rgba(255, 255, 255, 0.3)`;
        muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';

        
        volumeSlider.addEventListener('input', () => {
            setVolume(volumeSlider.value);
        });

        
        video.addEventListener('loadedmetadata', () => {
            updateTimeDisplay();
        });

        
        video.addEventListener('timeupdate', () => {
            updateTimeDisplay();
            updateProgress();
        });

        
        video.addEventListener('play', () => {
            overlay.classList.add('hidden');
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });

        video.addEventListener('pause', () => {
            overlay.classList.remove('hidden');
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

        video.addEventListener('ended', () => {
            overlay.classList.remove('hidden');
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

        
        document.addEventListener('fullscreenchange', () => {
            const fullscreenBtn = document.querySelector('.control-btn:last-child i');
            if (document.fullscreenElement) {
                fullscreenBtn.className = 'fas fa-compress';
                isFullscreen = true;
            } else {
                fullscreenBtn.className = 'fas fa-expand';
                isFullscreen = false;
            }
        });

        
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                switch (e.code) {
                    case 'Space':
                        e.preventDefault();
                        playVideo();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        skipTime(-5);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        skipTime(5);
                        break;
                    case 'KeyF':
                        e.preventDefault();
                        toggleFullscreen();
                        break;
                }
            }
        });
    } else {
        console.error('Required video elements not found.');
    }
});

let isFullscreen = false;

function playVideo(event) {
    if (event) {
        event.stopPropagation();
    }

    const video = document.getElementById('mainVideo');
    const overlay = document.getElementById('videoOverlay');
    const playPauseBtn = document.getElementById('playPauseBtn');

    if (video.paused) {
        video.play().catch(err => console.error('Video play failed:', err));
        overlay.classList.add('hidden');
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        overlay.classList.remove('hidden');
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function skipTime(seconds) {
    const video = document.getElementById('mainVideo');
    video.currentTime += seconds;
}

function toggleFullscreen() {
    const videoEmbed = document.querySelector('.video-embed');
    const fullscreenBtn = document.querySelector('.control-btn:last-child i');

    if (!isFullscreen) {
        if (videoEmbed.requestFullscreen) {
            videoEmbed.requestFullscreen();
        } else if (videoEmbed.webkitRequestFullscreen) {
            videoEmbed.webkitRequestFullscreen();
        } else if (videoEmbed.msRequestFullscreen) {
            videoEmbed.msRequestFullscreen();
        }
        fullscreenBtn.className = 'fas fa-compress';
        isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fullscreenBtn.className = 'fas fa-expand';
        isFullscreen = false;
    }
}

function seekVideo(event) {
    const video = document.getElementById('mainVideo');
    const progressBar = document.getElementById('progressBar');
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = Math.min(Math.max(clickX / rect.width, 0), 1);
    video.currentTime = video.duration * percentage;
}

function setVolume(value) {
    const video = document.getElementById('mainVideo');
    const volumeSlider = document.getElementById('volumeSlider');
    const muteBtn = document.getElementById('muteBtn');

    const volume = value / 100;
    video.volume = volume;
    volumeSlider.value = value;
    volumeSlider.style.background = `linear-gradient(to right, #ff0073 0%, #4760ff 100%) 0 0 / ${value}% 100% no-repeat rgba(255, 255, 255, 0.3)`;

    if (volume === 0) {
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (volume < 0.5) {
        muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

function toggleMute() {
    const video = document.getElementById('mainVideo');
    const volumeSlider = document.getElementById('volumeSlider');
    const muteBtn = document.getElementById('muteBtn');

    if (video.volume > 0) {
        video.dataset.previousVolume = video.volume;
        video.volume = 0;
        volumeSlider.value = 0;
        volumeSlider.style.background = `linear-gradient(to right, #ff0073 0%, #4760ff 100%) 0 0 / 0% 100% no-repeat rgba(255, 255, 255, 0.3)`;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        const previousVolume = video.dataset.previousVolume || 0.3;
        video.volume = previousVolume;
        volumeSlider.value = previousVolume * 100;
        volumeSlider.style.background = `linear-gradient(to right, #ff0073 0%, #4760ff 100%) 0 0 / ${previousVolume * 100}% 100% no-repeat rgba(255, 255, 255, 0.3)`;
        if (previousVolume < 0.5) {
            muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
}

function handleVideoClick(event) {
    event.stopPropagation();

    const video = document.getElementById('mainVideo');
    const overlay = document.getElementById('videoOverlay');
    const playPauseBtn = document.getElementById('playPauseBtn');

    if (overlay.classList.contains('hidden')) {
        if (video.paused) {
            video.play().catch(err => console.error('Video play failed:', err));
            overlay.classList.add('hidden');
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            overlay.classList.remove('hidden');
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateTimeDisplay() {
    const video = document.getElementById('mainVideo');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');

    if (currentTimeEl && totalTimeEl) {
        currentTimeEl.textContent = formatTime(video.currentTime);
        totalTimeEl.textContent = formatTime(video.duration);
    }
}

function updateProgress() {
    const video = document.getElementById('mainVideo');
    const progressFill = document.getElementById('progressFill');

    if (progressFill && video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        progressFill.style.width = percentage + '%';
    }
}