const sequenciaUsuario = ["#000", "#000", "#000", "#000", "#000"];
const sequenciaJogo = ["#fff", "#fff", "#fff", "#fff", "#fff"];
let totalTentativas = 0;

function numeroAleatorio() {
  let num = Math.round(Math.random() * 4);
  return num;
}

for (let x = 0; x < sequenciaJogo.length; x++) {
  let num = numeroAleatorio();
  sequenciaJogo[x] = document.querySelector("datalist").options[num].value;
  document.querySelectorAll(".corResposta")[x].value = sequenciaJogo[x];
}

function marcaCor(elemento) {
  const posicao = parseInt(elemento.id.replace("cor_", "")) - 1;
  sequenciaUsuario[posicao] = elemento.value;

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

  document.querySelector("#mensagem").innerHTML = `
    ${quantidadeAcerto} acertos<br>
    ${totalTentativas} tentativas.
      `;
  if (quantidadeAcerto == sequenciaJogo.length) {
    document.querySelector("#mostraResposta").style.display = "block";
  }
}
