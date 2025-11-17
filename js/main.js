// ======== SISTEMA DE IMAGENS PARA AMEBAS ========
// Cache para imagens carregadas
const amoebaImages = {};
let imagesLoaded = 0;
const totalImages = 20;

// Função para carregar todas as imagens de amebas
function loadAmoebaImages() {
  for (let i = 1; i <= totalImages; i++) {
    const img = new Image();
    img.onload = () => {
      imagesLoaded++;
      console.log(`Imagem da ameba ${i} carregada`);
      // Forçar redesenho quando uma imagem carregar
      if (imagesLoaded === 1) {
        drawBackground();
        drawAmoebas();
      }
    };
    img.onerror = () => {
      console.error(`Erro ao carregar imagem da ameba ${i}`);
      // Criar fallback mais robusto
      imagesLoaded++;
    };
    // Adicionar cache busting para mobile
    img.src = `assets/images/amoeba${i}.jpg?t=${Date.now()}`;
    amoebaImages[i] = img;
  }
}

// Verificar se todas as imagens foram carregadas
function allImagesLoaded() {
  return imagesLoaded === totalImages;
}


// ======== SISTEMA MELHORADO DE POPUPS ========
// REMOVIDO: Funções showPopup e hideAllPopups (agora estão no shared.js)

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamanho original do canvas
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

// ======== SISTEMA DE REDIMENSIONAMENTO IGUAL AOS OUTROS NÍVEIS ========
function resizeCanvas() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Em mobile, o canvas preenche a tela mantendo proporção
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    // Em desktop, calculamos a escala para manter a proporção de 1280x720
    const container = document.getElementById("game-container");
    const scale = Math.min(container.clientWidth / CANVAS_WIDTH, container.clientHeight / CANVAS_HEIGHT);
    
    // Define o tamanho de exibição (CSS) do canvas
    canvas.style.width = (CANVAS_WIDTH * scale) + 'px';
    canvas.style.height = (CANVAS_HEIGHT * scale) + 'px';

    // Define a resolução interna para a qualidade original
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }
}

// Função auxiliar para converter coordenadas do mouse/touch para coordenadas do canvas
function getCanvasCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  let clientX, clientY;
  if (e.touches) {
    // Touch event
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    // Mouse event
    clientX = e.clientX;
    clientY = e.clientY;
  }
  
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}

// Fundo
const bg = new Image();
// Detectar se é mobile e carregar versão mobile do fundo
let lastMobileState = window.innerWidth <= 768;
bg.src = lastMobileState ? "assets/images/fundo1_mobile.jpg" : "assets/images/fundo1.jpg";

// Função para atualizar fundo quando necessário
function updateBackground() {
  const currentMobileState = window.innerWidth <= 768;
  if (currentMobileState !== lastMobileState) {
    const newSrc = currentMobileState ? "assets/images/fundo1_mobile.jpg" : "assets/images/fundo1.jpg";
    // Recarregar a imagem completamente
    bg.onload = function() {
      // Imagem carregada, pode desenhar
    };
    bg.src = newSrc + "?t=" + Date.now(); // Adicionar timestamp para forçar recarregamento
    lastMobileState = currentMobileState;
  }
}

// Garantir que a imagem carregue antes de desenhar
bg.onload = function() {
  // Imagem carregada
};

// Redimensionar ao carregar e ao redimensionar a janela
resizeCanvas();
updateBackground();
window.addEventListener('resize', () => {
  resizeCanvas();
  updateBackground();
});
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    resizeCanvas();
    updateBackground();
  }, 100);
});

