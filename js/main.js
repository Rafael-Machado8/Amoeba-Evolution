const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Fundo
const bg = new Image();
bg.src = "assets/images/fundo1.jpg";

// ======== POPUP EDUCATIVO ========
const AMOEBA_INFO = {
  1: { name: "Ameba Inicial", img: "assets/images/amoeba.jpg", date: "📅 Descoberta: 1801", habitat: "🌍 Habitat: Lagos e rios de água doce", desc: "Amoeba nível 1: organismo simples, base para entender a evolução." },
  2: { name: "Ameba Evoluída", img: "assets/images/amoeba.jpg", date: "📅 Descoberta: 1820", habitat: "🌍 Habitat: Poças e lagos rasos", desc: "Amoeba nível 2: melhor mobilidade e captação de alimento." },
  3: { name: "Ameba Superior", img: "assets/images/amoeba.jpg", date: "📅 Descoberta: 1850", habitat: "🌍 Habitat: Água doce e úmida", desc: "Amoeba nível 3: adaptação superior a ambientes variados." },
  4: { name: "Ameba Mestre", img: "assets/images/amoeba.jpg", date: "📅 Descoberta: 1885", habitat: "🌍 Habitat: Sedimentos de lago", desc: "Amoeba nível 4: metabolismo mais eficiente." },
  5: { name: "Ameba Lendária", img: "assets/images/amoeba.jpg", date: "📅 Descoberta: 1910", habitat: "🌍 Habitat: Lagos frios", desc: "Amoeba nível 5: alta resiliência a mudanças térmicas." },
  6: { name: "Ameba Cósmica", img: "assets/images/amoeba.jpg", date: "📅 Descoberta: 1950", habitat: "🌍 Habitat: Riachos e margens", desc: "Amoeba nível 6: comportamento de fusão muito eficiente." }
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
  localStorage.setItem("gameState", JSON.stringify(state));
}

