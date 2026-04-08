// J.H.S.

// Player
const audio = document.querySelector('audio');
const playPauseBtn = document.querySelector('.play-pause');
const playIcon = playPauseBtn.querySelector('.fa-play');
const pauseIcon = playPauseBtn.querySelector('.fa-pause');
const progressBar = document.getElementById('progress');
const currentTimeEl = document.querySelector('.current');
const totalTimeEl = document.querySelector('.total');

// Função para formatar o tempo
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`; // O '0' garante que não fique 2:5, e sim 2:05
}

// Botão Play/Pause
playPauseBtn.addEventListener('click', () => {
    // Se a música estiver pausada, dê o play e troque os ícones
    if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        // Se já estiver tocando, pause e volte os ícones
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
});

// Atualizar o tempo e a barra enquanto a música toca
audio.addEventListener('timeupdate', () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);

    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        
        // ADICIONE ESTA LINHA: Ela avisa o CSS para pintar a barra de branco!
        progressBar.style.setProperty('--progress', `${progressPercent}%`); 
    }
});

// Permitir que o usuário arraste a barra para avançar a música
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    
    // ADICIONE ESTA LINHA TAMBÉM: Para pintar de branco quando você arrasta!
    progressBar.style.setProperty('--progress', `${progressBar.value}%`);
});

// Pegar a duração total da música
audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});