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

// Cronômetro
// Data do início do nosso namoro (Ano-Mês-DiaT00:00:00)
const startDate = new Date('2023-10-13T16:00:00'); 

// 2. Pegar as tags do HTML onde vamos injetar os números
const yearsEl = document.getElementById('years');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateTimer() {
    // 3. Pegar a data e hora exata de "AGORA"
    const now = new Date();
    
    // 4. Subtrair o ano, mês e dia (Hoje - Data do Início)
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    
    // 5. A regra do "Pegar Emprestado" para os Dias
    if (days < 0) {
        months--; // Tira 1 mês da conta
        // Descobre quantos dias tinha o mês passado para somar aos dias
        const daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += daysInLastMonth;
    }
    
    // 6. A regra do "Pegar Emprestado" para os Meses
    if (months < 0) {
        years--; // Tira 1 ano da conta
        months += 12; // Adiciona 12 meses
    }

    // 7. Calcula o tempo total que passou em Milissegundos
    const totalDiffInMs = now.getTime() - startDate.getTime();
    
    // 8. Usa uma fórmula matemática padrão para converter os milissegundos que sobraram
    const hours = Math.floor((totalDiffInMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((totalDiffInMs / 1000 / 60) % 60);
    const seconds = Math.floor((totalDiffInMs / 1000) % 60);

    // 9. Formatar os números para sempre terem 2 dígitos (Ex: "05" em vez de "5")
    // E escrever (textContent) lá nas caixinhas do seu HTML
    yearsEl.textContent = years.toString().padStart(2, "0");
    monthsEl.textContent = months.toString().padStart(2, "0");
    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
} // <- Fim da função updateTimer

// 10. O setInterval é o motorzinho. Ele roda a função que criamos a cada 1000 milissegundos (1 segundo).
setInterval(updateTimer, 1000);

// 11. Chama a função uma vez manualmente agora, só para a tela não ficar mostrando "00" durante o primeiro segundo de carregamento do site.
updateTimer();

// Mensagem na tela
// 1. Capturar os 3 elementos principais no seu HTML
// O botão vermelho lá debaixo, a setinha de voltar lá de cima, e a tela inteira
const btnOpenText = document.getElementById('show-text'); 
const btnCloseText = document.getElementById('closeTextBtn');
const textScreen = document.getElementById('text-screen');

// 2. Ação de Abrir
// Quando alguém clicar no botão "Mostrar mensagem"...
btnOpenText.addEventListener('click', () => {
    // Adicionamos a classe 'active', que faz o CSS deslizar a tela pra cima
    textScreen.classList.add('active');
});

// 3. Ação de Fechar
// Quando alguém clicar no ícone da setinha para baixo...
btnCloseText.addEventListener('click', () => {
    // Removemos a classe 'active', e o CSS joga a tela de volta pra baixo
    textScreen.classList.remove('active');
});

// Sinconizando o mini-player
// 1. Capturar os elementos que vivem dentro da tela vermelha
const playPauseMiniBtn = document.querySelector('.play-pause-mini');
const playIconMini = playPauseMiniBtn.querySelector('.fa-play');
const pauseIconMini = playPauseMiniBtn.querySelector('.fa-pause');
const progressMiniBar = document.getElementById('progress-mini');
const currentMiniTimeEl = document.querySelector('.current-mini');
const totalMiniTimeEl = document.querySelector('.total-mini');

// 2. O clique do botão mini apenas comanda o áudio (dar play/pause)
playPauseMiniBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

// 3. O GRANDE TRUQUE DE ESTADO (A mágica da sincronização)
// Quando a música tocar (não importa se foi pelo botão da frente ou pelo mini), atualizamos AMBOS os botões
audio.addEventListener('play', () => {
    // Esconde o Play e mostra o Pause no player principal
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block'; 
    
    // Faz a mesma coisa no mini-player
    playIconMini.style.display = 'none';
    pauseIconMini.style.display = 'block'; 
});

// Quando a música pausar, voltamos os dois botões para Play
audio.addEventListener('pause', () => {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    
    playIconMini.style.display = 'block';
    pauseIconMini.style.display = 'none';
});

// 4. Sincronizar o avanço da barrinha e o tempo na tela vermelha
audio.addEventListener('timeupdate', () => {
    // Usamos a função formatTime que já existe lá no topo do seu código!
    currentMiniTimeEl.textContent = formatTime(audio.currentTime);

    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressMiniBar.value = progressPercent;
        
        // Pinta a barrinha de branco usando o mesmo truque de CSS que fizemos antes
        progressMiniBar.style.setProperty('--progress', `${progressPercent}%`); 
    }
});

// 5. Permitir que você arraste a barrinha vermelha para avançar a música
progressMiniBar.addEventListener('input', () => {
    const seekTime = (progressMiniBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    progressMiniBar.style.setProperty('--progress', `${progressMiniBar.value}%`);
});

// 6. Mostrar o tempo total da música também no mini-player
audio.addEventListener('loadedmetadata', () => {
    totalMiniTimeEl.textContent = formatTime(audio.duration);
});