// ======== POPUP EDUCATIVO ========
const AMOEBA_INFO = {
  1: { 
    name: "Amoeba proteus", 
    img: "assets/images/amoeba1.jpg", 
    date: "📅 Descoberta: 1755",
    habitat: "🌍 Habitat: Água doce", 
    desc: "Rainha das amebas - move-se com pseudópodes elegantes. Idade: 1.2 bilhão de anos" 
  },
  2: { 
    name: "Entamoeba histolytica", 
    img: "assets/images/amoeba2.jpg", 
    date: "📅 Descoberta: 1875",
    habitat: "🌍 Habitat: Intestino humano", 
    desc: "Parasita especializado em invasão celular. Idade: 1 bilhão de anos" 
  },
  3: { 
    name: "Naegleria fowleri", 
    img: "assets/images/amoeba3.jpg", 
    date: "📅 Descoberta: 1965",
    habitat: "🌍 Habitat: Águas mornas", 
    desc: "Ameba comedora de cérebro - rara e fatal. Idade: 900 milhões de anos" 
  },
  4: { 
    name: "Acanthamoeba", 
    img: "assets/images/amoeba4.jpg", 
    date: "📅 Descoberta: 1930",
    habitat: "🌍 Habitat: Solo e água", 
    desc: "Causa infecções oculares - muito resistente. Idade: 850 milhões de anos" 
  },
  5: { 
    name: "Difflugia", 
    img: "assets/images/amoeba5.jpg", 
    date: "📅 Descoberta: 1816",
    habitat: "🌍 Habitat: Lagos", 
    desc: "Arquiteta microscópica com casinha de areia. Idade: 800 milhões de anos" 
  },
  6: { 
    name: "Arcella", 
    img: "assets/images/amoeba6.jpg", 
    date: "📅 Descoberta: 1832", 
    habitat: "🌍 Habitat: Pântanos",
    desc: "Vive em cúpula quitinosa - mini castelo. Idade: 750 milhões de anos" 
  },
  7: { 
    name: "Euglypha", 
    img: "assets/images/amoeba7.jpg", 
    date: "📅 Descoberta: 1845",
    habitat: "🌍 Habitat: Musgos úmidos", 
    desc: "Constrói escudos de sílica elaborados. Idade: 700 milhões de anos" 
  },
  8: { 
    name: "Vampyrella", 
    img: "assets/images/amoeba8.jpg", 
    date: "📅 Descoberta: 1865",
    habitat: "🌍 Habitat: Lagos com algas", 
    desc: "Ameba laranja - perfura paredes celulares. Idade: 650 milhões de anos" 
  },
  9: { 
    name: "Gromia", 
    img: "assets/images/amoeba9.jpg", 
    date: "📅 Descoberta: 1902",
    habitat: "🌍 Habitat: Fundo oceânico", 
    desc: "Ameba gigante - deixa rastros no mar. Idade: 600 milhões de anos" 
  },
  10: { 
    name: "Foraminífero", 
    img: "assets/images/amoeba10.jpg", 
    date: "📅 Descoberta: 1826",
    habitat: "🌍 Habitat: Oceanos", 
    desc: "Constrói esculturas calcárias complexas. Idade: 550 milhões de anos" 
  },
  11: { 
    name: "Radiolária", 
    img: "assets/images/amoeba11.jpg", 
    date: "📅 Descoberta: 1834",
    habitat: "🌍 Habitat: Oceanos tropicais", 
    desc: "Esqueleto de sílica - joia do plâncton. Idade: 500 milhões de anos" 
  },
  12: { 
    name: "Heliozoa", 
    img: "assets/images/amoeba12.jpg", 
    date: "📅 Descoberta: 1860",
    habitat: "🌍 Habitat: Águas com vegetação", 
    desc: "Ameba solar - pseudópodes radiais. Idade: 450 milhões de anos" 
  },
  13: { 
    name: "Chlamydophrys", 
    img: "assets/images/amoeba13.jpg", 
    date: "📅 Descoberta: 1879",
    habitat: "🌍 Habitat: Solos florestais", 
    desc: "Forma colônias complexas - comportamento social. Idade: 400 milhões de anos" 
  },
  14: { 
    name: "Paulinella", 
    img: "assets/images/amoeba14.jpg", 
    date: "📅 Descoberta: 1895",
    habitat: "🌍 Habitat: Águas marinhas", 
    desc: "Roubou cloroplastos independentemente. Idade: 350 milhões de anos" 
  },
  15: { 
    name: "Filamoeba", 
    img: "assets/images/amoeba15.jpg", 
    date: "📅 Descoberta: 1912",
    habitat: "🌍 Habitat: Solos orgânicos", 
    desc: "Forma filamentos ramificados - elo com fungos. Idade: 300 milhões de anos" 
  },
  16: { 
    name: "Vannella", 
    img: "assets/images/amoeba16.jpg", 
    date: "📅 Descoberta: 1926",
    habitat: "🌍 Habitat: Águas marinhas", 
    desc: "Formato de leque - adaptação marinha. Idade: 250 milhões de anos" 
  },
  17: { 
    name: "Cochliopodium", 
    img: "assets/images/amoeba17.jpg", 
    date: "📅 Descoberta: 1849",
    habitat: "🌍 Habitat: Águas doces", 
    desc: "Coberta por escamas orgânicas - armadura flexível. Idade: 200 milhões de anos" 
  },
  18: { 
    name: "Mayorella", 
    img: "assets/images/amoeba18.jpg", 
    date: "📅 Descoberta: 1934",
    habitat: "🌍 Habitat: Lagos e riachos", 
    desc: "Pseudópodes largos - movimento fluido. Idade: 150 milhões de anos" 
  },
  19: { 
    name: "Thecamoeba", 
    img: "assets/images/amoeba19.jpg", 
    date: "📅 Descoberta: 1961",
    habitat: "🌍 Habitat: Solos pobres", 
    desc: "Ectoplasma rígido - dobras características. Idade: 100 milhões de anos" 
  },
  20: { 
    name: "Saccamoeba", 
    img: "assets/images/amoeba20.jpg", 
    date: "📅 Descoberta: 1973",
    habitat: "🌍 Habitat: Águas ricas", 
    desc: "Forma bolsas alimentares - eficiência. Idade: 50 milhões de anos" 
  }
};

