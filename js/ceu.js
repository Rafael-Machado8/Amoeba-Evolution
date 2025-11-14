// ceu.js - Código específico para o nível do céu
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

// Fundo do céu
const bg = new Image();
bg.src = "assets/images/fundo-ceu.jpg";

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

// ======== SISTEMA COMPARTILHADO DE SKINS E LOOTBOXES ========

// Usar o mesmo sistema compartilhado
let inventory = JSON.parse(localStorage.getItem("skinInventory")) || {
  amoebas: {},
  peixes: {},
  terrestre: {},
  ceu: {}
};

let equippedSkin = JSON.parse(localStorage.getItem("equippedSkin")) || {
  amoebas: null,
  peixes: null,
  terrestre: null,
  ceu: null
};

// Skins específicas para céu
const CEU_SKINS = {
  1: [
    { id: 'ceu_1_1', name: 'Ave Marrom Básica', rarity: 'common', color: '#8B4513' },
    { id: 'ceu_1_2', name: 'Ave Cinza Básica', rarity: 'common', color: '#808080' },
    { id: 'ceu_1_3', name: 'Ave Dourada', rarity: 'rare', color: '#FFD700' },
    { id: 'ceu_1_4', name: 'Ave Prateada', rarity: 'epic', color: '#C0C0C0' },
    { id: 'ceu_1_5', name: 'Ave Celestial', rarity: 'legendary', color: 'linear-gradient(45deg, #87CEEB, #E0F7FA)' }
  ],
  2: [
    { id: 'ceu_2_1', name: 'Ave Azul Céu', rarity: 'common', color: '#87CEEB' },
    { id: 'ceu_2_2', name: 'Ave Verde Pássaro', rarity: 'common', color: '#32CD32' },
    { id: 'ceu_2_3', name: 'Ave Bronze Alada', rarity: 'rare', color: '#CD7F32' },
    { id: 'ceu_2_4', name: 'Ave Topázio', rarity: 'epic', color: '#FFC87C' },
    { id: 'ceu_2_5', name: 'Ave Aurora', rarity: 'legendary', color: 'linear-gradient(45deg, #FF7E5F, #FEB47B)' }
  ],
  3: [
    { id: 'ceu_3_1', name: 'Ave Vermelha Cardinal', rarity: 'common', color: '#DC143C' },
    { id: 'ceu_3_2', name: 'Ave Amarela Canário', rarity: 'common', color: '#FFFF00' },
    { id: 'ceu_3_3', name: 'Ave Ametista', rarity: 'rare', color: '#9966CC' },
    { id: 'ceu_3_4', name: 'Ave Esmeralda Alada', rarity: 'epic', color: '#50C878' },
    { id: 'ceu_3_5', name: 'Ave Crepúsculo', rarity: 'legendary', color: 'linear-gradient(45deg, #654ea3, #eaafc8)' }
  ],
  4: [
    { id: 'ceu_4_1', name: 'Ave Negra Corvo', rarity: 'common', color: '#2F4F4F' },
    { id: 'ceu_4_2', name: 'Ave Branca Neve', rarity: 'common', color: '#FFFAFA' },
    { id: 'ceu_4_3', name: 'Ave Platina', rarity: 'rare', color: '#E5E4E2' },
    { id: 'ceu_4_4', name: 'Ave Safira Azul', rarity: 'epic', color: '#0F52BA' },
    { id: 'ceu_4_5', name: 'Ave Arco-íris', rarity: 'legendary', color: 'linear-gradient(45deg, #FF0000, #FFA500, #FFFF00, #008000, #0000FF, #4B0082, #EE82EE)' }
  ],
  5: [
    { id: 'ceu_5_1', name: 'Ave Laranja Flamejante', rarity: 'common', color: '#FF8C00' },
    { id: 'ceu_5_2', name: 'Ave Roxa Real', rarity: 'common', color: '#9370DB' },
    { id: 'ceu_5_3', name: 'Ave Ouro Rosa', rarity: 'rare', color: '#E6BE8A' },
    { id: 'ceu_5_4', name: 'Ave Diamante Brilhante', rarity: 'epic', color: '#B9F2FF' },
    { id: 'ceu_5_5', name: 'Ave Fênix Lendária', rarity: 'legendary', color: 'linear-gradient(45deg, #FF0000, #FF4500, #FFD700, #FFFF00)' }
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
    common: 0.60,
    rare: 0.30,
    epic: 0.10
  },
  rare: {
    common: 0.30,
    rare: 0.50,
    epic: 0.20
  },
  epic: {
    common: 0.10,
    rare: 0.30,
    epic: 0.60
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

// ======== FUNÇÕES DO SISTEMA DE LOOTBOX PARA CÉU ========

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
  
  const categories = ['amoebas', 'peixes', 'terrestre', 'ceu'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
  const availableSkins = [];
  
  if (randomCategory === 'ceu') {
    for (let level in CEU_SKINS) {
      CEU_SKINS[level].forEach(skin => {
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
    for (let level in CEU_SKINS) {
      fallbackSkins.push({
        ...CEU_SKINS[level][0],
        category: 'ceu',
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
    console.log(`🎮 Tentando equipar skin: ${skinId} para ${category}`);
    
    // Verificar se a skin existe no inventário
    let skinExiste = false;
    let skinEncontrada = null;
    
    for (let level in inventory[category]) {
        skinEncontrada = inventory[category][level].find(skin => skin.id === skinId);
        if (skinEncontrada) {
            skinExiste = true;
            console.log(`✅ Skin encontrada no nível ${level}:`, skinEncontrada);
            break;
        }
    }
    
    if (!skinExiste) {
        console.log("❌ Skin não encontrada no inventário:", skinId);
        alert("Erro: Skin não encontrada no inventário!");
        return;
    }
    
    // Equipar a skin
    equippedSkin[category] = skinId;
    localStorage.setItem("equippedSkin", JSON.stringify(equippedSkin));
    
    console.log("✅ Skin equipada com sucesso!");
    
    // Forçar atualização visual
    renderInventory();
    forceUpdateBirdColors();
    
    setTimeout(() => {
        alert(`Skin ${skinEncontrada.name} equipada com sucesso para ${getCategoryName(category)}!`);
    }, 100);
}

function unequipSkin(category) {
    console.log(`🚫 Desequipando skin de ${category}`);
    
    equippedSkin[category] = null;
    localStorage.setItem("equippedSkin", JSON.stringify(equippedSkin));
    
    console.log("✅ Skin desequipada com sucesso!");
    
    renderInventory();
    forceUpdateBirdColors();
    
    setTimeout(() => {
        alert(`Skin desequipada de ${getCategoryName(category)}!`);
    }, 100);
}

function renderInventory(tab = 'ceu') {
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
          <p class="skin-id"><small>ID: ${skin.id}</small></p>
          ${isEquipped ? 
              `<button class="unequip-btn" onclick="unequipSkin('${tab}')">✅ Equipada</button>` :
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
    terrestre: 'Terrestre',
    ceu: 'Céu'
  };
  return names[category] || category;
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

// ======== EVENT LISTENERS PARA LOOTBOXES ========
document.getElementById("shopBtn").addEventListener("click", () => {
  showPopup("shop-popup");
});

document.getElementById("inventoryBtn").addEventListener("click", () => {
  showPopup("inventory-popup");
  renderInventory();
});

// Botões de fechar
document.getElementById("closeShop").addEventListener("click", hideAllPopups);
document.getElementById("closeInventory").addEventListener("click", hideAllPopups);
document.getElementById("closeReward").addEventListener("click", hideAllPopups);

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

// ======== SISTEMA DE COMPRA ========
function buyAmoeba(level = 1) {
    const cost = amoebaPrices[level] || (150 * level);
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

    for (let level = 1; level <= 5; level++) {
        const cost = amoebaPrices[level] || (150 * level);

        const item = document.createElement("div");
        item.className = "buy-item";
        item.innerHTML = `
            <strong>Ave Nível ${level}</strong> <br>
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
        dx: (Math.random() * 2 - 1) * 2,
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
    
    // Limitar o nível máximo a 15
    if (newLevel > 15) {
        console.log("🎯 Nível máximo do céu alcançado!");
        return;
    }
    
    const newAmoeba = {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        size: 60,
        level: newLevel,
        dragging: false,
        dx: (Math.random() * 2 - 1) * 2,
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

        // ✅ Usar getBirdColor para as aves
        ctx.fillStyle = getBirdColor(amoeba.level);
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
    requestAnimationFrame(gameLoop);
};

window.addEventListener("beforeunload", saveGame);

// Carregar discovered levels do céu
discoveredLevels = new Set(JSON.parse(localStorage.getItem("discoveredCeu")) || [1]);