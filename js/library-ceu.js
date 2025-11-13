// library-ceu.js

// Lista de aves com nomes e imagens
const ceuLibrary = [
  { 
    level: 1, 
    name: "Pardal", 
    img: "assets/images/ave1.jpg",
    habitat: "Cidades e campos",
    desc: "Pequena e adaptável, vive próximo aos humanos. Alimenta-se de sementes e insetos.",
    curiosidade: "Pode reconhecer rostos humanos e lembrar de pessoas específicas!"
  },
  { 
    level: 2, 
    name: "Andorinha", 
    img: "assets/images/ave2.jpg",
    habitat: "Campos abertos e áreas rurais",
    desc: "Migratória, excelente caçadora de insetos em voo. Retorna ao mesmo local ano após ano.",
    curiosidade: "Voam mais de 10.000 km na migração entre Europa e África!"
  },
  { 
    level: 3, 
    name: "Pomba", 
    img: "assets/images/ave3.jpg",
    habitat: "Áreas urbanas mundialmente",
    desc: "Símbolo da paz, ótima capacidade de navegação. Adaptou-se perfeitamente às cidades.",
    curiosidade: "Conseguem encontrar o caminho de casa a mais de 1.000 km de distância!"
  },
  { 
    level: 4, 
    name: "Corvo", 
    img: "assets/images/ave4.jpg",
    habitat: "Bosques, montanhas e cidades",
    desc: "Extremamente inteligente, usa ferramentas e resolve problemas complexos.",
    curiosidade: "Têm raciocínio equivalente a uma criança de 7 anos em testes cognitivos!"
  },
  { 
    level: 5, 
    name: "Falcão", 
    img: "assets/images/ave5.jpg",
    habitat: "Montanhas, penhascos e áreas abertas",
    desc: "Predador ágil e veloz, especializado em caçar outras aves em pleno voo.",
    curiosidade: "Visão 8x melhor que humana, conseguem ver um rato a 1,5 km de distância!"
  },
  { 
    level: 6, 
    name: "Águia", 
    img: "assets/images/ave1.jpg",
    habitat: "Montanhas altas e áreas remotas",
    desc: "Rainha dos céus, predadora de topo com habilidades excepcionais de voo.",
    curiosidade: "Enxergam presas a 3 km de distância e mergulham a 160 km/h!"
  },
  { 
    level: 7, 
    name: "Arara", 
    img: "assets/images/ave2.jpg",
    habitat: "Florestas tropicais da América",
    desc: "Cores vibrantes impressionantes, inteligente e vive em bandos sociais complexos.",
    curiosidade: "Podem viver até 80 anos em cativeiro - uma das aves mais longevas!"
  },
  { 
    level: 8, 
    name: "Coruja", 
    img: "assets/images/ave3.jpg",
    habitat: "Florestas, bosques e áreas rurais",
    desc: "Caçadora noturna especializada, voo completamente silencioso para surpreender presas.",
    curiosidade: "Podem girar a cabeça 270 graus - quase um círculo completo!"
  },
  { 
    level: 9, 
    name: "Beija-flor", 
    img: "assets/images/ave4.jpg",
    habitat: "Jardins, florestas e áreas tropicais",
    desc: "Mestre do voo estacionário, único pássaro que voa para trás e de lado.",
    curiosidade: "Batimento cardíaco chega a 1.200 por minuto durante o voo!"
  },
  { 
    level: 10, 
    name: "Pelicano", 
    img: "assets/images/ave5.jpg",
    habitat: "Costas marinhas, lagos e rios",
    desc: "Bolsa no bico única para armazenar peixes, excelente pescador em grupo.",
    curiosidade: "Bolsa pode armazenar 11 litros de água e peixes - 3x sua capacidade estomacal!"
  },
  { 
    level: 11, 
    name: "Albatroz", 
    img: "assets/images/ave1.jpg",
    habitat: "Oceanos abertos do hemisfério sul",
    desc: "Maior envergadura entre aves vivas, mestre do voo planado sobre oceanos.",
    curiosidade: "Podem planar por horas sem bater asas, dormindo enquanto voam!"
  },
  { 
    level: 12, 
    name: "Pavo Real", 
    img: "assets/images/ave2.jpg",
    habitat: "Florestas abertas da Ásia",
    desc: "Cauda ornamental espetacular usada em complexos rituais de acasalamento.",
    curiosidade: "As 'manchas' na cauda na verdade são penas modificadas chamadas ocelos!"
  },
  { 
    level: 13, 
    name: "Cisne", 
    img: "assets/images/ave3.jpg",
    habitat: "Lagos, rios e áreas úmidas",
    desc: "Elegância personificada, casais permanecem juntos por toda vida.",
    curiosidade: "Têm até 25.000 penas - mais que qualquer outra ave!"
  },
  { 
    level: 14, 
    name: "Condor", 
    img: "assets/images/ave4.jpg",
    habitat: "Montanhas dos Andes e Califórnia",
    desc: "Maior ave voadora do mundo, mestre das correntes de ar montanhosas.",
    curiosidade: "Envergadura de 3,3 metros - maior que muitos humanos de altura!"
  },
  { 
    level: 15, 
    name: "Fênix", 
    img: "assets/images/ave5.jpg",
    habitat: "Lendas e mitologias antigas",
    desc: "Ave lendária da mitologia, símbolo da renovação e imortalidade.",
    curiosidade: "Segundo lendas, renasce das próprias cinzas a cada 500 anos!"
  }
];

