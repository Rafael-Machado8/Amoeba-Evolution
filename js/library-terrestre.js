// library-terrestre.js

// Lista de animais terrestres
const terrestreLibrary = [
  { level: 1, name: "Coelho", img: "assets/images/animal1.jpg", habitat: "Campos e florestas", desc: "Rápido e adaptável, excelente reprodutor.", curiosidade: "Podem pular até 1 metro de altura!" },
  { level: 2, name: "Raposa", img: "assets/images/animal2.jpg", habitat: "Bosques e áreas abertas", desc: "Astuto e ágil caçador noturno.", curiosidade: "Usam o campo magnético da Terra para caçar." },
  { level: 3, name: "Lobo", img: "assets/images/animal3.jpg", habitat: "Florestas e montanhas", desc: "Vive em alcateias, caçador social.", curiosidade: "Podem uivar para se comunicar a 16km de distância." },
  { level: 4, name: "Urso Pardo", img: "assets/images/animal4.jpg", habitat: "Florestas densas", desc: "Poderoso, onívoro e territorial.", curiosidade: "Correm até 50km/h, mais rápido que humanos." },
  { level: 5, name: "Tigre", img: "assets/images/animal5.jpg", habitat: "Selvas e savanas", desc: "Ápice dos predadores terrestres.", curiosidade: "Cada tigre tem listras únicas, como impressões digitais." },
  { level: 6, name: "Elefante", img: "assets/images/animal1.jpg", habitat: "Savanas e florestas", desc: "Maior mamífero terrestre, inteligente.", curiosidade: "Podem se comunicar através de vibrações no solo." },
  { level: 7, name: "Leão", img: "assets/images/animal2.jpg", habitat: "Savanas africanas", desc: "Rei da selva, vive em grupos.", curiosidade: "As leoas fazem 90% da caça do grupo." },
  { level: 8, name: "Gorila", img: "assets/images/animal3.jpg", habitat: "Florestas tropicais", desc: "Primata inteligente, vive em bandos.", curiosidade: "Compartilham 98% do DNA com humanos." },
  { level: 9, name: "Rinoceronte", img: "assets/images/animal4.jpg", habitat: "Savanas e pradarias", desc: "Herbívoro poderoso com chifre característico.", curiosidade: "Seu chifre é feito de queratina, como nossas unhas." },
  { level: 10, name: "Águia Real", img: "assets/images/animal5.jpg", habitat: "Montanhas e penhascos", desc: "Predador aéreo de visão aguçada.", curiosidade: "Podem ver uma lebre a 3km de distância." },
  { level: 11, name: "Puma", img: "assets/images/animal1.jpg", habitat: "Montanhas e florestas", desc: "Felino solitário e territorial.", curiosidade: "Podem pular 5,5m verticalmente de posição." },
  { level: 12, name: "Lobo Guará", img: "assets/images/animal2.jpg", habitat: "Cerrado e campos", desc: "Canídeo de pernas longas, onívoro.", curiosidade: "Suas longas pernas são adaptadas para andar na vegetação alta." },
  { level: 13, name: "Jaguar", img: "assets/images/animal3.jpg", habitat: "Florestas tropicais", desc: "Maior felino das Américas, nadador.", curiosidade: "Têm a mordida mais forte entre os felinos." },
  { level: 14, name: "Ornitorrinco", img: "assets/images/animal4.jpg", habitat: "Rios e lagos", desc: "Mamífero que bota ovos, venenoso.", curiosidade: "Um dos poucos mamíferos venenosos do mundo." },
  { level: 15, name: "Dragão de Komodo", img: "assets/images/animal5.jpg", habitat: "Ilhas da Indonésia", desc: "Maior lagarto do mundo, venenoso.", curiosidade: "Podem correr até 20km/h em curtas distâncias." }
];

// Carrega os animais desbloqueados
let terrestreUnlocked = JSON.parse(localStorage.getItem("discoveredTerrestre")) || [];
terrestreUnlocked = [...new Set(terrestreUnlocked)].sort((a,b) => a-b);

const discoveries = JSON.parse(localStorage.getItem("terrestreDiscoveries")) || {};
const libraryGrid = document.getElementById("libraryGrid");

// Datas de descoberta
const discoveryDates = {
  1: "1758", 2: "1772", 3: "1792", 4: "1815", 5: "1858",
  6: "1827", 7: "1806", 8: "1847", 9: "1862", 10: "1888",
  11: "1901", 12: "1915", 13: "1928", 14: "1940", 15: "1956"
};

// Renderizar biblioteca
terrestreLibrary.forEach(animal => {
  const card = document.createElement("div");
  card.className = "amoeba-card";

  if (terrestreUnlocked.includes(animal.level)) {
    const date = discoveries[animal.level]?.date || discoveryDates[animal.level] || "Desconhecida";
    
    card.innerHTML = `
      <img src="${animal.img}" alt="${animal.name}" class="amoeba-img">
      <h3>${animal.name}</h3>
      <p><b>Nível:</b> ${animal.level}</p>
      <p><b>Habitat:</b> ${animal.habitat}</p>
      <p><b>Descoberta em:</b> ${date}</p>
      <p><b>Descrição:</b> ${animal.desc}</p>
      <p><b>🎯 Curiosidade:</b> ${animal.curiosidade}</p>
    `;
  } else {
    card.innerHTML = `
      <div class="locked">🌿</div>
      <h3>Animal Desconhecido</h3>
      <p>Nível ${animal.level}</p>
      <p><i>Continue jogando para desbloquear!</i></p>
    `;
  }

  libraryGrid.appendChild(card);
});

// Estilo específico para terrestre
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    header {
      background: linear-gradient(45deg, #388e3c, #4caf50) !important;
    }
    .amoeba-card {
      background: linear-gradient(135deg, #e8f5e8, #c8e6c9) !important;
      border: 2px solid #4caf50;
    }
    .amoeba-card:hover {
      box-shadow: 0 6px 15px rgba(76, 175, 80, 0.4);
    }
    .locked {
      font-size: 50px;
      color: #66bb6a;
      margin: 20px 0;
    }
  `;
  document.head.appendChild(style);
});

