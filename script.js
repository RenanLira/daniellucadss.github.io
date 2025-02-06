// Gerar QR Code com o link do site
new QRCode(document.getElementById('qrcode'), {
    text: window.location.href,
    width: 150,
    height: 150
});

// Adicione no início do arquivo script.js
function carregarVideo(videoUrl) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.addEventListener('loadeddata', () => resolve(video));
        video.addEventListener('error', reject);
    });
}

// Carregar categorias
function carregarCategoria(index) {
    const categoria = categorias[index];
    const grid = document.getElementById('vocabulario-grid');
    
    grid.innerHTML = `
      <div class="card-categoria" style="background: ${categoria.cor}30; text-align: center;">
        <img src="assets/logos/${categoria.logo}" alt="Logo da categoria ${categoria.nome}" class="logo-categoria">
        <h2 style="text-align: center;">${categoria.nome}</h2>
      </div>
      ${categoria.palavras.map(item => `
        <div class="card">
          <video src="${item.video}" alt="Sinal de ${item.palavra}" loop muted playsinline></video>
          <h3>${item.palavra}</h3>
        </div>
      `).join('')}
    `;

    // Adicionar event listeners para os vídeos
    grid.querySelectorAll('video').forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.currentTime = 0;
            video.play();
        });
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// Event listeners para os botões de categoria
document.querySelectorAll('.categoria-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        carregarCategoria(btn.dataset.categoria);
    });
});

// Quiz
let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;

function iniciarQuiz() {
    // Pega 10 perguntas aleatórias do total de palavras disponíveis
    perguntas = [...quiz].sort(() => Math.random() - 0.5).slice(0, 10);
    perguntaAtual = 0;
    pontuacao = 0;

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div id="pergunta-atual"></div>
        <div id="gif-container"></div>
        <div id="opcoes" class="grid"></div>
        <div id="resultado"></div>
        <button id="reiniciar">Reiniciar Quiz</button>
    `;

    document.getElementById('reiniciar').addEventListener('click', iniciarQuiz);
    mostrarPergunta();
}

function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];

    document.getElementById('resultado').textContent = '';
    document.getElementById('pergunta-atual').textContent = `Pergunta ${perguntaAtual + 1}/${perguntas.length}`;
    document.getElementById('gif-container').innerHTML = `
        <video src="${pergunta.video}" loop muted playsinline></video>
    `;

    // Adicionar event listeners para o vídeo do quiz
    const quizVideo = document.querySelector('#gif-container video');
    quizVideo.addEventListener('mouseenter', () => {
        quizVideo.currentTime = 0;
        quizVideo.play();
    });
    quizVideo.addEventListener('mouseleave', () => {
        quizVideo.pause();
        quizVideo.currentTime = 0;
    });

    const opcoes = [pergunta.respostaCorreta, ...pergunta.respostasErradas].sort(() => Math.random() - 0.5);
    const opcoesDiv = document.getElementById('opcoes');
    opcoesDiv.innerHTML = opcoes.map(opcao => `
        <button onclick="verificarResposta('${opcao}')">${opcao}</button>
    `).join('');
}

function verificarResposta(opcaoSelecionada) {
    const respostaCorreta = perguntas[perguntaAtual].respostaCorreta;
    
    if (opcaoSelecionada === respostaCorreta) {
        pontuacao++;
        document.getElementById('resultado').textContent = "✅ Correto!";
    } else {
        document.getElementById('resultado').textContent = `❌ Errado! A resposta correta era: ${respostaCorreta}`;
    }

    perguntaAtual++;
    
    if (perguntaAtual < perguntas.length) {
        setTimeout(() => {
            mostrarPergunta();
            document.getElementById('resultado').textContent = '';
        }, 1500);
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h3>Quiz Concluído! 🎉</h3>
        <p>Sua pontuação: ${pontuacao}/${perguntas.length}</p>
        <button id="btn-reiniciar">Tentar Novamente</button>
    `;

    document.getElementById('btn-reiniciar').addEventListener('click', () => {
        quizContainer.innerHTML = `
            <div id="pergunta-atual"></div>
            <div id="gif-container"></div>
            <div id="opcoes" class="grid"></div>
            <div id="resultado"></div>
            <button id="reiniciar">Reiniciar Quiz</button>
        `;
        iniciarQuiz();
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const categoriaAleatoria = Math.floor(Math.random() * categorias.length);
    carregarCategoria(categoriaAleatoria);
    iniciarQuiz();
});
