// ======== SISTEMA DE IMAGENS PARA AMEBAS ========
const amoebaImages = {};
let imagesLoaded = 0;
const totalImages = 20;

function loadAmoebaImages() {
  for (let i = 1; i <= totalImages; i++) {
    const img = new Image();
    img.onload = () => {
      imagesLoaded++;
      console.log(`Imagem da ameba ${i} carregada`);
    };
    img.onerror = () => {
      console.error(`Erro ao carregar imagem da ameba ${i}`);
      imagesLoaded++;
      createFallbackAmoeba(i);
    };
    img.src = `assets/images/amoeba${i}.jpg?t=${Date.now()}`;
    amoebaImages[i] = img;
  }
}

function createFallbackAmoeba(level) {
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"];
  const color = colors[(level - 1) % colors.length];
  
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Lv ${level}`, 50, 55);
  
  const img = new Image();
  img.src = canvas.toDataURL();
  amoebaImages[level] = img;
}

// ======== CONFIGURAÇÃO DO CANVAS ========
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

// Sistema de fundo
const bg = new Image();
let bgLoaded = false;

function loadBackground() {
  const isMobile = window.innerWidth <= 768;
  
  bg.onload = function() {
    bgLoaded = true;
    console.log("✅ Fundo carregado com sucesso");
  };
  
  bg.onerror = function() {
    console.error("❌ Erro ao carregar fundo");
    bgLoaded = false;
  };
  
  bg.src = isMobile ? "assets/images/fundo1_mobile.jpg" : "assets/images/fundo1.jpg";
}

function resizeCanvas() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    const container = document.getElementById("game-container");
    const scale = Math.min(container.clientWidth / CANVAS_WIDTH, container.clientHeight / CANVAS_HEIGHT);
    
    canvas.style.width = (CANVAS_WIDTH * scale) + 'px';
    canvas.style.height = (CANVAS_HEIGHT * scale) + 'px';
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }
}

function getCanvasCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  let clientX, clientY;
  if (e.touches) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}

// ======== POPUP EDUCATIVO ========
const AMOEBA_INFO = {
  1: { name: "Amoeba proteus", date: "1755", habitat: "Água doce", desc: "Rainha das amebas - move-se com pseudópodes elegantes. Idade: 1.2 bilhão de anos" },
  2: { name: "Entamoeba histolytica", date: "1875", habitat: "Intestino humano", desc: "Parasita especializado em invasão celular. Idade: 1 bilhão de anos" },
  3: { name: "Naegleria fowleri", date: "1965", habitat: "Águas mornas", desc: "Ameba comedora de cérebro - rara e fatal. Idade: 900 milhões de anos" },
  4: { name: "Acanthamoeba", date: "1930", habitat: "Solo e água", desc: "Causa infecções oculares - muito resistente. Idade: 850 milhões de anos" },
  5: { name: "Difflugia", date: "1816", habitat: "Lagos", desc: "Arquiteta microscópica com casinha de areia. Idade: 800 milhões de anos" },
  6: { name: "Arcella", date: "1832", habitat: "Pântanos", desc: "Vive em cúpula quitinosa - mini castelo. Idade: 750 milhões de anos" },
  7: { name: "Euglypha", date: "1845", habitat: "Musgos úmidos", desc: "Constrói escudos de sílica elaborados. Idade: 700 milhões de anos" },
  8: { name: "Vampyrella", date: "1865", habitat: "Lagos com algas", desc: "Ameba laranja - perfura paredes celulares. Idade: 650 milhões de anos" },
  9: { name: "Gromia", date: "1902", habitat: "Fundos oceânicos", desc: "Ameba gigante - deixa rastros no mar. Idade: 600 milhões de anos" },
  10: { name: "Foraminífero", date: "1826", habitat: "Oceanos", desc: "Constrói esculturas calcárias complexas. Idade: 550 milhões de anos" },
  11: { name: "Radiolária", date: "1834", habitat: "Oceanos tropicais", desc: "Esqueleto de sílica - joia do plâncton. Idade: 500 milhões de anos" },
  12: { name: "Heliozoa", date: "1860", habitat: "Águas com vegetação", desc: "Ameba solar - pseudópodes radiais. Idade: 450 milhões de anos" },
  13: { name: "Chlamydophrys", date: "1879", habitat: "Solos florestais", desc: "Forma colônias complexas - comportamento social. Idade: 400 milhões de anos" },
  14: { name: "Paulinella", date: "1895", habitat: "Águas marinhas", desc: "Roubou cloroplastos independentemente. Idade: 350 milhões de anos" },
  15: { name: "Filamoeba", date: "1912", habitat: "Solos orgânicos", desc: "Forma filamentos ramificados - elo com fungos. Idade: 300 milhões de anos" },
  16: { name: "Vannella", date: "1926", habitat: "Águas marinhas", desc: "Formato de leque - adaptação marinha. Idade: 250 milhões de anos" },
  17: { name: "Cochliopodium", date: "1849", habitat: "Águas doces", desc: "Coberta por escamas orgânicas - armadura flexível. Idade: 200 milhões de anos" },
  18: { name: "Mayorella", date: "1934", habitat: "Lagos e riachos", desc: "Pseudópodes largos - movimento fluido. Idade: 150 milhões de anos" },
  19: { name: "Thecamoeba", date: "1961", habitat: "Solos pobres", desc: "Ectoplasma rígido - dobras características. Idade: 100 milhões de anos" },
  20: { name: "Saccamoeba", date: "1973", habitat: "Águas ricas", desc: "Forma bolsas alimentares - eficiência. Idade: 50 milhões de anos" }
};

// ======== VARIÁVEIS DO JOGO ========
let discoveredLevels = new Set(JSON.parse(localStorage.getItem("discoveredAmoebas")) || [1]);
let amoebas = [{ x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 2, dy: 1, animScale: 1 }];
let coins = 0;
let selectedAmoeba = null;
let moneyAnimations = [];
let spawnTimer = 0;
let spawnInterval = 15000;
let amoebaPrices = {};

let upgrades = {
  moreCoins: { name: "Mais moedas por amoeba", level: 0, max: 10, baseCost: 50, effect: 1 },
  fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 5, baseCost: 100, effect: 0.9 },
  higherStart: { name: "Amoebas começam mais fortes", level: 0, max: 5, baseCost: 200, effect: 0 },
  ima: { name: "Ímã mágico", level: 0, max: 3, baseCost: 1000, effect: 5 }
};

// ======== SISTEMA DE SAVE/LOAD ========
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
}

function resetGameForAmoebas() {
  amoebas = [{ x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 2, dy: 1, animScale: 1 }];
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

// ======== POPUPS ========
function saveDiscovered() {
  localStorage.setItem("discoveredAmoebas", JSON.stringify([...discoveredLevels]));
}

function showInfoPopup(level) {
  const info = AMOEBA_INFO[level] || {
    name: `Ameba Nível ${level}`, 
    date: `${1800 + level}`,
    habitat: "Lagos e rios de água doce", 
    desc: `Ameba nível ${level}: informações ainda em estudo.`
  };

  const popup = document.getElementById("info-popup");
  
  // Atualizar todos os textos
  document.getElementById("info-title").textContent = "🔬 Nova Amoeba Descoberta!";
  document.getElementById("info-name").textContent = info.name;
  document.getElementById("info-date-text").textContent = info.date;
  document.getElementById("info-habitat-text").textContent = info.habitat;
  document.getElementById("info-desc-text").textContent = info.desc;

  // Sistema robusto para carregar a imagem
  const infoImage = document.getElementById("info-image");
  
  // Tentar usar a imagem do cache primeiro
  const cachedImage = amoebaImages[level];
  if (cachedImage && cachedImage.complete && cachedImage.naturalWidth > 0) {
    infoImage.src = cachedImage.src;
    console.log(`✅ Usando imagem cacheada para ameba ${level}`);
  } else {
    // Fallback: tentar carregar diretamente
    const imagePath = `assets/images/amoeba${level}.jpg`;
    infoImage.src = imagePath + `?t=${Date.now()}`; // Cache busting
    
    // Fallback secundário: criar imagem fallback
    infoImage.onerror = function() {
      console.warn(`❌ Imagem não encontrada: ${imagePath}, criando fallback`);
      createPopupFallbackImage(level, infoImage);
    };
    
    console.log(`🔄 Carregando imagem: ${imagePath}`);
  }

  // Forçar exibição do popup
  popup.classList.remove("hidden");
  popup.style.display = "block";
  
  // Adicionar estilos para garantir que a imagem seja visível
  infoImage.style.display = "block";
  infoImage.style.width = "100%";
  infoImage.style.height = "auto";
  infoImage.style.borderRadius = "10px";
  infoImage.style.border = "3px solid #000";
  
  saveGame();
}

// Função para criar imagem fallback no popup
function createPopupFallbackImage(level, imgElement) {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // Fundo gradiente
  const gradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 100);
  gradient.addColorStop(0, '#4ECDC4');
  gradient.addColorStop(1, '#45B7D1');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(100, 100, 80, 0, Math.PI * 2);
  ctx.fill();
  
  // Borda
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.stroke();
  
  // Borda interna
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(100, 100, 78, 0, Math.PI * 2);
  ctx.stroke();
  
  // Ícone de ameba
  ctx.fillStyle = 'white';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🔬', 100, 90);
  
  // Texto do nível
  ctx.fillStyle = 'white';
  ctx.font = 'bold 20px Arial';
  ctx.fillText(`Nível ${level}`, 100, 140);
  
  // Definir a imagem fallback
  imgElement.src = canvas.toDataURL();
}


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

document.getElementById("closeInfo").addEventListener("click", () => {
  document.getElementById("info-popup").style.display = "none";
  document.getElementById("info-popup").classList.add("hidden");
});

// ======== SISTEMA DE COMPRA ========
function buyAmoeba(level = 1) {
  if (!discoveredLevels.has(level)) {
    alert(`Você precisa desbloquear o nível ${level} primeiro!`);
    return;
  }
  
  const basePrice = 50;
  const cost = amoebaPrices[level] || Math.floor(basePrice * Math.pow(1.6, level - 1));
  
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
    if (type === "ima") u.effect = 6 - u.level;

    document.getElementById("coins").innerText = `💰 ${coins}`;
    saveGame();
  } else {
    alert("Moedas insuficientes!");
  }
}

function downgradeUpgrade(type) {
  const u = upgrades[type];
  if (!u || u.level <= 0) return;
  
  u.level--;
  
  if (type === "moreCoins") u.effect = 1 + u.level;
  if (type === "fasterSpawn") spawnInterval = 15000 * Math.pow(0.9, u.level);
  if (type === "higherStart") u.effect = u.level;
  if (type === "ima") u.effect = 6 - u.level;
  
  saveGame();
  renderUpgradeList();
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
      <div style="display: flex; gap: 10px; margin-top: 8px;">
        <button ${u.level >= u.max ? "disabled" : ""}>Comprar</button>
        <button ${u.level <= 0 ? "disabled" : ""} style="background: #ff6b6b;">Diminuir</button>
      </div>
    `;

    item.querySelector("button:nth-child(1)").addEventListener("click", () => {
      buyUpgrade(key);
      renderUpgradeList();
    });

    item.querySelector("button:nth-child(2)").addEventListener("click", () => {
      if (confirm(`Diminuir ${u.name} para nível ${u.level - 1}?`)) {
        downgradeUpgrade(key);
      }
    });

    container.appendChild(item);
  }
}

