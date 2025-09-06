document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for internal links
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (!anchors.length) {
        console.warn('No anchor links with href^="#" found.');
        return;
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
                targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
            } else {
                console.warn(`Element with ID "${targetId}" not found.`);
            }
        });
    });
});

const openBtn = document.querySelector('.welcome-buttons .btn-dark');
const closeBtn = document.querySelector('.modal-close');
const modal = document.getElementById('changelogModal');

closeBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.remove('is-open');
  document.body.style.overflow = 'auto';
});

openBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});

// Video functionality
let isFullscreen = false;

function playVideo() {
    const video = document.getElementById('mainVideo');
    const overlay = document.getElementById('videoOverlay');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (video.paused) {
        video.play();
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
    const percentage = clickX / rect.width;
    video.currentTime = video.duration * percentage;
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

// Initialize video functionality
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('mainVideo');
    const overlay = document.getElementById('videoOverlay');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (video && overlay && playPauseBtn) {
        // Update time display when video loads
        video.addEventListener('loadedmetadata', () => {
            updateTimeDisplay();
        });
        
        // Update time and progress during playback
        video.addEventListener('timeupdate', () => {
            updateTimeDisplay();
            updateProgress();
        });
        
        // Handle play/pause events
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
        
        // Handle fullscreen changes
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
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                switch(e.code) {
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
    }
});