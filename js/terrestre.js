// terrestre.js - Código específico para o nível terrestre
// ======== SISTEMA MELHORADO DE POPUPS ========
function showPopup(popupId) {
  // Esconder todos os popups primeiro
  hideAllPopups();
  
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = "block";
    popup.classList.remove("hidden");
    
    // Adicionar fundo escuro
    const background = document.createElement('div');
    background.className = 'popup-background active';
    background.id = 'popup-background';
    background.onclick = hideAllPopups;
    document.body.appendChild(background);
  }
}

function hideAllPopups() {
  // Esconder todos os popups
  const popups = document.querySelectorAll('[id$="-popup"]');
  popups.forEach(popup => {
    popup.style.display = "none";
    popup.classList.add("hidden");
  });
  
  // Remover fundo escuro
  const background = document.getElementById('popup-background');
  if (background) {
    background.remove();
  }
}

// Fechar popup com ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    hideAllPopups();
  }
});

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Fundo terrestre
const bg = new Image();
bg.src = "assets/images/fundo-terrestre.jpg";

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

// ======== SISTEMA COMPARTILHADO DE SKINS E LOOTBOXES ========

// Usar o mesmo sistema compartilhado
let inventory = JSON.parse(localStorage.getItem("skinInventory")) || {
  amoebas: {},
  peixes: {},
  terrestre: {}
};

let equippedSkin = JSON.parse(localStorage.getItem("equippedSkin")) || {
  amoebas: null,
  peixes: null,
  terrestre: null
};

// Skins específicas para terrestre
const TERRESTRE_SKINS = {
  1: [
    { id: 'terrestre_1_1', name: 'Animal Marrom Básico', rarity: 'common', color: '#8B4513' },
    { id: 'terrestre_1_2', name: 'Animal Cinza Básico', rarity: 'common', color: '#808080' },
    { id: 'terrestre_1_3', name: 'Animal Dourado', rarity: 'rare', color: '#FFD700' },
    { id: 'terrestre_1_4', name: 'Animal Prateado', rarity: 'epic', color: '#C0C0C0' },
    { id: 'terrestre_1_5', name: 'Animal Místico', rarity: 'legendary', color: 'linear-gradient(45deg, #654ea3, #eaafc8)' }
  ],
  2: [
    { id: 'terrestre_2_1', name: 'Animal Verde Floresta', rarity: 'common', color: '#228B22' },
    { id: 'terrestre_2_2', name: 'Animal Laranja Terra', rarity: 'common', color: '#D2691E' },
    { id: 'terrestre_2_3', name: 'Animal Bronze', rarity: 'rare', color: '#CD7F32' },
    { id: 'terrestre_2_4', name: 'Animal Esmeralda', rarity: 'epic', color: '#50C878' },
    { id: 'terrestre_2_5', name: 'Animal Celestial', rarity: 'legendary', color: 'linear-gradient(45deg, #ff7e5f, #feb47b)' }
  ],
  3: [
    { id: 'terrestre_3_1', name: 'Animal Vermelho Rubi', rarity: 'common', color: '#DC143C' },
    { id: 'terrestre_3_2', name: 'Animal Azul Profundo', rarity: 'common', color: '#000080' },
    { id: 'terrestre_3_3', name: 'Animal Ametista', rarity: 'rare', color: '#9966CC' },
    { id: 'terrestre_3_4', name: 'Animal Topázio', rarity: 'epic', color: '#FFC87C' },
    { id: 'terrestre_3_5', name: 'Animal Vulcânico', rarity: 'legendary', color: 'linear-gradient(45deg, #c33764, #1d2671)' }
  ],
  4: [
    { id: 'terrestre_4_1', name: 'Animal Preto Ébano', rarity: 'common', color: '#2F4F4F' },
    { id: 'terrestre_4_2', name: 'Animal Branco Neve', rarity: 'common', color: '#FFFAFA' },
    { id: 'terrestre_4_3', name: 'Animal Platina', rarity: 'rare', color: '#E5E4E2' },
    { id: 'terrestre_4_4', name: 'Animal Safira', rarity: 'epic', color: '#0F52BA' },
    { id: 'terrestre_4_5', name: 'Animal Arco-íris', rarity: 'legendary', color: 'linear-gradient(45deg, #FF0000, #FFA500, #FFFF00, #008000, #0000FF, #4B0082, #EE82EE)' }
  ],
  5: [
    { id: 'terrestre_5_1', name: 'Animal Camuflagem', rarity: 'common', color: '#556B2F' },
    { id: 'terrestre_5_2', name: 'Animal Deserto', rarity: 'common', color: '#F4A460' },
    { id: 'terrestre_5_3', name: 'Animal Ouro Rosa', rarity: 'rare', color: '#E6BE8A' },
    { id: 'terrestre_5_4', name: 'Animal Diamante Negro', rarity: 'epic', color: '#0A0A0A' },
    { id: 'terrestre_5_5', name: 'Animal Lendário', rarity: 'legendary', color: 'linear-gradient(45deg, #00c6ff, #0072ff)' }
  ]
};

