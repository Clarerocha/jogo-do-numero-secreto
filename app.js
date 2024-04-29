//let titulo = document.querySelector("h1");
//titulo.innerHTML = "Jogo do número Secreto";

//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "Escolha um número secreto!";

//Substitui o código acima com o debaixo:

let listaDeNumerosSorteados = [];
let limiteDeNumerosASeremSorteados = 10;
let numeroSecreto =  gerarNumeroAleatorio();
let tentativas = 1;

function gerarNumeroAleatorio() { 
   let numeroEscolhido = parseInt(Math.random()* limiteDeNumerosASeremSorteados + 1);

   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if (quantidadeDeElementosNaLista == limiteDeNumerosASeremSorteados) {
       listaDeNumerosSorteados = [];
       numeroSecreto = gerarNumeroAleatorio();
   }

   if (listaDeNumerosSorteados.includes(numeroEscolhido)) {

        return gerarNumeroAleatorio();

   } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
   }

}

function exibirTextoNaTela(tag, texto) {
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() { 
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p","Escolha um número Secreto entre 1 e 10" );
}
exibirMensagemInicial();

function verificarChute() {

    let chute =document.querySelector("input").value;
    
  if (chute == numeroSecreto){ 
        
        exibirTextoNaTela("h1","Você acertou!");

        let palavraTentativa = tentativas > 1?  "tentativas" : "tentativa";

        let mensagemTentativas = `Incrível! Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;

        exibirTextoNaTela("p", mensagemTentativas);

        document.getElementById("reiniciar").removeAttribute("disabled");
     
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela("h1", "Você errou!");
        exibirTextoNaTela("p", "O número secreto é menor.");

    }  else {      
        exibirTextoNaTela("h1", "Você errou!");
        exibirTextoNaTela("p", "O número secreto é maior");
    }
    
    limparCampo();
    tentativas++;
}

function limparCampo(){
   let chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    
    exibirMensagemInicial();   
    numeroSecreto =  gerarNumeroAleatorio();    
    limparCampo();
    tentativas = 1;
    document.getElementById("reiniciar").setAttribute("disabled",true);
}