// terrestre.js - Código específico para o nível terrestre

// ======== SISTEMA DE IMAGENS PARA ANIMAIS TERRESTRES ========
// Cache para imagens carregadas
const animalImages = {};
let imagesLoaded = 0;
const totalImages = 20;

// Função para carregar todas as imagens de animais terrestres
function loadAnimalImages() {
  for (let i = 1; i <= totalImages; i++) {
    const img = new Image();
    img.onload = () => {
      imagesLoaded++;
      console.log(`Imagem do animal terrestre ${i} carregada`);
    };
    img.onerror = () => {
      console.error(`Erro ao carregar imagem do animal terrestre ${i}`);
      // Usar imagem de fallback se necessário
      imagesLoaded++;
    };
    img.src = `assets/images/animal${i}.jpg`;
    animalImages[i] = img;
  }
}

// Verificar se todas as imagens foram carregadas
function allImagesLoaded() {
  return imagesLoaded === totalImages;
}

// ======== INFORMAÇÕES DOS ANIMAIS TERRESTRES ========


// ======== SISTEMA COMPARTILHADO DE SKINS E LOOTBOXES ========
// REMOVIDO: Funções showPopup, hideAllPopups (agora no shared.js)
// REMOVIDO: Variáveis inventory e equippedSkin (agora no shared.js)
// REMOVIDO: Funções de lootbox e inventory duplicadas (agora no shared.js)

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamanho original do canvas
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

