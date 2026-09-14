// ======================================================
// PZB VENDAS EXPRESS
// Configurações do cliente
//
// IMPORTANTE:
// Futuramente, para criar uma demonstração para outro
// prospect, grande parte da personalização será feita aqui.
// ======================================================

const CONFIG = {

    empresa: {
         nomeLinha1: "ALONSO",
        nomeLinha2: "AUTOCENTER",

        // Não vamos inventar telefone.
        // Validaremos o WhatsApp antes do contato comercial.
        telefoneExibicao: "(47) 3285-7857",

        // Mantemos o número fictício enquanto não validamos o real.
        whatsapp: "5500000000000",

        cidade: "Rua João Pessoa, 2269 - Velha, Blumenau - SC"
    },

    whatsapp: {
        mensagemInicial:
            "Olá! Gostaria de solicitar um orçamento para meu veículo."
    }

};


// ======================================================
// AGUARDA O HTML CARREGAR
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    atualizarDadosEmpresa();

    atualizarAno();

    configurarMenuMobile();

    configurarFormulario();

    configurarWhatsAppFlutuante();

});


// ======================================================
// DADOS DA EMPRESA
// ======================================================

function atualizarDadosEmpresa() {

    // Atualiza os nomes/logotipos existentes na página
    const marcas = document.querySelectorAll(".logo-marca");
    const destaques = document.querySelectorAll(".logo-destaque");

    marcas.forEach((elemento) => {
        elemento.textContent = CONFIG.empresa.nomeLinha1;
    });

    destaques.forEach((elemento) => {
        elemento.textContent = CONFIG.empresa.nomeLinha2;
    });


    // Atualiza telefone
    const telefoneEmpresa =
        document.getElementById("telefoneEmpresa");

    if (telefoneEmpresa) {
        telefoneEmpresa.textContent =
            CONFIG.empresa.telefoneExibicao;
    }


    // Atualiza cidade
    const cidadeEmpresa =
        document.getElementById("cidadeEmpresa");

    if (cidadeEmpresa) {
        cidadeEmpresa.textContent =
            CONFIG.empresa.cidade;
    }


    // Atualiza título da aba do navegador
    document.title =
        `${CONFIG.empresa.nomeLinha1} ${CONFIG.empresa.nomeLinha2} | Soluções para você`;
}


// ======================================================
// ANO AUTOMÁTICO DO RODAPÉ
// ======================================================

function atualizarAno() {

    const anoAtual =
        document.getElementById("anoAtual");

    if (anoAtual) {

        anoAtual.textContent =
            new Date().getFullYear();

    }

}


// ======================================================
// MENU MOBILE
// ======================================================

function configurarMenuMobile() {

    const botaoMenu =
        document.getElementById("menuMobile");

    const nav =
        document.getElementById("nav");


    if (!botaoMenu || !nav) {
        return;
    }


    botaoMenu.addEventListener("click", () => {

        nav.classList.toggle("ativo");


        if (nav.classList.contains("ativo")) {

            botaoMenu.textContent = "✕";

            botaoMenu.setAttribute(
                "aria-label",
                "Fechar menu"
            );

        } else {

            botaoMenu.textContent = "☰";

            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });


    // Fecha o menu após clicar em algum link
    const links =
        nav.querySelectorAll("a");


    links.forEach((link) => {

        link.addEventListener("click", () => {

            nav.classList.remove("ativo");

            botaoMenu.textContent = "☰";

        });

    });

}


// ======================================================
// FORMULÁRIO → WHATSAPP
// ======================================================

function configurarFormulario() {

    const formulario =
        document.getElementById("formContato");


    if (!formulario) {
        return;
    }


    formulario.addEventListener("submit", (evento) => {

        // Impede o formulário de recarregar a página
        evento.preventDefault();


        // Captura os campos
        const nome =
            document.getElementById("nome").value.trim();

        const telefone =
            document.getElementById("telefone").value.trim();

        const servico =
            document.getElementById("servico").value;

        const mensagem =
            document.getElementById("mensagem").value.trim();


        // Validação simples
        if (!nome || !telefone || !servico) {

            alert(
                "Por favor, preencha seu nome, WhatsApp e o serviço desejado."
            );

            return;
        }


        // Monta a mensagem que chegará no WhatsApp
        const texto = `
Olá! Meu nome é ${nome}.

Encontrei vocês pelo site e gostaria de solicitar atendimento.

*Serviço de interesse:*
${servico}

*Meu WhatsApp:*
${telefone}

*Mensagem:*
${mensagem || "Gostaria de receber mais informações."}
        `.trim();


        abrirWhatsApp(texto);

    });

}


// ======================================================
// BOTÃO FLUTUANTE DO WHATSAPP
// ======================================================

function configurarWhatsAppFlutuante() {

    const botao =
        document.querySelector(".whatsapp-flutuante");


    if (!botao) {
        return;
    }


    botao.addEventListener("click", (evento) => {

        evento.preventDefault();

        abrirWhatsApp(
            CONFIG.whatsapp.mensagemInicial
        );

    });

}


// ======================================================
// FUNÇÃO CENTRAL DO WHATSAPP
// ======================================================

function abrirWhatsApp(mensagem) {

    const numero =
        CONFIG.empresa.whatsapp;


    // Evita abrir um WhatsApp inválido
    enquantoNumeroNaoConfigurado(numero);


    const textoCodificado =
        encodeURIComponent(mensagem);


    const url =
        `https://wa.me/${numero}?text=${textoCodificado}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


// ======================================================
// PROTEÇÃO PARA O TEMPLATE
// ======================================================

function enquantoNumeroNaoConfigurado(numero) {

    if (
        !numero ||
        numero === "5500000000000"
    ) {

        alert(
            "Este é um site de demonstração. O número de WhatsApp ainda não foi configurado."
        );

        throw new Error(
            "WhatsApp do cliente ainda não configurado."
        );

    }

}