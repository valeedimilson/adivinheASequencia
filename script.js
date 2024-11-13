const coresDisponiveis = [
  "#ff0000",
  "#0000ff",
  "#00ff00",
  "#ffff00",
  "#ff00ff",
];

const sequenciaUsuario = [];
const sequenciaJogo = [];
let totalTentativas = 0;
let quantidadeAcertoAnterior = 0;
let totalTentativasAnterior = 0;

coresDisponiveis.forEach((cor) => {
  const opcao = document.createElement("option");
  opcao.value = cor;
  document.querySelector("#coresDisponiveis").appendChild(opcao);
});

function numeroAleatorio() {
  return Math.round(Math.random() * 4);
}

function GeraListaSorteada() {
  let numAle = numeroAleatorio();
  corRepetida = sequenciaJogo.filter((atual) => {
    if (atual == coresDisponiveis[numAle]) {
      return true;
    }
  });

  if (corRepetida.length == 0) {
    sequenciaJogo.push(coresDisponiveis[numAle]);
    document.querySelectorAll(".corResposta")[sequenciaJogo.length - 1].value =
      coresDisponiveis[numAle];
  }
  if (sequenciaJogo.length < coresDisponiveis.length) {
    GeraListaSorteada();
  }
}
GeraListaSorteada();

function marcaCor(elemento) {
  sequenciaUsuario[parseInt(elemento.id.replace("cor_", "")) - 1] =
    elemento.value;
  verificaJogo();
}

function verificaJogo() {
  totalTentativas++;
  let quantidadeAcerto = 0;

  for (let x = 0; x < sequenciaJogo.length; x++) {
    if (sequenciaJogo[x] == sequenciaUsuario[x]) {
      quantidadeAcerto++;
    }
  }

  if (quantidadeAcerto > quantidadeAcertoAnterior) {
    tocaSom("acertou");
  }

  if (
    quantidadeAcerto <= quantidadeAcertoAnterior &&
    totalTentativas > totalTentativasAnterior) {
    tocaSom("errou");
  }
  quantidadeAcertoAnterior = quantidadeAcerto;
  totalTentativasAnterior = totalTentativas;

  document.querySelector("#mensagem").innerHTML = `
    ${quantidadeAcerto} acertos<br>
    ${totalTentativas} tentativas.
      `;
  if (quantidadeAcerto == sequenciaJogo.length) {
    document.querySelector("#mostraResposta").style.display = "block";

    tocaSom("vitoria");
  }
}

function tocaSom(som) {
  const playerAudio = document.querySelector("#playerAudio");
  if (playerAudio) {
    document.body.removeChild(playerAudio);
  }


  const objSom = document.createElement("audio");
  objSom.setAttribute("id", "playerAudio")
  objSom.setAttribute("autoplay", true);
  // objSom.setAttribute("controls", "true");
  const objSomSource = document.createElement("source");
  objSomSource.setAttribute("src", "/assets/audio/" + som + ".aac");
  objSomSource.setAttribute("type", "audio/ogg");

  document.body.appendChild(objSom);
  objSom.appendChild(objSomSource);
}