// Função para redimensionar o canvas responsivamente
function resizeCanvas() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Em mobile, o canvas preenche a tela. O CSS já cuida do tamanho do elemento.
    // Apenas ajustamos a resolução interna para corresponder.
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  } else {
    // Em desktop, calculamos a escala para manter a proporção de 1280x720.
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

// Fundo terrestre
const bg = new Image();
// Detectar se é mobile e carregar versão mobile do fundo
let lastMobileState = window.innerWidth <= 768;
bg.src = lastMobileState ? "assets/images/fundo-terrestre_mobile.png" : "assets/images/fundo-terrestre.jpg";

// Função para atualizar fundo quando necessário
function updateBackground() {
  const currentMobileState = window.innerWidth <= 768;
  if (currentMobileState !== lastMobileState) {
    const newSrc = currentMobileState ? "assets/images/fundo-terrestre_mobile.png" : "assets/images/fundo-terrestre.jpg";
    bg.onload = function() {
      // Imagem carregada
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

// ======== INFORMAÇÕES DOS ANIMAIS TERRESTRES ========
const TERRESTRE_INFO = {
  1: { 
    name: "Musaranho-pigmeu", 
    img: "assets/images/animal1.jpg", 
    date: "📅 Descoberta: 1831",
    habitat: "🌿 Habitat: Florestas Eurásia", 
    desc: "Menor mamífero do mundo - 2g. Idade: 45 milhões de anos" 
  },
  2: { 
    name: "Tâmara", 
    img: "assets/images/animal2.jpg", 
    date: "📅 Descoberta: 1766",
    habitat: "🌿 Habitat: Américas", 
    desc: "Roedor saltador - ouvidos gigantes. Idade: 40 milhões de anos" 
  },
  3: { 
    name: "Heterocefalo", 
    img: "assets/images/animal3.jpg", 
    date: "📅 Descoberta: 1842",
    habitat: "🌿 Habitat: África Oriental", 
    desc: "Rato-toupeira - eusocial. Idade: 35 milhões de anos" 
  },
  4: { 
    name: "Lóris-lento", 
    img: "assets/images/animal4.jpg", 
    date: "📅 Descoberta: 1891", 
    habitat: "🌿 Habitat: Sudeste Asiático",
    desc: "Primata venenoso - olhos grandes. Idade: 30 milhões de anos" 
  },
  5: { 
    name: "Pangolim", 
    img: "assets/images/animal5.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌿 Habitat: África/Ásia", 
    desc: "Mamífero escamado - rolador. Idade: 25 milhões de anos" 
  },
  6: { 
    name: "Tamanduá-bandeira", 
    img: "assets/images/animal6.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌿 Habitat: Américas", 
    desc: "Língua de 60cm - formigueiro. Idade: 20 milhões de anos" 
  },
  7: { 
    name: "Coala", 
    img: "assets/images/animal7.jpg", 
    date: "📅 Descoberta: 1798",
    habitat: "🌿 Habitat: Austrália", 
    desc: "Marsupial - folhas de eucalipto. Idade: 15 milhões de anos" 
  },
  8: { 
    name: "Diabo-da-tasmânia", 
    img: "assets/images/animal8.jpg", 
    date: "📅 Descoberta: 1808",
    habitat: "🌿 Habitat: Tasmânia", 
    desc: "Marsupial carnívoro - mordida forte. Idade: 10 milhões de anos" 
  },
  9: { 
    name: "Ornitorrinco", 
    img: "assets/images/animal9.jpg", 
    date: "📅 Descoberta: 1799",
    habitat: "🌿 Habitat: Austrália", 
    desc: "Mamífero que bota ovos - bico. Idade: 8 milhões de anos" 
  },
  10: { 
    name: "Suricato", 
    img: "assets/images/animal10.jpg", 
    date: "📅 Descoberta: 1776",
    habitat: "🌿 Habitat: Sul da África", 
    desc: "Vigia do deserto - social. Idade: 6 milhões de anos" 
  },
  11: { 
    name: "Lêmure", 
    img: "assets/images/animal11.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌿 Habitat: Madagascar", 
    desc: "Primata de Madagascar - noturno. Idade: 5 milhões de anos" 
  },
  12: { 
    name: "Jaguatirica", 
    img: "assets/images/animal12.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌿 Habitat: Américas", 
    desc: "Gato selvagem - manchas. Idade: 4 milhões de anos" 
  },
  13: { 
    name: "Lobo-vermelho", 
    img: "assets/images/animal13.jpg", 
    date: "📅 Descoberta: 1851",
    habitat: "🌿 Habitat: EUA", 
    desc: "Canídeo raro - americano. Idade: 3 milhões de anos" 
  },
  14: { 
    name: "Urso-polar", 
    img: "assets/images/animal14.jpg", 
    date: "📅 Descoberta: 1774",
    habitat: "❄️ Habitat: Ártico", 
    desc: "Maior urso terrestre - nadador. Idade: 2 milhões de anos" 
  },
  15: { 
    name: "Gorila", 
    img: "assets/images/animal15.jpg", 
    date: "📅 Descoberta: 1847",
    habitat: "🌿 Habitat: África Central", 
    desc: "Primata grande - inteligente. Idade: 1.5 milhão de anos" 
  },
  16: { 
    name: "Tigre", 
    img: "assets/images/animal16.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌿 Habitat: Ásia", 
    desc: "Maior felino - listras únicas. Idade: 1 milhão de anos" 
  },
  17: { 
    name: "Leão", 
    img: "assets/images/animal17.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌿 Habitat: África/Índia", 
    desc: "Rei da selva - social. Idade: 800 mil anos" 
  },
  18: { 
    name: "Elefante-africano", 
    img: "assets/images/animal18.jpg", 
    date: "📅 Descoberta: 1758", 
    habitat: "🌿 Habitat: Savanas africanas",
    desc: "Maior terrestre - memória excepcional. Idade: 700 mil anos" 
  },
  19: { 
    name: "Rinoceronte", 
    img: "assets/images/animal19.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌿 Habitat: África/Ásia", 
    desc: "Herbívoro pesado - chifre. Idade: 500 mil anos" 
  },
  20: { 
    name: "Hipopótamo", 
    img: "assets/images/animal20.jpg", 
    date: "📅 Descoberta: 1758", 
    habitat: "🌿 Habitat: África",
    desc: "Semi-aquático - mais perigoso da África. Idade: 300 mil anos" 
  }
};

// ======== VARIÁVEIS DO JOGO ========
let discoveredLevels = new Set([1]);
let amoebas = [
    { x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 1.2, dy: 0.6, animScale: 1 }
];
let coins = 0;
let selectedAmoeba = null;
let moneyAnimations = [];
let spawnTimer = 0;
let spawnInterval = 15000;
let amoebaPrices = {};

let upgrades = {
    moreCoins: { name: "Mais moedas por animal", level: 0, max: 15, baseCost: 100, effect: 2 },
    fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 8, baseCost: 200, effect: 0.85 },
    higherStart: { name: "Animais começam mais fortes", level: 0, max: 8, baseCost: 400, effect: 0 },
    ima: { name: "Ímã mágico", level: 0, max: 5, baseCost: 2000, effect: 4 }
};

// ======== SISTEMA DE SAVE/LOAD PARA TERRESTRE ========
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
    localStorage.setItem("gameState_terrestre", JSON.stringify(state));
}

function loadGame() {
    const saved = localStorage.getItem("gameState_terrestre");
    if (!saved) {
        resetGame();
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
}

function resetGame() {
    amoebas = [
        { x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 1.2, dy: 0.6, animScale: 1 }
    ];
    coins = 0;
    amoebaPrices = {};
    discoveredLevels = new Set([1]);
    spawnTimer = 0;
    spawnInterval = 15000;
    
    upgrades = {
        moreCoins: { name: "Mais moedas por animal", level: 0, max: 15, baseCost: 100, effect: 2 },
        fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 8, baseCost: 200, effect: 0.85 },
        higherStart: { name: "Animais começam mais fortes", level: 0, max: 8, baseCost: 400, effect: 0 },
        ima: { name: "Ímã mágico", level: 0, max: 5, baseCost: 2000, effect: 4 }
    };
    
    document.getElementById("coins").innerText = `💰 ${coins}`;
}

// ======== SISTEMA DE DESCOBERTAS PARA TERRESTRE ========
function saveDiscovered() {
    localStorage.setItem("discoveredTerrestre", JSON.stringify([...discoveredLevels]));
    
    const discoveries = JSON.parse(localStorage.getItem("terrestreDiscoveries")) || {};
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    discoveredLevels.forEach(level => {
        if (!discoveries[level]) {
            discoveries[level] = {
                date: currentDate,
                level: level,
                name: TERRESTRE_INFO[level]?.name || `Animal Nível ${level}`
            };
        }
    });
    
    localStorage.setItem("terrestreDiscoveries", JSON.stringify(discoveries));
}

// ======== POPUPS ========
function showInfoPopup(level) {
    const info = TERRESTRE_INFO[level] || {
        name: `Animal Nível ${level}`, 
        img: "assets/images/animal1.jpg", 
        date: `📅 Descoberta: ${1750 + level * 15}`,
        habitat: "🌳 Habitat: Terrestre", 
        desc: `Animal nível ${level}: espécie terrestre em estudo.`
    };

    const popup = document.getElementById("info-popup");
    document.getElementById("info-image").src = info.img;
    document.getElementById("info-date").textContent = info.date;
    document.getElementById("info-habitat").textContent = info.habitat;
    document.getElementById("info-description").textContent = info.desc;

    popup.classList.remove("hidden");
    popup.style.display = "block";
    
    saveDiscovered();
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
    window.location.href = "library-terrestre.html";
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

        if (type === "moreCoins") u.effect = 2 + u.level;
        if (type === "fasterSpawn") spawnInterval = 15000 * Math.pow(0.85, u.level);
        if (type === "higherStart") u.effect = u.level;
        if (type === "ima") u.effect = 8 - u.level;

        document.getElementById("coins").innerText = `💰 ${coins}`;
        saveGame();
    } else {
        alert("Moedas insuficientes!");
    }
}

// ======== RENDER UPGRADES ========
function renderUpgradeList() {
    const container = document.getElementById("upgrade-list");
    container.innerHTML = "";

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
            renderUpgradeList();
        });

        container.appendChild(item);
    }
}

