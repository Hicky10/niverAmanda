$(document).ready(function () {
    // Configurações
    const mensagens = [
        "O dia de hoje é um dia muito especial!",
        "2025 foi um ano difícil para mim",
        "Mas só de ter você do meu lado",
        "Junto comigo, me confortando nos momentos difíceis",
        "Foi possível suportar e pensar no futuro!",
        "Tudo que eu faço com você torna aquilo especial!",
        "No momento que eu te vi pela primeira vez eu já me apaixonei!",
        "E sonhei que algum dia me casaria com você!",
        "Sem antes mesmo de trocarmos uma palavra!",
        "Logo logo vai fazer 1 ano que começamos a namorar",
        "E espero que dure pra sempre!"
    ];

    // Preparar array de imagens (1.jpg, 2.jpg, etc.)
    const imagens = Array.from({ length: 19 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    let indexImagem = 0;
    let intervaloSlideshow = null;
    let animacaoEmAndamento = false;

    // Funções auxiliares
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function animacaoTerminada() {
        animacaoEmAndamento = false;
    }

    // Função para trocar imagens
    async function trocarImagem() {
        $('#imagemSequencial').fadeOut(500, () => {
            if (indexImagem < imagens.length) {
                $('#imagemSequencial')
                    .attr('src', `img/Fotos/${imagens[indexImagem]}.jpg`)
                    .fadeIn(500);

                // Remove o fundo confetti se estiver aplicado
                $('#imgDiv').css('background-image', 'none');

                indexImagem++;
            } else {
                $('#imagemSequencial')
                    .attr('src', 'img/Fotos/FIM.jpg')
                    .fadeIn(500);

                // Adiciona o fundo do confetti só uma vez e de forma permanente
                $('.divImg').css({
                    backgroundImage: "url('img/Conffetti.gif')",
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center center",
                    position: "relative"
                });

                $('#mensagemFinal').fadeIn(1000);

                clearInterval(intervaloSlideshow);
            }
        });
    }


    // Função principal para exibir mensagens
    async function exibirMensagens() {
        for (const mensagem of mensagens) {
            await $('#mensagens')
                .stop(true, true)
                .html(mensagem)
                .fadeIn(500)
                .delay(2500)
                .fadeOut(500)
                .promise();
        }

        $(".divMsg").hide();

        $(".divImg").show().addClass("d-flex justify-content-center align-items-center")
        // Iniciar slideshow após todas as mensagens
        $("#imgDiv").fadeIn(500, () => {
            intervaloSlideshow = setInterval(trocarImagem, 4000);
        });
    }

    // Evento de clique no botão
    $('#btnSurpresa').click(async function () {
        $(this).prop('disabled', true).fadeOut(500);
        $('#textoInicial').fadeOut(500);

        // Animação de loading
        $('#contagem').show();
        const dotsInterval = setInterval(() => {
            const dots = $('#contagem').text().length % 4;
            $('#contagem').text('.'.repeat(dots + 1));
        }, 200);

        await delay(6000);
        clearInterval(dotsInterval);
        $('#contagem').hide();

        await exibirMensagens();
    });

    // Configuração da música de fundo
    const musica = document.getElementById('musicaFundo');
    musica.volume = 0.4;

    // Alguns navegadores exigem interação para tocar áudio
    musica.play().catch(() => {
        $(document).one('click', () => musica.play());
    });
});