// ======== VARIÁVEIS DO JOGO ========
let discoveredLevels = new Set(JSON.parse(localStorage.getItem("discoveredAmoebas")) || [1]);

let amoebas = [
  { x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 2, dy: 1, animScale: 1 }
];

let coins = 0;
let selectedAmoeba = null;
let moneyAnimations = [];
let spawnTimer = 0;
let spawnInterval = 15000; // 15 segundos
let amoebaPrices = {}; // preços por nível

let upgrades = {
  moreCoins: { name: "Mais moedas por amoeba", level: 0, max: 10, baseCost: 50, effect: 1 },
  fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 5, baseCost: 100, effect: 0.9 },
  higherStart: { name: "Amoebas começam mais fortes", level: 0, max: 5, baseCost: 200, effect: 0 },
  ima: { name: "Ímã mágico", level: 0, max: 3, baseCost: 1000, effect: 5 }
};

// ======== SISTEMA DE SAVE/LOAD PARA AMOEBAS ========
function saveGame() {
    const state = {
        amoebas,
        coins,
        upgrades,
        amoebaPrices,
        discoveredLevels: [...discoveredLevels],
        spawnTimer,
        spawnInterval
    };
    localStorage.setItem("gameState_amoebas", JSON.stringify(state));
}

function loadGame() {
    const saved = localStorage.getItem("gameState_amoebas");
    if (!saved) {
        // Se não há save para amoebas, inicia do zero
        resetGameForAmoebas();
        return;
    }

    const state = JSON.parse(saved);
    amoebas = state.amoebas || amoebas;
    coins = state.coins || 0;
    upgrades = state.upgrades || upgrades;
    amoebaPrices = state.amoebaPrices || {};
    discoveredLevels = new Set(state.discoveredLevels || [1]);
    spawnTimer = state.spawnTimer || 0;
    spawnInterval = state.spawnInterval || 15000;

    document.getElementById("coins").innerText = `💰 ${coins}`;

    const coinElement = document.getElementById("coins");
    coinElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    coinElement.style.fontWeight = '800';
    coinElement.style.fontSize = '20px';
    
    coinElement.style.color = '#000000ff';
    coinElement.style.letterSpacing = '0.5px';
    
    // Verificar se já tem nível 20 ao carregar
    setTimeout(() => {
        checkNewLevelUnlock();
    }, 1000);
}

function resetGameForAmoebas() {
    amoebas = [
        { x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 2, dy: 1, animScale: 1 }
    ];
    coins = 0;
    amoebaPrices = {};
    discoveredLevels = new Set([1]);
    spawnTimer = 0;
    spawnInterval = 15000;
    
    upgrades = {
        moreCoins: { name: "Mais moedas por amoeba", level: 0, max: 10, baseCost: 50, effect: 1 },
        fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 5, baseCost: 100, effect: 0.9 },
        higherStart: { name: "Amoebas começam mais fortes", level: 0, max: 5, baseCost: 200, effect: 0 },
        ima: { name: "Ímã mágico", level: 0, max: 3, baseCost: 1000, effect: 5 }
    };
    
    document.getElementById("coins").innerText = `💰 ${coins}`;
}

