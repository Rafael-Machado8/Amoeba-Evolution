// library.js

// Lista de amoebas com nomes e imagens
const amoebaLibrary = [
  { 
    level: 1, 
    name: "Ameba Inicial", 
    img: "https://i.ibb.co/VY4dYcK/ameba1.png",
    habitat: "Poças de água doce",
    desc: "A forma mais simples de ameba, ainda frágil mas curiosa.",
  },
  { 
    level: 2, 
    name: "Ameba Evoluída", 
    img: "https://i.ibb.co/7yLfMmx/ameba2.png",
    habitat: "Lagos rasos",
    desc: "Já aprendeu a se dividir melhor, mais resistente e ativa.",
  },
  { 
    level: 3, 
    name: "Ameba Superior", 
    img: "https://i.ibb.co/Ws7tX7R/ameba3.png",
    habitat: "Águas paradas ricas em nutrientes",
    desc: "Ganha formas mais complexas e maior inteligência primitiva.",
  },
  { 
    level: 4, 
    name: "Ameba Mestre", 
    img: "https://i.ibb.co/5W8wZbC/ameba4.png",
    habitat: "Ambientes extremos",
    desc: "Consegue sobreviver onde outras já teriam perecido.",
  },
  { 
    level: 5, 
    name: "Ameba Lendária", 
    img: "https://i.ibb.co/HxNRdJQ/ameba5.png",
    habitat: "Locais misteriosos",
    desc: "Tão rara que poucos cientistas acreditam em sua existência.",
  }
];

// 🔹 Carrega as amoebas desbloqueadas do jogo
let amoebasUnlocked = JSON.parse(localStorage.getItem("discoveredAmoebas")) || [];
amoebasUnlocked = [...new Set(amoebasUnlocked)].sort((a,b) => a-b);

// 🔹 Carrega informações detalhadas (datas etc.)
const discoveries = JSON.parse(localStorage.getItem("amoebaDiscoveries")) || {};

const libraryGrid = document.getElementById("libraryGrid");

// Renderizar biblioteca
amoebaLibrary.forEach(amoeba => {
  const card = document.createElement("div");
  card.className = "amoeba-card";

  if (amoebasUnlocked.includes(amoeba.level)) {
    // Pegamos a data salva no main.js ou "Desconhecida"
    const date = discoveries[amoeba.level]?.date || "Desconhecida";
    card.innerHTML = `
      <img src="${amoeba.img}" alt="${amoeba.name}" class="amoeba-img">
      <h3>${amoeba.name}</h3>
      <p><b>Nível:</b> ${amoeba.level}</p>
      <p><b>Habitat:</b> ${amoeba.habitat}</p>
      <p><b>Descoberta em:</b> ${date}</p>
      <p>${amoeba.desc}</p>
    `;
  } else {
    card.innerHTML = `
      <div class="locked">???</div>
      <h3>Desconhecida</h3>
      <p>Nível ${amoeba.level}</p>
    `;
  }

  libraryGrid.appendChild(card);
});



// Verificar se estamos na biblioteca de peixes ou amoebas
if (window.location.href.includes('library-peixes.html')) {
    document.querySelector('h1').textContent = '🐠 Biblioteca dos Peixes';
    document.querySelector('.back-btn').href = 'peixes.html';
    
    // Adicionar estilo específico para peixes
    const style = document.createElement('style');
    style.textContent = `
        header {
            background: linear-gradient(45deg, #1976d2, #42a5f5) !important;
        }
        .amoeba-card {
            background: linear-gradient(135deg, #e3f2fd, #bbdefb) !important;
            border: 2px solid #64b5f6;
        }
    `;
    document.head.appendChild(style);
}