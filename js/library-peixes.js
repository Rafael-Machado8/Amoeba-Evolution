// library-peixes.js

// Lista de peixes com nomes e imagens
const peixesLibrary = [
  { 
    level: 1, 
    name: "Peixe Palhaço", 
    img: "assets/images/peixe1.jpg",
    habitat: "Recifes de coral",
    desc: "Colorido e adaptado à vida em anêmonas. Vive em simbiose com estes animais.",
    curiosidade: "Todos os peixes-palhaço nascem machos e podem se tornar fêmeas!"
  },
  { 
    level: 2, 
    name: "Peixe Cirurgião", 
    img: "assets/images/peixe2.jpg",
    habitat: "Oceanos tropicais",
    desc: "Conhecido pela lâmina caudal característica que usa para defesa.",
    curiosidade: "A lâmina é tão afiada que pode causar cortes profundos em predadores."
  },
  { 
    level: 3, 
    name: "Peixe Mandarim", 
    img: "assets/images/peixe3.jpg",
    habitat: "Águas rasas do Pacífico",
    desc: "Um dos peixes mais coloridos e belos do oceano.",
    curiosidade: "Suas cores vibrantes vêm de células pigmentadas especiais na pele."
  },
  { 
    level: 4, 
    name: "Peixe Leão", 
    img: "assets/images/peixe4.jpg",
    habitat: "Recifes rochosos",
    desc: "Venenoso e com espinhos impressionantes. Espécie invasora em muitas regiões.",
    curiosidade: "Seus espinhos contêm um veneno poderoso que pode ser fatal para humanos."
  },
  { 
    level: 5, 
    name: "Tubarão Baleia", 
    img: "assets/images/peixe5.jpg",
    habitat: "Oceanos abertos",
    desc: "Maior peixe do mundo, mas completamente inofensivo para humanos.",
    curiosidade: "Pode viver até 100 anos e pesar mais de 20 toneladas!"
  },
  { 
    level: 6, 
    name: "Peixe Abissal Lendário", 
    img: "assets/images/peixe1.jpg",
    habitat: "Zona abissal",
    desc: "Raríssima espécie das profundezas, adaptada à pressão extrema.",
    curiosidade: "Consegue sobreviver a pressões que esmagariam um submarino!"
  }
];

// 🔹 Carrega os peixes desbloqueados do jogo
let peixesUnlocked = JSON.parse(localStorage.getItem("discoveredPeixes")) || [];
peixesUnlocked = [...new Set(peixesUnlocked)].sort((a,b) => a-b);

// 🔹 Carrega informações detalhadas (datas etc.)
const discoveries = JSON.parse(localStorage.getItem("peixeDiscoveries")) || {};

const libraryGrid = document.getElementById("libraryGrid");

// Informações de descoberta para cada nível
const discoveryDates = {
  1: "1830",
  2: "1855", 
  3: "1880",
  4: "1905",
  5: "1828",
  6: "2024"
};

// Renderizar biblioteca
peixesLibrary.forEach(peixe => {
  const card = document.createElement("div");
  card.className = "amoeba-card";

  if (peixesUnlocked.includes(peixe.level)) {
    const date = discoveries[peixe.level]?.date || discoveryDates[peixe.level] || "Desconhecida";
    
    card.innerHTML = `
      <img src="${peixe.img}" alt="${peixe.name}" class="amoeba-img">
      <h3>${peixe.name}</h3>
      <p><b>Nível:</b> ${peixe.level}</p>
      <p><b>Habitat:</b> ${peixe.habitat}</p>
      <p><b>Descoberta em:</b> ${date}</p>
      <p><b>Descrição:</b> ${peixe.desc}</p>
      <p><b>🎯 Curiosidade:</b> ${peixe.curiosidade}</p>
    `;
  } else {
    card.innerHTML = `
      <div class="locked">🔒</div>
      <h3>Peixe Desconhecido</h3>
      <p>Nível ${peixe.level}</p>
      <p><i>Continue jogando para desbloquear!</i></p>
    `;
  }

  libraryGrid.appendChild(card);
});

// Adicionar estilo específico para peixes
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    .amoeba-card[style*="background"] {
      background: linear-gradient(135deg, #e3f2fd, #bbdefb) !important;
      border: 2px solid #64b5f6;
    }
    
    .locked {
      font-size: 50px;
      color: #78909c;
      margin: 20px 0;
    }
    
    h1 {
      color: #1565c0;
    }
    
    .amoeba-card:hover {
      box-shadow: 0 6px 15px rgba(33, 150, 243, 0.4);
    }
  `;
  document.head.appendChild(style);
});