// ======== RENDER COMPRAR AMOEBAS ========
function renderBuyList() {
  const container = document.getElementById("buy-list");
  container.innerHTML = "";

  for (let level = 1; level <= 20; level++) {
    const basePrice = 50;
    const cost = amoebaPrices[level] || Math.floor(basePrice * Math.pow(1.6, level - 1));
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
    if (mouseX > amoeba.x && mouseX < amoeba.x + amoeba.size &&
        mouseY > amoeba.y && mouseY < amoeba.y + amoeba.size) {
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
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"];
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (bgLoaded && bg.complete && bg.naturalWidth > 0) {
    try {
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
      return;
    } catch (error) {
      console.error("Erro ao desenhar fundo:", error);
    }
  }
  
  // Fallback: fundo gradiente
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(0.5, '#16213e');
  gradient.addColorStop(1, '#0f3460');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('🌊 Mundo das Amebas', canvas.width / 2, 30);
}

function drawAmoebas() {
  for (let amoeba of amoebas) {
    const scale = amoeba.animScale;
    const size = amoeba.size * scale;
    const x = amoeba.x;
    const y = amoeba.y;
    
    const amoebaImage = amoebaImages[amoeba.level];
    
    if (amoebaImage && amoebaImage.complete) {
      // Desenhar a imagem com borda
      ctx.save();
      
      // Criar caminho para borda arredondada
      ctx.beginPath();
      ctx.arc(
        x + size / 2, 
        y + size / 2, 
        size / 2, 
        0, 
        Math.PI * 2
      );
      ctx.closePath();
      ctx.clip(); // Aplicar máscara circular
      
      // Desenhar a imagem
      ctx.drawImage(amoebaImage, x, y, size, size);
      ctx.restore(); // Remover máscara
      
      // Desenhar borda
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(
        x + size / 2, 
        y + size / 2, 
        size / 2, 
        0, 
        Math.PI * 2
      );
      ctx.stroke();
      
      // Desenhar borda interna brilhante
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(
        x + size / 2, 
        y + size / 2, 
        size / 2 - 1, 
        0, 
        Math.PI * 2
      );
      ctx.stroke();
      
    } else {
      // Fallback: círculo colorido com borda
      const centerX = amoeba.x + amoeba.size / 2;
      const centerY = amoeba.y + amoeba.size / 2;
      const radius = (amoeba.size / 2) * scale;
      
      ctx.fillStyle = getColor(amoeba.level);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Borda principal
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Borda interna brilhante
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 1, 0, Math.PI * 2);
      ctx.stroke();
    }

    
    
    ctx.fillStyle = "white";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      `Lv ${amoeba.level}`, 
      amoeba.x + amoeba.size / 2, 
      amoeba.y + amoeba.size / 2 + 15
    );
  }
}

