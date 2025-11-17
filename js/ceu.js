// ceu.js - Código específico para o nível do céu
// ======== SISTEMA DE IMAGENS PARA AVES ========
// Cache para imagens carregadas
const aveImages = {};
let imagesLoaded = 0;
const totalImages = 20;

// Função para carregar todas as imagens de aves
function loadAveImages() {
  for (let i = 1; i <= totalImages; i++) {
    const img = new Image();
    img.onload = () => {
      imagesLoaded++;
      console.log(`Imagem da ave ${i} carregada`);
    };
    img.onerror = () => {
      console.error(`Erro ao carregar imagem da ave ${i}`);
      imagesLoaded++;
    };
    img.src = `assets/images/ave${i}.jpg`;
    aveImages[i] = img;
  }
}

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

// Fundo do céu
const bg = new Image();
// Detectar se é mobile e carregar versão mobile do fundo
let lastMobileState = window.innerWidth <= 768;
bg.src = lastMobileState ? "assets/images/fundo-ceu_mobile.png" : "assets/images/fundo-ceu.jpg";

// Função para atualizar fundo quando necessário
function updateBackground() {
  const currentMobileState = window.innerWidth <= 768;
  if (currentMobileState !== lastMobileState) {
    const newSrc = currentMobileState ? "assets/images/fundo-ceu_mobile.png" : "assets/images/fundo-ceu.jpg";
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

// ======== INFORMAÇÕES DAS AVES ========
const CEU_INFO = {
  1: { 
    name: "Beija-flor-abelha", 
    img: "assets/images/ave1.jpg", 
    date: "📅 Descoberta: 1844",
    habitat: "🏝️ Habitat: Cuba", 
    desc: "Menor ave do mundo - 2g. Idade: 1 milhão de anos" 
  },
  2: { 
    name: "Andorinhão-preto", 
    img: "assets/images/ave2.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌍 Habitat: Europa/Ásia", 
    desc: "Mestre do voo - come/dorme voando. Idade: 50 milhões de anos" 
  },
  3: { 
    name: "Beija-flor-cauda-de-andorinha", 
    img: "assets/images/ave3.jpg", 
    date: "📅 Descoberta: 1846",
    habitat: "🏔️ Habitat: Andes", 
    desc: "Cauda extravagante - voo acrobático. Idade: 5 milhões de anos" 
  },
  4: { 
    name: "Pica-pau-anão", 
    img: "assets/images/ave4.jpg", 
    date: "📅 Descoberta: 1821",
    habitat: "🌳 Habitat: América do Sul", 
    desc: "Menor pica-pau - tamborilador. Idade: 10 milhões de anos" 
  },
  5: { 
    name: "Corvo-da-nova-caledônia", 
    img: "assets/images/ave5.jpg", 
    date: "📅 Descoberta: 1788", 
    habitat: "🏝️ Habitat: Nova Caledônia",
    desc: "Ave mais inteligente - fabrica ferramentas. Idade: 2 milhões de anos" 
  },
  6: { 
    name: "Arara-azul", 
    img: "assets/images/ave6.jpg", 
    date: "📅 Descoberta: 1790",
    habitat: "🌳 Habitat: América do Sul", 
    desc: "Maior papagaio - ameaçada. Idade: 5 milhões de anos" 
  },
  7: { 
    name: "Falcão-peregrino", 
    img: "assets/images/ave7.jpg", 
    date: "📅 Descoberta: 1771",
    habitat: "🌍 Habitat: Mundial", 
    desc: "Animal mais rápido - 389 km/h. Idade: 8 milhões de anos" 
  },
  8: { 
    name: "Coruja-das-neves", 
    img: "assets/images/ave8.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "❄️ Habitat: Ártico", 
    desc: "Caçadora do Ártico - branca. Idade: 3 milhões de anos" 
  },
  9: { 
    name: "Águia-real", 
    img: "assets/images/ave9.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌍 Habitat: Hemisfério Norte", 
    desc: "Predador de topo - visão aguçada. Idade: 2 milhões de anos" 
  },
  10: { 
    name: "Condor-californiano", 
    img: "assets/images/ave10.jpg", 
    date: "📅 Descoberta: 1797",
    habitat: "🏜️ Habitat: Califórnia", 
    desc: "Maior ave da América - ameaçado. Idade: 10 milhões de anos" 
  },
  11: { 
    name: "Cegonha-branca", 
    img: "assets/images/ave11.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌍 Habitat: Europa/Ásia/África", 
    desc: "Migratória - símbolo de bebês. Idade: 15 milhões de anos" 
  },
  12: { 
    name: "Pelicano", 
    img: "assets/images/ave12.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌊 Habitat: Mundial", 
    desc: "Bolsão no bico - pescador. Idade: 30 milhões de anos" 
  },
  13: { 
    name: "Albatroz-errante", 
    img: "assets/images/ave13.jpg", 
    date: "📅 Descoberta: 1789",
    habitat: "🌊 Habitat: Oceanos Austrais", 
    desc: "Maior envergadura - 3.5m. Idade: 20 milhões de anos" 
  },
  14: { 
    name: "Pinguim-imperador", 
    img: "assets/images/ave14.jpg", 
    date: "📅 Descoberta: 1844",
    habitat: "❄️ Habitat: Antártida", 
    desc: "Maior pinguim - superpai polar. Idade: 40 milhões de anos" 
  },
  15: { 
    name: "Avestruz", 
    img: "assets/images/ave15.jpg", 
    date: "📅 Descoberta: 1758", 
    habitat: "🌍 Habitat: África",
    desc: "Maior ave - corre 70km/h. Idade: 25 milhões de anos" 
  },
  16: { 
    name: "Ema", 
    img: "assets/images/ave16.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌍 Habitat: América do Sul", 
    desc: "Maior ave das Américas - corredora. Idade: 15 milhões de anos" 
  },
  17: { 
    name: "Casuar", 
    img: "assets/images/ave17.jpg", 
    date: "📅 Descoberta: 1790",
    habitat: "🌴 Habitat: Nova Guiné/Austrália", 
    desc: "Ave mais perigosa - garras afiadas. Idade: 10 milhões de anos" 
  },
  18: { 
    name: "Kiwi", 
    img: "assets/images/ave18.jpg", 
    date: "📅 Descoberta: 1813",
    habitat: "🏝️ Habitat: Nova Zelândia", 
    desc: "Ave noturna - nariz no bico. Idade: 8 milhões de anos" 
  },
  19: { 
    name: "Kakapo", 
    img: "assets/images/ave19.jpg", 
    date: "📅 Descoberta: 1845",
    habitat: "🏝️ Habitat: Nova Zelândia", 
    desc: "Papagaio noturno - não voa. Idade: 5 milhões de anos" 
  },
  20: { 
    name: "Dodô", 
    img: "assets/images/ave20.jpg", 
    date: "📅 Descoberta: 1598",
    habitat: "🏝️ Habitat: Maurício (extinto)", 
    desc: "Extinto - símbolo da extinção. Idade: 4 milhões de anos" 
  }
};

// ======== VARIÁVEIS DO JOGO ========
let discoveredLevels = new Set([1]);
let amoebas = [
    { x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 1.5, dy: 1.2, animScale: 1 }
];
let coins = 0;
let selectedAmoeba = null;
let moneyAnimations = [];
let spawnTimer = 0;
let spawnInterval = 12000; // Mais rápido que os outros níveis
let amoebaPrices = {};

let upgrades = {
    moreCoins: { name: "Mais moedas por ave", level: 0, max: 20, baseCost: 200, effect: 3 },
    fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 10, baseCost: 300, effect: 0.8 },
    higherStart: { name: "Aves começam mais fortes", level: 0, max: 10, baseCost: 500, effect: 0 },
    ima: { name: "Ímã mágico", level: 0, max: 6, baseCost: 3000, effect: 3 }
};

// ======== SISTEMA DE SAVE/LOAD PARA CÉU ========
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
    localStorage.setItem("gameState_ceu", JSON.stringify(state));
}