// ======== RENDER COMPRAR ANIMAIS ========
function renderBuyList() {
  const container = document.getElementById("buy-list");
  container.innerHTML = "";

  for (let level = 1; level <= 20; level++) {
      const cost = amoebaPrices[level] || (50 * level);
      const isUnlocked = discoveredLevels.has(level);

      const item = document.createElement("div");
      item.className = `buy-item ${!isUnlocked ? 'locked' : ''}`;
      item.innerHTML = `
          <strong>Peixe Nível ${level}</strong> <br>
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
function spawnAmoeba(level = 1) {
  const lvl = level + upgrades.higherStart.effect;
    const newAmoeba = {
        x: Math.random() * (canvas.width - 60),
        y: Math.random() * (canvas.height - 60),
        size: 60,
        level: lvl,
        dragging: false,
        dx: (Math.random() * 2 - 1) * 1.5,
        dy: (Math.random() * 2 - 1) * 1.5,
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
      console.log("🎯 Nível máximo dos animais terrestres alcançado!");
      return;
  }
  
  const newAmoeba = {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
      size: 60,
      level: newLevel,
      dragging: false,
      dx: (Math.random() * 2 - 1) * 1.5,
      dy: (Math.random() * 2 - 1) * 1.5,
      animScale: 1.5
  };

  amoebas = amoebas.filter(x => x !== a && x !== b);
  amoebas.push(newAmoeba);

  if (!discoveredLevels.has(newLevel)) {
      discoveredLevels.add(newLevel);
      showInfoPopup(newLevel);
      saveDiscovered();
  }
}

// ======== UTILITÁRIOS ========
function isColliding(a, b) {
    const dx = (a.x + a.size / 2) - (b.x + b.size / 2);
    const dy = (a.y + a.size / 2) - (b.y + b.size / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (a.size / 2 + b.size / 2);
}

function getColor(level) {
  // Verificar se há skin equipada para terrestre
  if (equippedSkin.terrestre) {
    // Procurar a skin equipada em todos os níveis
    for (let lvl in inventory.terrestre) {
      const skin = inventory.terrestre[lvl].find(s => s.id === equippedSkin.terrestre);
      if (skin) {
        // Usar a skin mesmo que o nível não corresponda exatamente
        return skin.color;
      }
    }
  }
  
  // Cores padrão se não houver skin equipada
  const colors = ["#8BC34A", "#795548", "#FF9800", "#607D8B", "#E91E63", "#9C27B0", "#3F51B5", "#009688", "#FF5722", "#673AB7", "#CDDC39", "#00BCD4", "#FFC107", "#9E9E9E", "#4CAF50"];
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
                amoeba.dx = (Math.random() * 2 - 1) * 1.5;
                amoeba.dy = (Math.random() * 2 - 1) * 1.5;
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
    const animalImage = animalImages[amoeba.level];
    
    if (animalImage && animalImage.complete) {
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
      ctx.drawImage(animalImage, x, y, size, size);
      
      ctx.restore(); // Remove o clipping path
      
      // Adicionar borda decorativa sutil
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.4)'; // Cor marrom suave
      ctx.lineWidth = 1.5;
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
      ctx.stroke();
      
    } else {
      // Fallback: desenhar com bordas arredondadas mesmo no fallback
      ctx.save();
      
      // Criar clipping path para o fallback também
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
      ctx.clip();
      
      // Desenhar o animal colorido
      ctx.fillStyle = getColor(amoeba.level);
      ctx.fillRect(x, y, size, size);
      
      ctx.restore();
      
      // Borda do fallback
      ctx.strokeStyle = "#8B4513"; // Marrom mais escuro
      ctx.lineWidth = 2;
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
      ctx.stroke();
    }

    // Texto do nível (sobreposto à imagem)
    ctx.fillStyle = "white";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeText(`Lv ${amoeba.level}`, amoeba.x + amoeba.size / 2, amoeba.y + amoeba.size / 2 + 5);
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
    const barWidth = 200;
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

// ======== LOOP DO JOGO ========
let lastTime = 0;
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    updateAmoebas(deltaTime);
    updateMoneyAnimations();
    drawBackground();
    drawAmoebas();
    drawMoneyAnimations();
    drawSpawnBar();

    requestAnimationFrame(gameLoop);
}

// ======== INICIALIZAÇÃO ========
bg.onload = () => {
    loadGame();
     loadAnimalImages(); // Adicione esta linha
    requestAnimationFrame(gameLoop);
};

window.addEventListener("beforeunload", saveGame);

// Carregar discovered levels do terrestre
discoveredLevels = new Set(JSON.parse(localStorage.getItem("discoveredTerrestre")) || [1]);

// ======== VERIFICAÇÃO DO NOVO NÍVEL CÉU ========
function checkNewLevelCeu() {
  const hasLevel20 = amoebas.some(a => a.level >= 20); // ✅ MUDAR PARA 20
  const ceuBtn = document.getElementById("newlevelbtn");
  
  console.log("Verificando nível céu:", { 
      hasLevel20, 
      amoebas: amoebas.map(a => a.level) 
  });
  
  if (hasLevel20) {
      ceuBtn.classList.remove("hidden");
      ceuBtn.style.display = "block";
      ceuBtn.onclick = function() { window.location.href = 'ceu.html'; };
      localStorage.setItem("nivel_ceu_desbloqueado", "true");
      console.log("✅ Botão do céu liberado!");
  }
}

// Modifique a função mergeAmoebas no terrestre.js:
function mergeAmoebas(a, b) {
    const newLevel = a.level + 1;
    
    // Limitar o nível máximo a 20
    if (newLevel > 20) {
        console.log("🎯 Nível máximo do terrestre alcançado!");
        return;
    }
    
    const newAmoeba = {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        size: 60,
        level: newLevel,
        dragging: false,
        dx: (Math.random() * 2 - 1) * 1.5,
        dy: (Math.random() * 2 - 1) * 1.5,
        animScale: 1.5
    };

    amoebas = amoebas.filter(x => x !== a && x !== b);
    amoebas.push(newAmoeba);

    if (!discoveredLevels.has(newLevel)) {
        discoveredLevels.add(newLevel);
        showInfoPopup(newLevel);
        saveDiscovered();
    }
    
    // ✅ VERIFICAR SE DESBLOQUEOU CÉU APÓS FUSÃO
    checkNewLevelCeu();
    saveGame();
}

// Modifique a função spawnAmoeba no terrestre.js:
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

// Modifique o game loop no terrestre.js:
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    updateAmoebas(deltaTime);
    updateMoneyAnimations();
    
    // ✅ ADICIONAR VERIFICAÇÃO DO NOVO NÍVEL CÉU
    checkNewLevelCeu();
    
    drawBackground();
    drawAmoebas();
    drawMoneyAnimations();
    drawSpawnBar();

    requestAnimationFrame(gameLoop);
}

// E adicione esta verificação no loadGame do terrestre.js:
function loadGame() {
    const saved = localStorage.getItem("gameState_terrestre");
    if (!saved) {
        resetGame();
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
    
    // ✅ VERIFICAR SE JÁ TEM NÍVEL 20 AO CARREGAR O JOGO
    setTimeout(() => {
        checkNewLevelCeu();
    }, 1000);
}

// ======== SISTEMA DE TOUCH PARA MOBILE ========
let touchStartX = 0;
let touchStartY = 0;
let isTouching = false;

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

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// ======== FUNÇÃO AUXILIAR PARA ATUALIZAÇÃO DE CORES ========
// Função para forçar atualização de cores (usada pelo sistema de skins)
function forceUpdateColors() {
  console.log("🎨 Forçando atualização de cores dos animais terrestres...");
  // Esta função será chamada quando uma skin for equipada
  // O game loop vai atualizar automaticamente na próxima frame
}