function drawMoneyAnimations() {
  for (let anim of moneyAnimations) {
    ctx.globalAlpha = anim.alpha;
    ctx.font = "700 18px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
    ctx.lineWidth = 3;
    ctx.strokeText(anim.value, anim.x, anim.y);
    ctx.fillStyle = "#FFD700";
    ctx.fillText(anim.value, anim.x, anim.y);
    ctx.globalAlpha = 1;
  }
}

function drawSpawnBar() {
  const barWidth = 120;
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

// ======== VERIFICAÇÃO DO NOVO NÍVEL ========
function checkNewLevelUnlock() {
  const hasLevel20 = amoebas.some(a => a.level >= 20);
  const newLevelBtn = document.getElementById("newlevelbtn");
  
  if (hasLevel20) {
    newLevelBtn.classList.remove("hidden");
    newLevelBtn.style.display = "block";
    localStorage.setItem("nivel_peixes_desbloqueado", "true");
  } else {
    newLevelBtn.classList.add("hidden");
    newLevelBtn.style.display = "none";
  }
}

// ======== TOUCH PARA MOBILE ========
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
      if (mouseX > amoeba.x && mouseX < amoeba.x + amoeba.size &&
          mouseY > amoeba.y && mouseY < amoeba.y + amoeba.size) {
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
          break;
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

// ======== LOOP DO JOGO ========
let lastTime = 0;
function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  updateAmoebas(deltaTime);
  updateMoneyAnimations();
  checkNewLevelUnlock();
  
  drawBackground();
  drawAmoebas();
  drawMoneyAnimations();
  drawSpawnBar();

  requestAnimationFrame(gameLoop);
}

// ======== INICIALIZAÇÃO ========
document.addEventListener('DOMContentLoaded', function() {
  console.log("🚀 Inicializando jogo das amebas...");
  
  resizeCanvas();
  loadBackground();
  loadAmoebaImages();
  loadGame();
  
  requestAnimationFrame(gameLoop);
});

window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    resizeCanvas();
    loadBackground();
  }, 100);
});

window.addEventListener("beforeunload", saveGame);