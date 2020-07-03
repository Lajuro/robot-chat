let rs = require('readline-sync');
let chalk = require('chalk');

let perguntar = async (pergunta = "Pergunta não fornecida", ...opcoes) => {
    try {
        console.clear();
        if (!pergunta.includes("?")) {
            throw "A sua pergunta não tem um interrogação!";
        }

        if(!Array.isArray(opcoes)) {
            throw "É preciso que tenha 1 ou mais opcões! [Array]";
        }

        console.log(chalk.blue(`${pergunta}\n`));
        console.log(chalk.yellow(opcoes.join('\n')));

        return {
            pergunta,
            opcoes,
            tamanho: opcoes.length,
        };
    } catch(err) {
        console.error("Deu ruim!", err);
    }
    
};

let responder = (qtdOpcoes = 0) => {
    try {
        resposta = rs.questionInt("\nResposta: ");

        if (resposta > qtdOpcoes || resposta <= 0) {
            throw `Esse número é maior que ${qtdOpcoes}`
        }

        return resposta - 1;
    } catch (err) {
        console.error("Deu ruim!", err);
    }

}

let retorno = async (pergunta, opcao = false, ...respostas) => {
    try {

        if (!Array.isArray(respostas) || respostas.length < pergunta.tamanho || respostas.length > pergunta.tamanho) {
            throw `É preciso que tenha ${pergunta.tamanho} ou mais opcões! [Array]`;
        }

        // Limpa o console:
        console.clear();

        // Re-escreve a pergunta:
        console.log(chalk.blue(`${pergunta.pergunta}\n`));

        // Escreve a opção escolhida:
        console.log(chalk.green(`Resposta: ${pergunta.opcoes[opcao]}\n`));

        return respostas[opcao];
    } catch (err) {
        console.error("Deu ruim!", err);
    }
}

let continuar = () => {
    console.log(chalk.red(`\n#########################################`))
    console.log(chalk.red(`### Pressione ENTER para continuar... ###`))
    console.log(chalk.red(`#########################################`))
    rs.question();
}

let fim = () => {
    console.log(chalk.red(`\n########################`))
    console.log(chalk.red(`######## Fim... ########`))
    console.log(chalk.red(`########################`))
}

let sistemaDePerguntas = async () => {

await perguntar(`Olá terráqueo, tudo bem?`, `1 - Tudo sim, e você?`, `2 - É, nem tanto na verdade! e você?`).then(resultadoPergunta => {
    let resposta = responder(resultadoPergunta.tamanho);
    retorno(resultadoPergunta, resposta, `Ah, que ótimo que você está bem! Eu tô bem demais!`, `Poxa, sério? Espero que fique bem! Eu tô bem, obrigado por perguntar!`).then(mensagem => {
        console.log(chalk.blue(mensagem));
        respondido = true;
    });
});

await continuar();

await perguntar(`Vocé é um programador?`, `1 - Claro que eu sou, o melhor de todos?`, `2 - Nunca nem vi?`).then(resultadoPergunta => {
    let resposta = responder(resultadoPergunta.tamanho);
    retorno(resultadoPergunta, resposta, `Sério??? Caraca, que honra conhecer o melhor programador de todos!`, `Então tem que se tornar, você tem cara de um excelente programador!`).then(mensagem => {
        console.log(chalk.blue(mensagem));
        respondido = true;
    });
});

await fim();

}

sistemaDePerguntas();