function loadGame() {
  const saved = localStorage.getItem("gameState");
  if (!saved) return;

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

window.addEventListener("beforeunload", saveGame);

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
  const cost = amoebaPrices[level] || (50 * level);
  if (coins >= cost) {
    coins -= cost;
    spawnAmoeba(level);
    amoebaPrices[level] = Math.floor(cost * 1.2); // preço sobe
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

  for (let level = 1; level <= 5; level++) { // até level 5, pode expandir
    const cost = amoebaPrices[level] || (50 * level);

    const item = document.createElement("div");
    item.className = "buy-item";
    item.innerHTML = `
      <strong>Amoeba Nível ${level}</strong> <br>
      Custo: 💰 ${cost} <br>
      <button>Comprar</button>
    `;

    item.querySelector("button").addEventListener("click", () => {
      buyAmoeba(level);
      renderBuyList(); // recarrega lista
    });

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
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

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
    selectedAmoeba.x = e.offsetX - selectedAmoeba.size / 2;
    selectedAmoeba.y = e.offsetY - selectedAmoeba.size / 2;
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
}

// ======== UTILITÁRIOS ========
function isColliding(a, b) {
  const dx = (a.x + a.size / 2) - (b.x + b.size / 2);
  const dy = (a.y + a.size / 2) - (b.y + b.size / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (a.size / 2 + b.size / 2);
}

function getColor(level) {
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
    spawnAmoeba();
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
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

function drawAmoebas() {
  for (let amoeba of amoebas) {
    const scale = amoeba.animScale;
    const radius = (amoeba.size / 2) * scale;

    ctx.fillStyle = getColor(amoeba.level);
    ctx.beginPath();
    ctx.arc(amoeba.x + amoeba.size / 2, amoeba.y + amoeba.size / 2, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Lv ${amoeba.level}`, amoeba.x + amoeba.size / 2, amoeba.y + amoeba.size / 2 + 5);
  }
}

function drawMoneyAnimations() {
  for (let anim of moneyAnimations) {
    ctx.globalAlpha = anim.alpha;
    ctx.fillStyle = "yellow";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
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
    
    // ✅ ADICIONAR VERIFICAÇÃO DO NOVO NÍVEL A CADA FRAME
    checkNewLevelUnlock();
    
    drawBackground();
    drawAmoebas();
    drawMoneyAnimations();
    drawSpawnBar();

    requestAnimationFrame(gameLoop);
}

bg.onload = () => {
  loadGame();
  requestAnimationFrame(gameLoop);
};

// ======== SISTEMA DE SAVE/LOAD POR NÍVEL ========
function getCurrentLevelKey() {
    // Verifica em qual página estamos
    if (window.location.href.includes('peixes.html')) {
        return 'peixes';
    } else {
        return 'amoebas';
    }
}

function saveGame() {
    const levelKey = getCurrentLevelKey();
    const state = {
        amoebas,
        coins,
        upgrades,
        amoebaPrices,
        discoveredLevels: [...discoveredLevels],
        spawnTimer,
        spawnInterval
    };
    localStorage.setItem(`gameState_${levelKey}`, JSON.stringify(state));
}

function loadGame() {
    const levelKey = getCurrentLevelKey();
    const saved = localStorage.getItem(`gameState_${levelKey}`);
    
    // Se não há save para este nível, inicia do zero
    if (!saved) {
        resetGameForCurrentLevel();
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

// ======== RESET PARA CADA NÍVEL ========
function resetGameForCurrentLevel() {
    const levelKey = getCurrentLevelKey();
    
    // Resetar todas as variáveis do jogo
    amoebas = [
        { x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 2, dy: 1, animScale: 1 }
    ];
    
    coins = 0;
    selectedAmoeba = null;
    moneyAnimations = [];
    spawnTimer = 0;
    spawnInterval = 15000;
    amoebaPrices = {};
    discoveredLevels = new Set([1]);
    
    // Upgrades específicos para cada nível
    if (levelKey === 'peixes') {
        upgrades = {
            moreCoins: { name: "Mais moedas por peixe", level: 0, max: 10, baseCost: 50, effect: 1 },
            fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 5, baseCost: 100, effect: 0.9 },
            higherStart: { name: "Peixes começam mais fortes", level: 0, max: 5, baseCost: 200, effect: 0 },
            ima: { name: "Ímã mágico", level: 0, max: 3, baseCost: 1000, effect: 5 }
        };
        // Mudar texto do botão para peixes
        document.getElementById("buyAmoebaBtn").textContent = "➕ Peixe";
    } else {
        upgrades = {
            moreCoins: { name: "Mais moedas por amoeba", level: 0, max: 10, baseCost: 50, effect: 1 },
            fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 5, baseCost: 100, effect: 0.9 },
            higherStart: { name: "Amoebas começam mais fortes", level: 0, max: 5, baseCost: 200, effect: 0 },
            ima: { name: "Ímã mágico", level: 0, max: 3, baseCost: 1000, effect: 5 }
        };
        document.getElementById("buyAmoebaBtn").textContent = "➕ Amoeba";
    }
    
    document.getElementById("coins").innerText = `💰 ${coins}`;
    
    console.log(`Jogo resetado para nível: ${levelKey}`);
}

// ======== VERIFICAÇÃO DE DESBLOQUEIO DO NOVO NÍVEL ========
function checkNewLevelUnlock() {
    // Só verifica no nível das amoebas
    if (getCurrentLevelKey() === 'amoebas') {
        const hasLevel5 = amoebas.some(a => a.level >= 5);
        const newLevelBtn = document.getElementById("newlevelbtn");
        
        if (hasLevel5) {
            newLevelBtn.classList.remove("hidden");
            newLevelBtn.style.display = "block";
        }
    }
}
// ======== VERIFICAÇÃO DO NOVO NÍVEL ========
function checkNewLevelUnlock() {
    const hasLevel5 = amoebas.some(a => a.level >= 5);
    const newLevelBtn = document.getElementById("newlevelbtn");
    
    console.log("Verificando novo nível:", { 
        hasLevel5, 
        amoebas: amoebas.map(a => a.level) 
    });
    
    if (hasLevel5) {
        newLevelBtn.classList.remove("hidden");
        newLevelBtn.style.display = "block";
        console.log("✅ Botão do novo nível liberado!");
    }
}

// ======== MODIFICAR A FUNÇÃO MERGEAMOEBAS ========
function mergeAmoebas(a, b) {
    const newLevel = a.level + 1;
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

// ======== MODIFICAR A FUNÇÃO SPAWNAMOEBA ========
function spawnAmoeba(level = 1) {
    const lvl = level + upgrades.higherStart.effect;
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
    
    // ✅ VERIFICAR SE DESBLOQUEOU NOVO NÍVEL APÓS SPAWN
    checkNewLevelUnlock();
    saveGame();
}



// ======== MODIFICAR O LOADGAME ========
function loadGame() {
    const saved = localStorage.getItem("gameState");
    if (!saved) return;

    const state = JSON.parse(saved);
    amoebas = state.amoebas || amoebas;
    coins = state.coins || 0;
    upgrades = state.upgrades || upgrades;
    amoebaPrices = state.amoebaPrices || {};
    discoveredLevels = new Set(state.discoveredLevels || [1]);
    spawnTimer = state.spawnTimer || 0;
    spawnInterval = state.spawnInterval || 15000;

    document.getElementById("coins").innerText = `💰 ${coins}`;
    
    // ✅ VERIFICAR SE JÁ TEM NÍVEL 5 AO CARREGAR O JOGO
    setTimeout(() => {
        checkNewLevelUnlock();
    }, 1000);
}
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
    
    // Verificar se já tem nível 5 ao carregar
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

// ======== VERIFICAÇÃO DO NOVO NÍVEL ========
function checkNewLevelUnlock() {
    const hasLevel5 = amoebas.some(a => a.level >= 5);
    const newLevelBtn = document.getElementById("newlevelbtn");
    
    if (hasLevel5) {
        newLevelBtn.classList.remove("hidden");
        newLevelBtn.style.display = "block";
        // Salvar que o nível foi desbloqueado
        localStorage.setItem("nivel_peixes_desbloqueado", "true");
    } else {
        newLevelBtn.classList.add("hidden");
        newLevelBtn.style.display = "none";
    }
}