// Carrega as aves desbloqueadas
let ceuUnlocked = JSON.parse(localStorage.getItem("discoveredCeu")) || [];
ceuUnlocked = [...new Set(ceuUnlocked)].sort((a,b) => a-b);

const discoveries = JSON.parse(localStorage.getItem("ceuDiscoveries")) || {};
const libraryGrid = document.getElementById("libraryGrid");

// Datas de descoberta
const discoveryDates = {
  1: "1758", 2: "1771", 3: "1789", 4: "1805", 5: "1822",
  6: "1840", 7: "1858", 8: "1875", 9: "1892", 10: "1910",
  11: "1928", 12: "1945", 13: "1962", 14: "1978", 15: "1995"
};

// Renderizar biblioteca
ceuLibrary.forEach(ave => {
  const card = document.createElement("div");
  card.className = "amoeba-card";

  if (ceuUnlocked.includes(ave.level)) {
    const date = discoveries[ave.level]?.date || discoveryDates[ave.level] || "Desconhecida";
    
    card.innerHTML = `
      <img src="${ave.img}" alt="${ave.name}" class="amoeba-img">
      <h3>${ave.name}</h3>
      <p><b>Nível:</b> ${ave.level}</p>
      <p><b>Habitat:</b> ${ave.habitat}</p>
      <p><b>Descoberta em:</b> ${date}</p>
      <p><b>Descrição:</b> ${ave.desc}</p>
      <p><b>🎯 Curiosidade:</b> ${ave.curiosidade}</p>
    `;
  } else {
    card.innerHTML = `
      <div class="locked">☁️</div>
      <h3>Ave Desconhecida</h3>
      <p>Nível ${ave.level}</p>
      <p><i>Continue jogando para desbloquear!</i></p>
    `;
  }

  libraryGrid.appendChild(card);
});

// Estilo específico para céu
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    header {
      background: linear-gradient(45deg, #87CEEB, #E0F7FA) !important;
    }
    .amoeba-card {
      background: linear-gradient(135deg, #E3F2FD, #B3E5FC) !important;
      border: 2px solid #81D4FA;
    }
    .amoeba-card:hover {
      box-shadow: 0 6px 15px rgba(33, 150, 243, 0.4);
    }
    .locked {
      font-size: 50px;
      color: #81D4FA;
      margin: 20px 0;
    }
    h1 {
      color: #0277BD;
    }
  `;
  document.head.appendChild(style);
});