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
    name: "Cavalo Marinho", 
    img: "assets/images/peixe1.jpg",
    habitat: "Águas costeiras e estuários",
    desc: "Nada na posição vertical e tem cauda preênsil para se segurar.",
    curiosidade: "Única espécie onde o macho fica grávido e dá à luz os filhotes!"
  },
  { 
    level: 7, 
    name: "Peixe Papagaio", 
    img: "assets/images/peixe2.jpg",
    habitat: "Recifes de coral tropicais",
    desc: "Tem dentes fundidos formando um bico parecido com o de papagaios.",
    curiosidade: "Produz até 100 kg de areia por ano ao triturar corais!"
  },
  { 
    level: 8, 
    name: "Moreia", 
    img: "assets/images/peixe3.jpg",
    habitat: "Fendas rochosas e corais",
    desc: "Predador noturno com corpo de serpente e mandíbula poderosa.",
    curiosidade: "Tem uma segunda mandíbula na garganta para puxar a presa para dentro."
  },
  { 
    level: 9, 
    name: "Peixe Balão", 
    img: "assets/images/peixe4.jpg",
    habitat: "Oceanos tropicais e subtropicais",
    desc: "Conhecido por inflar quando ameaçado, tornando-se difícil de engolir.",
    curiosidade: "Contém tetrodotoxina, um veneno 1200 vezes mais mortal que cianeto."
  },
  { 
    level: 10, 
    name: "Peixe Anjo", 
    img: "assets/images/peixe5.jpg",
    habitat: "Recifes rasos tropicais",
    desc: "Cores vibrantes e padrões complexos, muito popular em aquários.",
    curiosidade: "Muda de sexo durante a vida - começam como fêmeas e tornam-se machos."
  },
  { 
    level: 11, 
    name: "Peixe Espada", 
    img: "assets/images/peixe1.jpg",
    habitat: "Oceanos abertos de águas temperadas",
    desc: "Um dos peixes mais rápidos do oceano com focinho em forma de espada.",
    curiosidade: "Pode nadar a até 97 km/h, rivalizando com o marlim em velocidade."
  },
  { 
    level: 12, 
    name: "Peixe Voador", 
    img: "assets/images/peixe2.jpg",
    habitat: "Superfície de oceanos tropicais",
    desc: "Desenvolveu barbatanas peitorais grandes que funcionam como asas.",
    curiosidade: "Pode planar por até 200 metros acima da água para escapar predadores."
  },
  { 
    level: 13, 
    name: "Peixe Pedra", 
    img: "assets/images/peixe3.jpg",
    habitat: "Fundo marinho em águas tropicais",
    desc: "Mestre da camuflagem, parece uma rocha no fundo do mar.",
    curiosidade: "Tem o veneno mais perigoso entre todos os peixes, podendo ser fatal."
  },
  { 
    level: 14, 
    name: "Peixe Lanterna", 
    img: "assets/images/peixe4.jpg",
    habitat: "Zona abissal (até 4000m de profundidade)",
    desc: "Produz luz própria através de órgãos bioluminescentes.",
    curiosidade: "Usa luz para atrair presas, comunicar-se e confundir predadores."
  },
  { 
    level: 15, 
    name: "Peixe Lua", 
    img: "assets/images/peixe5.jpg",
    habitat: "Oceanos temperados e tropicais",
    desc: "Maior peixe ósseo do mundo, com corpo achatado e circular.",
    curiosidade: "Pode botar até 300 milhões de ovos de uma só vez - recorde mundial!"
  },
  { 
    level: 16, 
    name: "Peixe Dragão Abissal", 
    img: "assets/images/peixe1.jpg",
    habitat: "Profundezas abissais (1000-2000m)",
    desc: "Criatura lendária das profundezas com bioluminescência espetacular.",
    curiosidade: "Emite luz vermelha, uma cor rara no fundo do mar onde predadores não a veem."
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
  1: "1830", 2: "1855", 3: "1880", 4: "1905", 5: "1828",
  6: "1876", 7: "1892", 8: "1912", 9: "1925", 10: "1938",
  11: "1950", 12: "1965", 13: "1978", 14: "1985", 15: "1992",
  16: "2024"
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