function loadGame() {
    const saved = localStorage.getItem("gameState_ceu");
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
    spawnInterval = state.spawnInterval || 12000;

    document.getElementById("coins").innerText = `💰 ${coins}`;

    const coinElement = document.getElementById("coins");
    coinElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    coinElement.style.fontWeight = '800';
    coinElement.style.fontSize = '20px';
      
    coinElement.style.color = '#000000ff';
    coinElement.style.letterSpacing = '0.5px';
}

function resetGame() {
    amoebas = [
        { x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 1.5, dy: 1.2, animScale: 1 }
    ];
    coins = 0;
    amoebaPrices = {};
    discoveredLevels = new Set([1]);
    spawnTimer = 0;
    spawnInterval = 12000;
    
    upgrades = {
        moreCoins: { name: "Mais moedas por ave", level: 0, max: 20, baseCost: 200, effect: 3 },
        fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 10, baseCost: 300, effect: 0.8 },
        higherStart: { name: "Aves começam mais fortes", level: 0, max: 10, baseCost: 500, effect: 0 },
        ima: { name: "Ímã mágico", level: 0, max: 6, baseCost: 3000, effect: 3 }
    };
    
    document.getElementById("coins").innerText = `💰 ${coins}`;
}

// ======== SISTEMA DE DESCOBERTAS PARA CÉU ========
function saveDiscovered() {
    localStorage.setItem("discoveredCeu", JSON.stringify([...discoveredLevels]));
    
    const discoveries = JSON.parse(localStorage.getItem("ceuDiscoveries")) || {};
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    discoveredLevels.forEach(level => {
        if (!discoveries[level]) {
            discoveries[level] = {
                date: currentDate,
                level: level,
                name: CEU_INFO[level]?.name || `Ave Nível ${level}`
            };
        }
    });
    
    localStorage.setItem("ceuDiscoveries", JSON.stringify(discoveries));
}

