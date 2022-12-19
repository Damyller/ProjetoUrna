// Variaves criadas para pode controlar os textos na tela da urna

let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector(".d-1-2 span");
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector(".d-2");
let lateral = document.querySelector(".d-1-rigth");
let numeros = document.querySelector(".d-1-3");

// Variaveis de ambiente
let etapaAtual = 0;
let numeroPreenchido = "";
let votobranco = false;

function começarEtapa () {
    let etapa = etapas[etapaAtual];

    let numeroHTML = "";
    numeroPreenchido = "";
    votobranco = false;

    for(let i=0; i<etapa.numeros; i++){
        if (i === 0){
            numeroHTML += '<div class="numero pisca"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }
    
    }

    seuVotoPara.style.display = "none";
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = "none";
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface () {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === numeroPreenchido){
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = `Nome : ${candidato.nome}<br/>Partido : ${candidato.partido}`;

        let fotosHtml = "";
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda} </div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda} </div>`;
            }
            
        }

        lateral.innerHTML = fotosHtml;

    } else {
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
    
}


//Criando funções para os botoes

function clicou(n) {
    let numero = document.querySelector(".numero.pisca");
    if(numero !== null){
        numero.innerHTML = n;
        numeroPreenchido = `${numeroPreenchido}${n}`

        numero.classList.remove("pisca");
          if (numero.nextElementSibling !== null){
            numero.nextElementSibling.classList.add("pisca");
        }  else {
            atualizaInterface();
        }
    }
}

function branco() {
  if(numeroPreenchido === ""){
    votobranco = true;
    seuVotoPara.style.display = "none";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
  } else {
    alert("Para votar em Branco não pode ter digitado nenhum numero");
  }
}

function corrige () {
    começarEtapa();
}

function confirma () {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votobranco === true) {
        votoConfirmado = true;
        console.log("Confirmando como BRANCO...")
    } else if (numeroPreenchido.length === etapa.numeros){
        votoConfirmado = true;
        console.log("Confirmando como " + numeroPreenchido);
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            começarEtapa();
        } else {
            document.querySelector(".tela").innerHTML = '<div class="aviso-gigante">FIM</div>';
        }
        
    }
}

começarEtapa();
