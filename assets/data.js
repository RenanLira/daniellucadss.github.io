// Categorias (videos do vocabulário)
const categorias = [
    {
        nome: "Frutas",
        cor: "#FFD700",
        palavras: [
            { palavra: "Maçã", video: "assets/videos/videos_vocabulario/maca.mp4" },
            { palavra: "Morango", video: "assets/videos/videos_vocabulario/morango.mp4" },
            { palavra: "Abacaxi", video: "assets/videos/videos_vocabulario/abacaxi.mp4" },
            { palavra: "Uva", video: "assets/videos/videos_vocabulario/uva.mp4" },
            { palavra: "Manga", video: "assets/videos/videos_vocabulario/manga.mp4" },
            { palavra: "Laranja", video: "assets/videos/videos_vocabulario/laranja.mp4" },
            { palavra: "Melancia", video: "assets/videos/videos_vocabulario/melancia.mp4" },
            { palavra: "Goiaba", video: "assets/videos/videos_vocabulario/goiaba.mp4" },
            { palavra: "Maracujá", video: "assets/videos/videos_vocabulario/maracuja.mp4" }
        ],
        logo: "frutas_logo.png",
    },
    {
        nome: "Legumes e Verduras",
        cor: "#8FBC8F",
        palavras: [
            { palavra: "Brócolis", video: "assets/videos/videos_vocabulario/brocolis.mp4" },
            { palavra: "Batata", video: "assets/videos/videos_vocabulario/batata.mp4" },
            { palavra: "Alface", video: "assets/videos/videos_vocabulario/alface.mp4" },
            { palavra: "Tomate", video: "assets/videos/videos_vocabulario/tomate.mp4" },
            { palavra: "Pepino", video: "assets/videos/videos_vocabulario/pepino.mp4" },
            { palavra: "Beterraba", video: "assets/videos/videos_vocabulario/beterraba.mp4" },
            { palavra: "Abóbora", video: "assets/videos/videos_vocabulario/abobora.mp4" },
            { palavra: "Espinafre", video: "assets/videos/videos_vocabulario/espinafre.mp4" },
            { palavra: "Couve-flor", video: "assets/videos/videos_vocabulario/couveflor.mp4" }
        ],
        logo: "legumes_logo.png"
    },
    {
        nome: "Proteínas e Carboidratos",
        cor: "#FFA07A",
        palavras: [
            { palavra: "Frango", video: "assets/videos/videos_vocabulario/frango.mp4" },
            { palavra: "Ovo", video: "assets/videos/videos_vocabulario/ovo.mp4" },
            { palavra: "Peixe", video: "assets/videos/videos_vocabulario/peixe.mp4" },
            { palavra: "Carne bovina", video: "assets/videos/videos_vocabulario/carnebovina.mp4" },
            { palavra: "Feijão", video: "assets/videos/videos_vocabulario/feijao.mp4" },
            { palavra: "Arroz", video: "assets/videos/videos_vocabulario/arroz.mp4" },
            { palavra: "Macarrão", video: "assets/videos/videos_vocabulario/macarrao.mp4" },
            { palavra: "Pão", video: "assets/videos/videos_vocabulario/pao.mp4" },
            { palavra: "Batata-doce", video: "assets/videos/videos_vocabulario/batatadoce.mp4" },
            { palavra: "Queijo", video: "assets/videos/videos_vocabulario/queijo.mp4" }
        ],
        logo: "proteinas_logo.png"
    },
    {
        nome: "Sobremesas e Bebidas",
        cor: "#FF69B4",
        palavras: [
            { palavra: "Bolo", video: "assets/videos/videos_vocabulario/bolo.mp4" },
            { palavra: "Chocolate", video: "assets/videos/videos_vocabulario/chocolate.mp4" },
            { palavra: "Sorvete", video: "assets/videos/videos_vocabulario/sorvete.mp4" },
            { palavra: "Pudim", video: "assets/videos/videos_vocabulario/pudim.mp4" },
            { palavra: "Brigadeiro", video: "assets/videos/videos_vocabulario/brigadeiro.mp4" },
        ],
        logo: "sobremesas_logo.png"
    },
    {
        nome: "Comidas Típicas Nordestinas",
        cor: "#FFD700",
        palavras: [
            { palavra: "Acarajé", video: "assets/videos/videos_vocabulario/acaraje.mp4" },
            { palavra: "Baião de Dois", video: "assets/videos/videos_vocabulario/baiaodedois.mp4" },
            { palavra: "Tapioca", video: "assets/videos/videos_vocabulario/tapioca.mp4" },
            { palavra: "Cuscuz", video: "assets/videos/videos_vocabulario/cuscuz.mp4" },
            { palavra: "Carne de Sol", video: "assets/videos/videos_vocabulario/carnedesol.mp4" },
            { palavra: "Moqueca", video: "assets/videos/videos_vocabulario/moqueca.mp4" },
            { palavra: "Caruru", video: "assets/videos/videos_vocabulario/caruru.mp4" },
            { palavra: "Rapadura", video: "assets/videos/videos_vocabulario/rapadura.mp4" },
            { palavra: "Vatapá", video: "assets/videos/videos_vocabulario/vatapa.mp4" },
            { palavra: "Arroz Doce", video: "assets/videos/videos_vocabulario/arrozdoce.mp4" }
        ],
        logo: "comidas_tipicas_logo.png"
    }
];

// Função para gerar o quiz com todas as palavras disponíveis
function gerarQuizCompleto() {
    let todasPalavras = [];
    
    // Coleta todas as palavras de todas as categorias
    categorias.forEach(categoria => {
        categoria.palavras.forEach(item => {
            todasPalavras.push({
                categoria: categoria.nome,
                video: item.video.replace('videos_vocabulario', 'videos_quiz'),
                respostaCorreta: item.palavra,
                respostasErradas: gerarRespostasErradas(item.palavra, categoria.palavras)
            });
        });
    });

    return todasPalavras;
}

// Função auxiliar para gerar 3 respostas erradas aleatórias
function gerarRespostasErradas(respostaCorreta, palavrasDaCategoria) {
    // Pega todas as palavras da categoria exceto a correta
    let opcoesDisponiveis = palavrasDaCategoria
        .map(p => p.palavra)
        .filter(palavra => palavra !== respostaCorreta);
    
    // Embaralha as opções
    opcoesDisponiveis = opcoesDisponiveis.sort(() => Math.random() - 0.5);
    
    // Retorna as 3 primeiras opções
    return opcoesDisponiveis.slice(0, 3);
}

// Gera o quiz completo com todas as palavras
const quiz = gerarQuizCompleto();