// ======== POPUPS ========
function showInfoPopup(level) {
    const info = CEU_INFO[level] || {
        name: `Ave Nível ${level}`, 
        img: "assets/images/ave1.jpg", 
        date: `📅 Descoberta: ${1750 + level * 15}`,
        habitat: "☁️ Habitat: Céu e atmosfera", 
        desc: `Ave nível ${level}: espécie aérea em estudo.`
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
    showPopup("upgrade-popup");
    renderUpgradeList();
});

document.getElementById("closeUpgrade").addEventListener("click", () => {
    hideAllPopups();
    saveGame();
});

document.getElementById("libraryBtn").addEventListener("click", () => {
    saveGame();
    window.location.href = "library-ceu.html";
});

document.getElementById("buyAmoebaBtn").addEventListener("click", () => {
    showPopup("buy-popup");
    renderBuyList();
});

document.getElementById("closeBuy").addEventListener("click", () => {
    hideAllPopups();
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

        if (type === "moreCoins") u.effect = 3 + u.level;
        if (type === "fasterSpawn") spawnInterval = 12000 * Math.pow(0.8, u.level);
        if (type === "higherStart") u.effect = u.level;
        if (type === "ima") u.effect = 7 - u.level;

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

// ======== RENDER COMPRAR AVES ========
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

        const coinElement = document.getElementById("coins");
        coinElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        coinElement.style.fontWeight = '800';
        coinElement.style.fontSize = '20px';
        
        coinElement.style.color = '#000000ff';
        coinElement.style.letterSpacing = '0.5px';

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

function getBirdColor(level) {
    console.log("🦅 Procurando skin para ave nível", level);
    console.log("Skins equipadas:", equippedSkin);
    
    // Verificar se há skin equipada para céu
    if (equippedSkin.ceu) {
        console.log("✅ Skin equipada encontrada:", equippedSkin.ceu);
        
        // Procurar a skin equipada em todos os níveis do inventário
        for (let lvl in inventory.ceu) {
            const skinsNoNivel = inventory.ceu[lvl];
            console.log(`📦 Nível ${lvl} tem ${skinsNoNivel.length} skins`);
            
            const skinEncontrada = skinsNoNivel.find(skin => skin.id === equippedSkin.ceu);
            if (skinEncontrada) {
                console.log("🎨 Aplicando skin:", skinEncontrada.name, "cor:", skinEncontrada.color);
                return skinEncontrada.color;
            }
        }
        console.log("❌ Skin equipada não encontrada no inventário");
    } else {
        console.log("❌ Nenhuma skin equipada para céu");
    }
    
    // Cores padrão se não houver skin equipada - tons de céu e aves
    const colors = [
        "#87CEEB", "#FF6B6B", "#4ECDC4", "#FFD700", "#98FB98",
        "#DDA0DD", "#FFA500", "#40E0D0", "#FF69B4", "#00CED1",
        "#BA55D3", "#20B2AA", "#FF4500", "#00BFFF", "#FF1493"
    ];
    const corPadrao = colors[(level - 1) % colors.length];
    console.log("🎯 Usando cor padrão:", corPadrao);
    return corPadrao;
}

function forceUpdateBirdColors() {
    console.log("🔄 Forçando atualização de cores das aves");
    drawBackground();
    drawAmoebas();
    drawMoneyAnimations();
    drawSpawnBar();
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

            // Movimento mais dinâmico para aves
            if (Math.random() < 0.02) {
                amoeba.dx = (Math.random() * 2 - 1) * 2;
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
    const borderRadius = 20; // Valor maior para bordas mais arredondadas (aves)

    // Verificar se a imagem para este nível está carregada
    const aveImage = aveImages[amoeba.level];
    
    if (aveImage && aveImage.complete) {
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
      ctx.drawImage(aveImage, x, y, size, size);
      
      ctx.restore(); // Remove o clipping path
      
      // Adicionar borda decorativa com cor de céu
      ctx.strokeStyle = 'rgba(135, 206, 235, 0.5)'; // Azul céu suave
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
      
      // Desenhar a ave colorida
      ctx.fillStyle = getBirdColor(amoeba.level);
      ctx.fillRect(x, y, size, size);
      
      ctx.restore();
      
      // Borda do fallback
      ctx.strokeStyle = "#1E90FF"; // Azul dodger
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

    ctx.fillStyle = "cyan";
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
     loadAveImages(); // Adicione esta linha
    requestAnimationFrame(gameLoop);
};

window.addEventListener("beforeunload", saveGame);

// Carregar discovered levels do céu
discoveredLevels = new Set(JSON.parse(localStorage.getItem("discoveredCeu")) || [1]);

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
  console.log("🎨 Forçando atualização de cores das aves...");
  // Esta função será chamada quando uma skin for equipada
  // O game loop vai atualizar automaticamente na próxima frame
  forceUpdateBirdColors();
}