// Preços das lootboxes
const LOOTBOX_PRICES = {
  common: 500,
  rare: 5000,
  epic: 50000
};

// Probabilidades para cada tipo de caixa
const LOOTBOX_PROBABILITIES = {
  common: {
    common: 0.60,  // 60% chance de skin comum
    rare: 0.30,    // 30% chance de skin rara
    epic: 0.10     // 10% chance de skin épica
  },
  rare: {
    common: 0.30,  // 30% chance de skin comum
    rare: 0.50,    // 50% chance de skin rara
    epic: 0.20     // 20% chance de skin épica
  },
  epic: {
    common: 0.10,  // 10% chance de skin comum
    rare: 0.30,    // 30% chance de skin rara
    epic: 0.60     // 60% chance de skin épica
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

// ======== FUNÇÕES DO SISTEMA DE LOOTBOX PARA TERRESTRE ========

function buyLootbox(lootboxType) {
  const price = LOOTBOX_PRICES[lootboxType];
  
  if (coins >= price) {
    coins -= price;
    document.getElementById("coins").innerText = `💰 ${coins}`;
    
    const skin = openLootbox(lootboxType);
    addToInventory(skin);
    showRewardPopup(skin);
    
    saveGame();
  } else {
    alert("Moedas insuficientes!");
  }
}

function openLootbox(lootboxType) {
  const probabilities = LOOTBOX_PROBABILITIES[lootboxType];
  const random = Math.random();
  
  let selectedRarity;
  
  if (random < probabilities.common) {
    selectedRarity = 'common';
  } else if (random < probabilities.common + probabilities.rare) {
    selectedRarity = 'rare';
  } else {
    selectedRarity = 'epic';
  }
  
  const categories = ['amoebas', 'peixes', 'terrestre'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
  const availableSkins = [];
  
  if (randomCategory === 'terrestre') {
    for (let level in TERRESTRE_SKINS) {
      TERRESTRE_SKINS[level].forEach(skin => {
        if (skin.rarity === selectedRarity) {
          availableSkins.push({
            ...skin,
            category: randomCategory,
            level: parseInt(level)
          });
        }
      });
    }
  } else {
    const allSkins = JSON.parse(localStorage.getItem("allSkins")) || {};
    if (allSkins[randomCategory]) {
      for (let level in allSkins[randomCategory]) {
        allSkins[randomCategory][level].forEach(skin => {
          if (skin.rarity === selectedRarity) {
            availableSkins.push({
              ...skin,
              category: randomCategory,
              level: parseInt(level)
            });
          }
        });
      }
    }
  }
  
  if (availableSkins.length > 0) {
    return availableSkins[Math.floor(Math.random() * availableSkins.length)];
  } else {
    const fallbackSkins = [];
    for (let level in TERRESTRE_SKINS) {
      fallbackSkins.push({
        ...TERRESTRE_SKINS[level][0],
        category: 'terrestre',
        level: parseInt(level)
      });
    }
    return fallbackSkins[Math.floor(Math.random() * fallbackSkins.length)];
  }
}

function addToInventory(skin) {
  if (!inventory[skin.category][skin.level]) {
    inventory[skin.category][skin.level] = [];
  }
  
  const skinExists = inventory[skin.category][skin.level].some(s => s.id === skin.id);
  
  if (!skinExists) {
    inventory[skin.category][skin.level].push(skin);
    localStorage.setItem("skinInventory", JSON.stringify(inventory));
    return true;
  } else {
    return false;
  }
}

function showRewardPopup(skin) {
  const isNewSkin = addToInventory(skin);
  
  const rewardItem = document.getElementById("reward-item");
  rewardItem.innerHTML = `
    <div class="skin-reward ${skin.rarity}">
      <div class="skin-preview" style="background: ${skin.color}"></div>
      <h3>${skin.name}</h3>
      <p class="rarity ${skin.rarity}">${getRarityName(skin.rarity)}</p>
      <p><strong>Categoria:</strong> ${getCategoryName(skin.category)}</p>
      <p><strong>Nível:</strong> ${skin.level}</p>
      ${isNewSkin ? '<p class="new-skin">✨ Nova Skin Desbloqueada!</p>' : '<p class="duplicate">🔄 Skin Duplicada + 💰 100</p>'}
    </div>
  `;
  
  // Se for skin duplicada, dar recompensa em moedas
  if (!isNewSkin) {
    coins += 100;
    document.getElementById("coins").innerText = `💰 ${coins}`;
    saveGame();
  }
  
  showPopup("reward-popup");
}

function equipSkin(skinId, category) {
  equippedSkin[category] = skinId;
  localStorage.setItem("equippedSkin", JSON.stringify(equippedSkin));
  renderInventory();
}

function unequipSkin(category) {
  equippedSkin[category] = null;
  localStorage.setItem("equippedSkin", JSON.stringify(equippedSkin));
  renderInventory();
}

function renderInventory(tab = 'terrestre') {
  const container = document.getElementById("inventory-content");
  container.innerHTML = '';
  
  if (!inventory[tab] || Object.keys(inventory[tab]).length === 0) {
    container.innerHTML = '<p class="no-skins">Nenhuma skin desbloqueada ainda!</p>';
    return;
  }
  
  for (let level in inventory[tab]) {
    const levelSkins = inventory[tab][level];
    const levelSection = document.createElement('div');
    levelSection.className = 'level-section';
    levelSection.innerHTML = `<h4>Nível ${level}</h4>`;
    
    const skinsGrid = document.createElement('div');
    skinsGrid.className = 'skins-grid';
    
    levelSkins.forEach(skin => {
      const isEquipped = equippedSkin[tab] === skin.id;
      const skinElement = document.createElement('div');
      skinElement.className = `skin-item ${skin.rarity} ${isEquipped ? 'equipped' : ''}`;
      skinElement.innerHTML = `
        <div class="skin-preview" style="background: ${skin.color}"></div>
        <h5>${skin.name}</h5>
        <p class="rarity">${getRarityName(skin.rarity)}</p>
        ${isEquipped ? 
          `<button class="unequip-btn" onclick="unequipSkin('${tab}')">Desequipar</button>` :
          `<button class="equip-btn" onclick="equipSkin('${skin.id}', '${tab}')">Equipar</button>`
        }
      `;
      skinsGrid.appendChild(skinElement);
    });
    
    levelSection.appendChild(skinsGrid);
    container.appendChild(levelSection);
  }
}

function getRarityName(rarity) {
  const names = {
    common: 'Comum',
    rare: 'Rara',
    epic: 'Épica',
    legendary: 'Lendária'
  };
  return names[rarity] || rarity;
}

function getCategoryName(category) {
  const names = {
    amoebas: 'Amoebas',
    peixes: 'Peixes',
    terrestre: 'Terrestre'
  };
  return names[category] || category;
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

// ======== EVENT LISTENERS PARA LOOTBOXES ========

// ======== EVENT LISTENERS CORRIGIDOS ========

// Botão da Loja
document.getElementById("shopBtn").addEventListener("click", () => {
  showPopup("shop-popup");
});

// Botão do Inventário
document.getElementById("inventoryBtn").addEventListener("click", () => {
  showPopup("inventory-popup");
  renderInventory();
});

// Botões de fechar
document.getElementById("closeShop").addEventListener("click", hideAllPopups);
document.getElementById("closeInventory").addEventListener("click", hideAllPopups);
document.getElementById("closeReward").addEventListener("click", hideAllPopups);
document.getElementById("closeUpgrade").addEventListener("click", hideAllPopups);
document.getElementById("closeBuy").addEventListener("click", hideAllPopups);
document.getElementById("closeInfo").addEventListener("click", hideAllPopups);

// Botões de lootbox
document.querySelectorAll(".buy-lootbox").forEach(button => {
  button.addEventListener("click", (e) => {
    const lootboxType = e.target.dataset.type;
    buyLootbox(lootboxType);
  });
});

// Tabs do Inventário
document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", (e) => {
    document.querySelectorAll(".tab-button").forEach(btn => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    const tab = e.target.dataset.tab;
    renderInventory(tab);
  });
});

document.getElementById("closeReward").addEventListener("click", () => {
  document.getElementById("reward-popup").style.display = "none";
  document.getElementById("reward-popup").classList.add("hidden");
});

// ======== SISTEMA DE COMPRA ========
function buyAmoeba(level = 1) {
    const cost = amoebaPrices[level] || (100 * level);
    if (coins >= cost) {
        coins -= cost;
        spawnAmoeba(level);
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

    for (let level = 1; level <= 5; level++) {
        const cost = amoebaPrices[level] || (100 * level);

        const item = document.createElement("div");
        item.className = "buy-item";
        item.innerHTML = `
            <strong>Animal Nível ${level}</strong> <br>
            Custo: 💰 ${cost} <br>
            <button>Comprar</button>
        `;

        item.querySelector("button").addEventListener("click", () => {
            buyAmoeba(level);
            renderBuyList();
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
    drawBackground();
    drawAmoebas();
    drawMoneyAnimations();
    drawSpawnBar();

    requestAnimationFrame(gameLoop);
}

// ======== INICIALIZAÇÃO ========
bg.onload = () => {
    loadGame();
    requestAnimationFrame(gameLoop);
};

window.addEventListener("beforeunload", saveGame);

// Carregar discovered levels do terrestre
discoveredLevels = new Set(JSON.parse(localStorage.getItem("discoveredTerrestre")) || [1]);

// ======== VERIFICAÇÃO DO NOVO NÍVEL CÉU ========
function checkNewLevelCeu() {
    const hasLevel15 = amoebas.some(a => a.level >= 15);
    const ceuBtn = document.getElementById("newlevelbtn");
    
    console.log("Verificando nível céu:", { 
        hasLevel15, 
        amoebas: amoebas.map(a => a.level) 
    });
    
    if (hasLevel15) {
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
    
    // Limitar o nível máximo a 15
    if (newLevel > 15) {
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
    
    // ✅ VERIFICAR SE DESBLOQUEOU CÉU APÓS SPAWN
    checkNewLevelCeu();
    saveGame();
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
    
    // ✅ VERIFICAR SE JÁ TEM NÍVEL 15 AO CARREGAR O JOGO
    setTimeout(() => {
        checkNewLevelCeu();
    }, 1000);
}