window.addEventListener("beforeunload", saveGame);

// ======== POPUPS ========
function saveDiscovered() {
  localStorage.setItem("discoveredAmoebas", JSON.stringify([...discoveredLevels]));
}

function showInfoPopup(level) {
  const info = AMOEBA_INFO[level] || {
    name: `Ameba Nível ${level}`, img: "assets/images/amoeba.jpg", date: `📅 Descoberta: ${1800 + level}`,
    habitat: "🌍 Habitat: Lagos e rios de água doce", desc: `Amoeba nível ${level}: informações ainda em estudo.`
  };

  const popup = document.getElementById("info-popup");

  
  document.getElementById("info-image").src = info.img;
  document.getElementById("info-date").textContent = info.date;
  document.getElementById("info-habitat").textContent = info.habitat;
  document.getElementById("info-description").textContent = info.desc;

  popup.classList.remove("hidden");
  popup.style.display = "block";
  saveGame();
}

document.getElementById("closeInfo").addEventListener("click", () => {
  const popup = document.getElementById("info-popup");
  popup.classList.add("hidden");
  popup.style.display = "none";
  saveGame();
});

// ======== BOTÕES ========
document.getElementById("upgradeBtn").addEventListener("click", () => {
  const popup = document.getElementById("upgrade-popup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
  popup.classList.toggle("hidden");
  renderUpgradeList();
});

document.getElementById("closeUpgrade").addEventListener("click", () => {
  document.getElementById("upgrade-popup").style.display = "none";
  document.getElementById("upgrade-popup").classList.add("hidden");
  saveGame();
});

document.getElementById("libraryBtn").addEventListener("click", () => {
  saveGame();
  window.location.href = "library.html";
});

document.getElementById("buyAmoebaBtn").addEventListener("click", () => {
  const popup = document.getElementById("buy-popup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
  popup.classList.toggle("hidden");
  renderBuyList();
});

document.getElementById("closeBuy").addEventListener("click", () => {
  document.getElementById("buy-popup").style.display = "none";
  document.getElementById("buy-popup").classList.add("hidden");
  saveGame();
});

// ======== SISTEMA DE COMPRA ========
function buyAmoeba(level = 1) {
  if (!discoveredLevels.has(level)) {
      alert(`Você precisa desbloquear o nível ${level} primeiro!`);
      return;
  }
  
  const cost = amoebaPrices[level] || (50 * level);
  if (coins >= cost) {
      coins -= cost;
      spawnAmoeba(level, false);
      amoebaPrices[level] = Math.floor(cost * 1.2);
      document.getElementById("coins").innerText = `💰 ${coins}`;
      saveGame();
  } else {
      alert("Moedas insuficientes!");
  }
}

function buyUpgrade(type) {
  const u = upgrades[type];
  if (!u || u.level >= u.max) return;

  const cost = u.baseCost * (u.level + 1);
  if (coins >= cost) {
    coins -= cost;
    u.level++;

    if (type === "moreCoins") u.effect = 1 + u.level;
    if (type === "fasterSpawn") spawnInterval = 15000 * Math.pow(0.9, u.level);
    if (type === "higherStart") u.effect = u.level;
    if (type === "ima") u.effect = 6 - u.level; // menos tempo pro ímã

    document.getElementById("coins").innerText = `💰 ${coins}`;
    saveGame();
  } else {
    alert("Moedas insuficientes!");
  }
}

// ======== RENDER UPGRADES ========
function renderUpgradeList() {
  const container = document.getElementById("upgrade-list");
  container.innerHTML = ""; // limpa antes

  for (let key in upgrades) {
    const u = upgrades[key];
    const cost = u.baseCost * (u.level + 1);

    const item = document.createElement("div");
    item.className = "upgrade-item";
    item.innerHTML = `
      <strong>${u.name}</strong> <br>
      Nível: ${u.level}/${u.max} <br>
      Custo: 💰 ${cost}
      <br>
      <button ${u.level >= u.max ? "disabled" : ""}>Comprar</button>
    `;

    item.querySelector("button").addEventListener("click", () => {
      buyUpgrade(key);
      renderUpgradeList(); // recarrega lista
    });

    container.appendChild(item);
  }
}

// ======== RENDER COMPRAR AMOEBAS ========
function renderBuyList() {
  const container = document.getElementById("buy-list");
  container.innerHTML = "";

  for (let level = 1; level <= 20; level++) {
      const cost = amoebaPrices[level] || (50 * level);
      const isUnlocked = discoveredLevels.has(level);

      const item = document.createElement("div");
      item.className = `buy-item ${!isUnlocked ? 'locked' : ''}`;
      item.innerHTML = `
          <strong>Amoeba Nível ${level}</strong> <br>
          ${!isUnlocked ? '<span style="color: red;">🔒 Não desbloqueado</span><br>' : ''}
          Custo: 💰 ${cost} <br>
          <button ${!isUnlocked ? 'disabled' : ''}>${!isUnlocked ? 'Bloqueado' : 'Comprar'}</button>
      `;

      if (isUnlocked) {
          item.querySelector("button").addEventListener("click", () => {
              buyAmoeba(level);
              renderBuyList();
          });
      }

      container.appendChild(item);
  }
}

// ======== JOGO ========
function spawnAmoeba(level = 1, applyHigherStart = true) {
  const lvl = applyHigherStart ? (level + upgrades.higherStart.effect) : level;
  
  const newAmoeba = {
      x: Math.random() * (canvas.width - 60),
      y: Math.random() * (canvas.height - 60),
      size: 60,
      level: lvl,
      dragging: false,
      dx: (Math.random() * 2 - 1) * 2,
      dy: (Math.random() * 2 - 1) * 2,
      animScale: 1
  };

  amoebas.push(newAmoeba);

  if (!discoveredLevels.has(lvl)) {
      discoveredLevels.add(lvl);
      showInfoPopup(lvl);
      saveDiscovered();
  }
}

// Gerar moedas
setInterval(() => {
  for (let amoeba of amoebas) {
    const value = amoeba.level * upgrades.moreCoins.effect;
    coins += Math.floor(value);
    document.getElementById("coins").innerText = `💰 ${coins}`;

    moneyAnimations.push({
      x: amoeba.x + amoeba.size / 2,
      y: amoeba.y,
      value: `+${Math.floor(value)}`,
      alpha: 1,
      dy: -1
    });
  }
}, 1500);

// Clique e fusão
canvas.addEventListener("mousedown", e => {
  const coords = getCanvasCoordinates(e);
  const mouseX = coords.x;
  const mouseY = coords.y;

  for (let amoeba of amoebas) {
    if (
      mouseX > amoeba.x && mouseX < amoeba.x + amoeba.size &&
      mouseY > amoeba.y && mouseY < amoeba.y + amoeba.size
    ) {
      selectedAmoeba = amoeba;
      amoeba.dragging = true;
    }
  }
});

canvas.addEventListener("mousemove", e => {
  if (selectedAmoeba && selectedAmoeba.dragging) {
    const coords = getCanvasCoordinates(e);
    selectedAmoeba.x = coords.x - selectedAmoeba.size / 2;
    selectedAmoeba.y = coords.y - selectedAmoeba.size / 2;
  }
});

canvas.addEventListener("mouseup", () => {
  if (selectedAmoeba) {
    selectedAmoeba.dragging = false;

    for (let other of amoebas) {
      if (other !== selectedAmoeba && isColliding(selectedAmoeba, other)) {
        if (selectedAmoeba.level === other.level) {
          mergeAmoebas(selectedAmoeba, other);
        }
      }
    }

    selectedAmoeba = null;
  }
});

// Fusão
function mergeAmoebas(a, b) {
  const newLevel = a.level + 1;
  
  // ✅ PERMITIR FUSÃO ATÉ O NÍVEL 20
  if (newLevel > 20) {
    console.log("🎯 Nível máximo das amebas alcançado!");
    return;
  }
  
  const newAmoeba = {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    size: 60,
    level: newLevel,
    dragging: false,
    dx: (Math.random() * 2 - 1) * 2,
    dy: (Math.random() * 2 - 1) * 2,
    animScale: 1.5
  };

  amoebas = amoebas.filter(x => x !== a && x !== b);
  amoebas.push(newAmoeba);

  if (!discoveredLevels.has(newLevel)) {
    discoveredLevels.add(newLevel);
    showInfoPopup(newLevel);
    saveDiscovered();
  }
  
  // ✅ VERIFICAR SE DESBLOQUEOU NOVO NÍVEL APÓS FUSÃO
  checkNewLevelUnlock();
  saveGame();
}

// ======== UTILITÁRIOS ========
function isColliding(a, b) {
  const dx = (a.x + a.size / 2) - (b.x + b.size / 2);
  const dy = (a.y + a.size / 2) - (b.y + b.size / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (a.size / 2 + b.size / 2);
}

function getColor(level) {
  // Verificar se há skin equipada para amoebas
  if (equippedSkin.amoebas) {
    // Encontrar a skin equipada
    for (let lvl in inventory.amoebas) {
      const skin = inventory.amoebas[lvl].find(s => s.id === equippedSkin.amoebas);
      if (skin && parseInt(lvl) === level) {
        return skin.color;
      }
    }
  }
  
  // Cores padrão se não houver skin equipada
  const colors = ["limegreen", "blue", "orange", "purple", "red", "gold"];
  return colors[(level - 1) % colors.length];
}

// ======== ÍMÃ ========
setInterval(() => {
  if (upgrades.ima.level > 0) {
    for (let i = 0; i < amoebas.length; i++) {
      for (let j = i + 1; j < amoebas.length; j++) {
        if (amoebas[i].level === amoebas[j].level) {
          mergeAmoebas(amoebas[i], amoebas[j]);
          return;
        }
      }
    }
  }
}, 1000 * upgrades.ima.effect);

// ======== ATUALIZAÇÕES ========
function updateAmoebas(deltaTime) {
  for (let amoeba of amoebas) {
    if (!amoeba.dragging) {
      amoeba.x += amoeba.dx;
      amoeba.y += amoeba.dy;

      if (amoeba.x <= 0 || amoeba.x + amoeba.size >= canvas.width) amoeba.dx *= -1;
      if (amoeba.y <= 0 || amoeba.y + amoeba.size >= canvas.height) amoeba.dy *= -1;

      if (Math.random() < 0.01) {
        amoeba.dx = (Math.random() * 2 - 1) * 2;
        amoeba.dy = (Math.random() * 2 - 1) * 2;
      }
    }

    if (amoeba.animScale > 1) {
      amoeba.animScale -= 0.02;
      if (amoeba.animScale < 1) amoeba.animScale = 1;
    }
  }

  spawnTimer += deltaTime;
  if (spawnTimer >= spawnInterval) {
    spawnAmoeba(1, true);
    spawnTimer = 0;
  }
}

function updateMoneyAnimations() {
  for (let anim of moneyAnimations) {
    anim.y += anim.dy;
    anim.alpha -= 0.02;
  }
  moneyAnimations = moneyAnimations.filter(a => a.alpha > 0);
}

// ======== DESENHO ========
function drawBackground() {
  // Verificar se a imagem está carregada antes de desenhar
  if (bg.complete && bg.naturalWidth > 0) {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  } else {
    // Se não carregou ainda, desenhar fundo preto temporário
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function drawAmoebas() {
  for (let amoeba of amoebas) {
    const scale = amoeba.animScale;
    const size = amoeba.size * scale;
    const x = amoeba.x;
    const y = amoeba.y;
    const borderRadius = 30; // Ajuste este valor para controlar o arredondamento
    
    // Verificar se a imagem para este nível está carregada
    const amoebaImage = amoebaImages[amoeba.level];
    
    if (amoebaImage && amoebaImage.complete) {
      // DESENHAR COM BORDAS ARREDONDADAS
      ctx.save();
      
      // Criar um caminho retangular com bordas arredondadas
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + size - borderRadius, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + borderRadius);
      ctx.lineTo(x + size, y + size - borderRadius);
      ctx.quadraticCurveTo(x + size, y + size, x + size - borderRadius, y + size);
      ctx.lineTo(x + borderRadius, y + size);
      ctx.quadraticCurveTo(x, y + size, x, y + size - borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.quadraticCurveTo(x, y, x + borderRadius, y);
      ctx.closePath();
      ctx.clip(); // Aplica o clipping path
      
      // Desenhar a imagem
      ctx.drawImage(amoebaImage, x, y, size, size);
      
      ctx.restore(); // Remove o clipping path
      
    } else {
      // Fallback: desenhar círculo colorido
      const centerX = amoeba.x + amoeba.size / 2;
      const centerY = amoeba.y + amoeba.size / 2;
      const radius = (amoeba.size / 2) * scale;
      
      ctx.fillStyle = getColor(amoeba.level);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
    }

    // Texto do nível
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Lv ${amoeba.level}`, amoeba.x + amoeba.size / 2, amoeba.y + amoeba.size / 2 + 5);
  }
}

function drawMoneyAnimations() {
  for (let anim of moneyAnimations) {
    ctx.globalAlpha = anim.alpha;
    
    // ✅ FONTE OTIMIZADA PARA MOBILE
    ctx.font = "700 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    
    // ✅ CONTORNO PARA MELHOR LEGIBILIDADE
    ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
    ctx.lineWidth = 3;
    ctx.strokeText(anim.value, anim.x, anim.y);
    
    // ✅ TEXTO PRINCIPAL
    ctx.fillStyle = "#FFD700";
    ctx.fillText(anim.value, anim.x, anim.y);
    
    ctx.globalAlpha = 1;
  }
}

function drawSpawnBar() {
  const barWidth = 150;
  const barHeight = 20;
  const x = canvas.width / 2 - barWidth / 2;
  const y = 20;
  const progress = spawnTimer / spawnInterval;

  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(x, y, barWidth, barHeight);

  ctx.fillStyle = "lime";
  ctx.fillRect(x, y, barWidth * progress, barHeight);

  ctx.strokeStyle = "white";
  ctx.strokeRect(x, y, barWidth, barHeight);
}

// ======== FUNÇÃO AUXILIAR PARA ATUALIZAÇÃO DE CORES ========
// Função para forçar atualização de cores (usada pelo sistema de skins)
function forceUpdateColors() {
  console.log("🎨 Forçando atualização de cores...");
  // Esta função será chamada quando uma skin for equipada
  // O game loop vai atualizar automaticamente na próxima frame
}

// ======== VERIFICAÇÃO DO NOVO NÍVEL ========
function checkNewLevelUnlock() {
  const hasLevel20 = amoebas.some(a => a.level >= 20);
  const newLevelBtn = document.getElementById("newlevelbtn");
  
  console.log("Verificando novo nível:", { 
      hasLevel20, 
      amoebas: amoebas.map(a => a.level) 
  });
  
  if (hasLevel20) {
      newLevelBtn.classList.remove("hidden");
      newLevelBtn.style.display = "block";
      // Salvar que o nível foi desbloqueado
      localStorage.setItem("nivel_peixes_desbloqueado", "true");
      console.log("✅ Botão do novo nível liberado!");
  } else {
      newLevelBtn.classList.add("hidden");
      newLevelBtn.style.display = "none";
  }
}

// ======== LOOP DO JOGO ========
let lastTime = 0;
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    updateAmoebas(deltaTime);
    updateMoneyAnimations();
    
    // ✅ ADICIONAR VERIFICAÇÃO DO NOVO NÍVEL A CADA FRAME
    checkNewLevelUnlock();
    
    drawBackground();
    drawAmoebas();
    drawMoneyAnimations();
    drawSpawnBar();

    requestAnimationFrame(gameLoop);
}

// ======== SISTEMA DE TOUCH PARA MOBILE ========

// Variáveis para controle de touch
let touchStartX = 0;
let touchStartY = 0;
let isTouching = false;

// Touch events para mobile
canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

function handleTouchStart(e) {
  e.preventDefault();
  if (e.touches.length === 1) {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    
    const coords = getCanvasCoordinates(e);
    const mouseX = coords.x;
    const mouseY = coords.y;
    
    // Verificar se tocou em uma amoeba
    for (let amoeba of amoebas) {
      if (
        mouseX > amoeba.x && mouseX < amoeba.x + amoeba.size &&
        mouseY > amoeba.y && mouseY < amoeba.y + amoeba.size
      ) {
        selectedAmoeba = amoeba;
        amoeba.dragging = true;
        isTouching = true;
        break;
      }
    }
  }
}

function handleTouchMove(e) {
  e.preventDefault();
  if (isTouching && selectedAmoeba && selectedAmoeba.dragging && e.touches.length === 1) {
    const coords = getCanvasCoordinates(e);
    // Limitar movimento dentro dos bounds do canvas
    const maxX = canvas.width - selectedAmoeba.size;
    const maxY = canvas.height - selectedAmoeba.size;
    
    selectedAmoeba.x = Math.max(0, Math.min(maxX, coords.x - selectedAmoeba.size / 2));
    selectedAmoeba.y = Math.max(0, Math.min(maxY, coords.y - selectedAmoeba.size / 2));
  }
}

function handleTouchEnd(e) {
  e.preventDefault();
  if (selectedAmoeba) {
    selectedAmoeba.dragging = false;
    
    // Verificar fusão (mesma lógica do mouse)
    for (let other of amoebas) {
      if (other !== selectedAmoeba && isColliding(selectedAmoeba, other)) {
        if (selectedAmoeba.level === other.level) {
          mergeAmoebas(selectedAmoeba, other);
          break; // Sair após fusão
        }
      }
    }
    
    selectedAmoeba = null;
  }
  isTouching = false;
}

// Prevenir menu de contexto em mobile
canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// ======== INICIALIZAÇÃO ========
bg.onload = () => {
  loadAmoebaImages(); // Adicione esta linha
  loadGame();
  requestAnimationFrame(gameLoop);
  // ======== INICIALIZAÇÃO =======z
};


// ======== AJUSTES DE PERFORMANCE PARA MOBILE ========

// Otimizar game loop para mobile
let mobileFrameRate = 60;
let lastMobileTime = 0;

function optimizedGameLoop(timestamp) {
  // Controlar framerate em dispositivos móveis
  if (timestamp - lastMobileTime >= 1000 / mobileFrameRate) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    lastMobileTime = timestamp;

    updateAmoebas(deltaTime);
    updateMoneyAnimations();
    checkNewLevelUnlock();
    
    drawBackground();
    drawAmoebas();
    drawMoneyAnimations();
    drawSpawnBar();
  }
  
  requestAnimationFrame(optimizedGameLoop);
}

// ======== DETECÇÃO DE DISPOSITIVO MÓVEL ========
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Ajustar configurações baseado no dispositivo
if (isMobileDevice()) {
  // Reduzir número máximo de amoebas em mobile
  const MAX_AMOEBAS_MOBILE = 15;
  
  // Interceptar spawn para limitar quantidade
  const originalSpawnAmoeba = spawnAmoeba;
  spawnAmoeba = function(level = 1) {
    if (amoebas.length < MAX_AMOEBAS_MOBILE) {
      originalSpawnAmoeba(level);
    }
  };
  
  // Ajustar framerate para economizar bateria
  mobileFrameRate = 45;
  
  // Usar o game loop otimizado
  bg.onload = () => {
    loadGame();
    requestAnimationFrame(optimizedGameLoop);
  };
}

// ✅ SISTEMA DE PERSISTÊNCIA DE IMAGENS ENTRE PÁGINAS
let imageReloadAttempts = 0;
const MAX_RELOAD_ATTEMPTS = 3;

// ✅ VERIFICAR AO INICIAR A PÁGINA
function initializeAmoebaPage() {
  console.log("🔄 Inicializando página de amebas...");
  
  // Verificar se já temos algumas imagens carregadas
  const currentlyLoaded = countLoadedImages();
  console.log(`📊 Imagens já carregadas: ${currentlyLoaded}/${totalImages}`);
  
  if (currentlyLoaded < totalImages && imageReloadAttempts < MAX_RELOAD_ATTEMPTS) {
    console.log("🔄 Carregando imagens faltantes...");
    loadAmoebaImages();
    imageReloadAttempts++;
  }
}

// ✅ CONTAR IMAGENS CARREGADAS
function countLoadedImages() {
  let count = 0;
  for (let i = 1; i <= totalImages; i++) {
    if (amoebaImages[i] && amoebaImages[i].complete && amoebaImages[i].naturalWidth > 0) {
      count++;
    }
  }
  return count;
}

// ✅ MODIFICAR A INICIALIZAÇÃO
bg.onload = () => {
  loadAmoebaImages();
  loadGame();
  
  // ✅ INICIALIZAR VERIFICAÇÕES
  initializeAmoebaPage();
  
  // ✅ VERIFICAÇÃO PERIÓDICA (apenas para debug)
  setTimeout(() => {
    const loaded = countLoadedImages();
    console.log(`✅ Status final: ${loaded}/${totalImages} imagens carregadas`);
    
    if (loaded < totalImages) {
      console.log("⚠️ Algumas imagens não carregaram, usando fallbacks");
    }
  }, 3000);
  
  requestAnimationFrame(gameLoop);
};