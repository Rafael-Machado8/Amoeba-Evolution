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

// Usar o mesmo sistema do main.js - os dados são compartilhados via localStorage
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

// Skins específicas para peixes (adicione ao objeto SKINS existente no main.js)
const PEIXES_SKINS = {
  1: [
    { id: 'peixe_1_1', name: 'Peixe Laranja Básico', rarity: 'common', color: '#FFA500' },
    { id: 'peixe_1_2', name: 'Peixe Azul Básico', rarity: 'common', color: '#1E90FF' },
    { id: 'peixe_1_3', name: 'Peixe Dourado', rarity: 'rare', color: '#FFD700' },
    { id: 'peixe_1_4', name: 'Peixe Translúcido', rarity: 'epic', color: '#F0F8FF' },
    { id: 'peixe_1_5', name: 'Peixe Aurora', rarity: 'legendary', color: 'linear-gradient(45deg, #00b4db, #0083b0)' }
  ],
  2: [
    { id: 'peixe_2_1', name: 'Peixe Verde Água', rarity: 'common', color: '#20B2AA' },
    { id: 'peixe_2_2', name: 'Peixe Roxo Profundo', rarity: 'common', color: '#9370DB' },
    { id: 'peixe_2_3', name: 'Peixe Prateado', rarity: 'rare', color: '#C0C0C0' },
    { id: 'peixe_2_4', name: 'Peixe Coral', rarity: 'epic', color: '#FF7F50' },
    { id: 'peixe_2_5', name: 'Peixe Abissal', rarity: 'legendary', color: 'linear-gradient(45deg, #000080, #191970)' }
  ],
  3: [
    { id: 'peixe_3_1', name: 'Peixe Amarelo Sol', rarity: 'common', color: '#FFD700' },
    { id: 'peixe_3_2', name: 'Peixe Verde Limão', rarity: 'common', color: '#32CD32' },
    { id: 'peixe_3_3', name: 'Peixe Bronze', rarity: 'rare', color: '#CD7F32' },
    { id: 'peixe_3_4', name: 'Peixe Esmeralda', rarity: 'epic', color: '#50C878' },
    { id: 'peixe_3_5', name: 'Peixe Oceânico', rarity: 'legendary', color: 'linear-gradient(45deg, #1e3c72, #2a5298)' }
  ],
  4: [
    { id: 'peixe_4_1', name: 'Peixe Vermelho Fogo', rarity: 'common', color: '#DC143C' },
    { id: 'peixe_4_2', name: 'Peixe Azul Celeste', rarity: 'common', color: '#87CEEB' },
    { id: 'peixe_4_3', name: 'Peixe Cristal', rarity: 'rare', color: '#B9F2FF' },
    { id: 'peixe_4_4', name: 'Peixe Rubi', rarity: 'epic', color: '#E0115F' },
    { id: 'peixe_4_5', name: 'Peixe Místico', rarity: 'legendary', color: 'linear-gradient(45deg, #667eea, #764ba2)' }
  ],
  5: [
    { id: 'peixe_5_1', name: 'Peixe Negro Profundo', rarity: 'common', color: '#2F4F4F' },
    { id: 'peixe_5_2', name: 'Peixe Branco Puro', rarity: 'common', color: '#F5F5F5' },
    { id: 'peixe_5_3', name: 'Peixe Platina', rarity: 'rare', color: '#E5E4E2' },
    { id: 'peixe_5_4', name: 'Peixe Diamante', rarity: 'epic', color: '#B9F2FF' },
    { id: 'peixe_5_5', name: 'Peixe Lendário', rarity: 'legendary', color: 'linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0)' }
  ]
};

// Preços das lootboxes (mesmo do main.js)
const LOOTBOX_PRICES = {
  common: 500,
  rare: 5000,
  epic: 50000
};

// Probabilidades (mesmo do main.js)
const LOOTBOX_PROBABILITIES = {
  common: { common: 0.60, rare: 0.30, epic: 0.10 },
  rare: { common: 0.30, rare: 0.50, epic: 0.20 },
  epic: { common: 0.10, rare: 0.30, epic: 0.60 }
};

// ======== FUNÇÕES DO SISTEMA DE LOOTBOX PARA PEIXES ========

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
  
  // Usar skins específicas para peixes quando a categoria for peixes
  const availableSkins = [];
  
  if (randomCategory === 'peixes') {
    for (let level in PEIXES_SKINS) {
      PEIXES_SKINS[level].forEach(skin => {
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
    // Para outras categorias, usar as skins padrão (que estarão no localStorage)
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
    // Fallback
    const fallbackSkins = [];
    for (let level in PEIXES_SKINS) {
      fallbackSkins.push({
        ...PEIXES_SKINS[level][0],
        category: 'peixes',
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
    
    // Procurar a skin em todos os níveis do inventário
    for (let level in inventory[category]) {
        skinEncontrada = inventory[category][level].find(skin => skin.id === skinId);
        if (skinEncontrada) {
            skinExiste = true;
           
            break;
        }
    }
    
    if (!skinExiste) {
        
        alert("Erro: Skin não encontrada no inventário!");
        return;
    }
    
    // Equipar a skin
    equippedSkin[category] = skinId;
    localStorage.setItem("equippedSkin", JSON.stringify(equippedSkin));
    
       console.log("Nova configuração equipada:", equippedSkin);
    
    // Forçar atualização visual
    renderInventory();
    
    // Atualizar as cores dos peixes no canvas
    updateFishColors();
    
    
}

// Função para atualizar as cores dos peixes quando uma skin é equipada
function updateFishColors() {
    // Esta função força o redesenho dos peixes com as novas cores
    // O game loop vai automaticamente chamar getFishColor() novamente
    console.log("🔄 Atualizando cores dos peixes...");
}
function unequipSkin(category) {
  equippedSkin[category] = null;
  localStorage.setItem("equippedSkin", JSON.stringify(equippedSkin));
  renderInventory();
}

function renderInventory(tab = 'peixes') {
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
  const names = { common: 'Comum', rare: 'Rara', epic: 'Épica', legendary: 'Lendária' };
  return names[rarity] || rarity;
}

function getCategoryName(category) {
  const names = { amoebas: 'Amoebas', peixes: 'Peixes', terrestre: 'Terrestre' };
  return names[category] || category;
}

// ======== EVENT LISTENERS PARA PEIXES ========

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

// ======== ATUALIZAR FUNÇÃO GETCOLOR PARA PEIXES ========

// Modifique a função getFishColor no peixes.js para usar skins:
function getFishColor(level) {
    console.log("🔍 Procurando skin para peixes nível", level);
    console.log("Skins equipadas:", equippedSkin);
    
    // Verificar se há skin equipada para peixes
    if (equippedSkin.peixes) {
        console.log("✅ Skin equipada encontrada:", equippedSkin.peixes);
        
        // Procurar a skin equipada em todos os níveis do inventário de peixes
        for (let lvl in inventory.peixes) {
            const skinsNoNivel = inventory.peixes[lvl];
            console.log(`📦 Nível ${lvl} tem ${skinsNoNivel.length} skins`);
            
            const skinEncontrada = skinsNoNivel.find(skin => skin.id === equippedSkin.peixes);
            if (skinEncontrada) {
                console.log("🎨 Aplicando skin:", skinEncontrada.name, "cor:", skinEncontrada.color);
                return skinEncontrada.color;
            }
        }
        console.log("❌ Skin equipada não encontrada no inventário");
    } else {
        console.log("❌ Nenhuma skin equipada para peixes");
    }
    
    // Cores padrão se não houver skin equipada
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
    const corPadrao = colors[(level - 1) % colors.length];
    console.log("🎯 Usando cor padrão:", corPadrao);
    return corPadrao;
}




// peixes.js - Código específico para o nível dos peixes

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

// Fundo aquático
const bg = new Image();
// Detectar se é mobile e carregar versão mobile do fundo
let lastMobileState = window.innerWidth <= 768;
bg.src = lastMobileState ? "assets/images/fundo-aquatico_mobile.png" : "assets/images/fundo-aquatico.jpg";

// Função para atualizar fundo quando necessário
function updateBackground() {
  const currentMobileState = window.innerWidth <= 768;
  if (currentMobileState !== lastMobileState) {
    const newSrc = currentMobileState ? "assets/images/fundo-aquatico_mobile.png" : "assets/images/fundo-aquatico.jpg";
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

// ======== INFORMAÇÕES DOS PEIXES ========
// ======== INFORMAÇÕES DOS PEIXES ========
const PEIXES_INFO = {
  1: { 
    name: "Celacanto", 
    img: "assets/images/peixe1.jpg", 
    date: "📅 Descoberta: 1938",
    habitat: "🌊 Habitat: Oceanos profundos", 
    desc: "Fóssil vivo - ancestral dos tetrápodes. Idade: 400 milhões de anos" 
  },
  2: { 
    name: "Esturjão", 
    img: "assets/images/peixe2.jpg", 
    date: "📅 Descoberta: 1758", 
    habitat: "🌊 Habitat: Rios e mares",
    desc: "Fóssil vivo - produz o caviar. Idade: 200 milhões de anos" 
  },
  3: { 
    name: "Tubarão-cobra", 
    img: "assets/images/peixe3.jpg", 
    date: "📅 Descoberta: 1884",
    habitat: "🌊 Habitat: Águas profundas", 
    desc: "Fóssil vivo - gestação de 3.5 anos. Idade: 150 milhões de anos" 
  },
  4: { 
    name: "Peixe-pulmonado", 
    img: "assets/images/peixe4.jpg", 
    date: "📅 Descoberta: 1837",
    habitat: "🌊 Habitat: Rios temporários", 
    desc: "Respira ar - sobrevive a secas. Idade: 100 milhões de anos" 
  },
  5: { 
    name: "Gar", 
    img: "assets/images/peixe5.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌊 Habitat: Águas doces", 
    desc: "Armadura de ganoína - primitivo. Idade: 80 milhões de anos" 
  },
  6: { 
    name: "Arowana", 
    img: "assets/images/peixe6.jpg", 
    date: "📅 Descoberta: 1844",
    habitat: "🌊 Habitat: Rios tropicais", 
    desc: "Peixe-dragão - salta alto. Idade: 60 milhões de anos" 
  },
  7: { 
    name: "Tubarão-elefante", 
    img: "assets/images/peixe7.jpg", 
    date: "📅 Descoberta: 1765",
    habitat: "🌊 Habitat: Oceanos temperados", 
    desc: "Segundo maior peixe - filtrador. Idade: 50 milhões de anos" 
  },
  8: { 
    name: "Mero-gigante", 
    img: "assets/images/peixe8.jpg", 
    date: "📅 Descoberta: 1790",
    habitat: "🌊 Habitat: Recifes de coral", 
    desc: "Muda de sexo - gigante gentil. Idade: 40 milhões de anos" 
  },
  9: { 
    name: "Peixe-lua", 
    img: "assets/images/peixe9.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌊 Habitat: Oceanos tropicais", 
    desc: "Maior peixe ósseo - desengonçado. Idade: 35 milhões de anos" 
  },
  10: { 
    name: "Peixe-voador", 
    img: "assets/images/peixe10.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌊 Habitat: Oceanos tropicais", 
    desc: "Planador - escapa de predadores. Idade: 30 milhões de anos" 
  },
  11: { 
    name: "Barracuda", 
    img: "assets/images/peixe11.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌊 Habitat: Oceanos tropicais", 
    desc: "Predador rápido - dentes afiados. Idade: 25 milhões de anos" 
  },
  12: { 
    name: "Atum-azul", 
    img: "assets/images/peixe12.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌊 Habitat: Atlântico", 
    desc: "Nadador olímpico - sangue quente. Idade: 20 milhões de anos" 
  },
  13: { 
    name: "Peixe-palhaço", 
    img: "assets/images/peixe13.jpg", 
    date: "📅 Descoberta: 1830",
    habitat: "🌊 Habitat: Recifes de coral", 
    desc: "Simbiose com anêmonas. Idade: 15 milhões de anos" 
  },
  14: { 
    name: "Cirurgião-azul", 
    img: "assets/images/peixe14.jpg", 
    date: "📅 Descoberta: 1775",
    habitat: "🌊 Habitat: Recifes", 
    desc: "Espinhos venenosos - Dory. Idade: 12 milhões de anos" 
  },
  15: { 
    name: "Peixe-mandarim", 
    img: "assets/images/peixe15.jpg", 
    date: "📅 Descoberta: 1927",
    habitat: "🌊 Habitat: Lagunas rasas", 
    desc: "Cores psicodélicas - raro. Idade: 10 milhões de anos" 
  },
  16: { 
    name: "Peixe-papagaio", 
    img: "assets/images/peixe16.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌊 Habitat: Recifes", 
    desc: "Cria areia dos corais. Idade: 8 milhões de anos" 
  },
  17: { 
    name: "Peixe-anjo", 
    img: "assets/images/peixe17.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌊 Habitat: Recifes", 
    desc: "Cores vibrantes - olhos falsos. Idade: 6 milhões de anos" 
  },
  18: { 
    name: "Peixe-borboleta", 
    img: "assets/images/peixe18.jpg", 
    date: "📅 Descoberta: 1758",
    habitat: "🌊 Habitat: Recifes", 
    desc: "Nadador ágil - padrões complexos. Idade: 4 milhões de anos" 
  },
  19: { 
    name: "Peixe-palhaço-tomate", 
    img: "assets/images/peixe19.jpg", 
    date: "📅 Descoberta: 1853",
    habitat: "🌊 Habitat: Recifes", 
    desc: "Nemo - simbiose perfeita. Idade: 2 milhões de anos" 
  },
  20: { 
    name: "Cardeal-de-Bangai", 
    img: "assets/images/peixe20.jpg", 
    date: "📅 Descoberta: 1933",
    habitat: "🌊 Habitat: Recifes rasos", 
    desc: "Incubação bucal - ameaçado. Idade: 1 milhão de anos" 
  }
};

// ======== VARIÁVEIS DO JOGO ========
let discoveredLevels = new Set([1]);
let amoebas = [
    { x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 1.5, dy: 0.8, animScale: 1 }
];
let coins = 0;
let selectedAmoeba = null;
let moneyAnimations = [];
let spawnTimer = 0;
let spawnInterval = 15000;
let amoebaPrices = {};

let upgrades = {
    moreCoins: { name: "Mais moedas por peixe", level: 0, max: 10, baseCost: 50, effect: 1 },
    fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 5, baseCost: 100, effect: 0.9 },
    higherStart: { name: "Peixes começam mais fortes", level: 0, max: 5, baseCost: 200, effect: 0 },
    ima: { name: "Ímã mágico", level: 0, max: 3, baseCost: 1000, effect: 5 }
};

// ======== SISTEMA DE SAVE/LOAD PARA PEIXES ========
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
    localStorage.setItem("gameState_peixes", JSON.stringify(state));
}

function loadGame() {
    const saved = localStorage.getItem("gameState_peixes");
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
        { x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 1.5, dy: 0.8, animScale: 1 }
    ];
    coins = 0;
    amoebaPrices = {};
    discoveredLevels = new Set([1]);
    spawnTimer = 0;
    spawnInterval = 15000;
    
    upgrades = {
        moreCoins: { name: "Mais moedas por peixe", level: 0, max: 10, baseCost: 50, effect: 1 },
        fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 5, baseCost: 100, effect: 0.9 },
        higherStart: { name: "Peixes começam mais fortes", level: 0, max: 5, baseCost: 200, effect: 0 },
        ima: { name: "Ímã mágico", level: 0, max: 3, baseCost: 1000, effect: 5 }
    };
    
    document.getElementById("coins").innerText = `💰 ${coins}`;
}

// ======== POPUPS ========
function saveDiscovered() {
    localStorage.setItem("discoveredPeixes", JSON.stringify([...discoveredLevels]));
}

function showInfoPopup(level) {
    const info = PEIXES_INFO[level] || {
        name: `Peixe Nível ${level}`, 
        img: "assets/images/peixe1.jpg", 
        date: `📅 Descoberta: ${1800 + level * 30}`,
        habitat: "🌊 Habitat: Oceanos", 
        desc: `Peixe nível ${level}: espécie aquática em estudo.`
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
    window.location.href = "library-peixes.html";
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

// ======== RENDER COMPRAR PEIXES ========
function renderBuyList() {
    const container = document.getElementById("buy-list");
    container.innerHTML = "";

    for (let level = 1; level <= 5; level++) {
        const cost = amoebaPrices[level] || (50 * level);

        const item = document.createElement("div");
        item.className = "buy-item";
        item.innerHTML = `
            <strong>Peixe Nível ${level}</strong> <br>
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
    
    // Limitar o nível máximo a 16
    if (newLevel > 16) {
        console.log("🎯 Nível máximo alcançado!");
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
}

// ======== UTILITÁRIOS ========
function isColliding(a, b) {
    const dx = (a.x + a.size / 2) - (b.x + b.size / 2);
    const dy = (a.y + a.size / 2) - (b.y + b.size / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (a.size / 2 + b.size / 2);
}

function getColor(level) {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"];
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
        const radius = (amoeba.size / 2) * scale;

        // ✅ CORREÇÃO: Usar getFishColor em vez de getColor
        ctx.fillStyle = getFishColor(amoeba.level);
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

// Carregar discovered levels dos peixes
discoveredLevels = new Set(JSON.parse(localStorage.getItem("discoveredPeixes")) || [1]);

// ======== SISTEMA DE SAVE/LOAD PARA PEIXES ========
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
    localStorage.setItem("gameState_peixes", JSON.stringify(state));
}

function loadGame() {
    const saved = localStorage.getItem("gameState_peixes");
    if (!saved) {
        // Se não há save para peixes, inicia do zero
        resetGameForPeixes();
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

function resetGameForPeixes() {
    amoebas = [
        { x: 300, y: 300, size: 60, level: 1, dragging: false, dx: 1.5, dy: 0.8, animScale: 1 }
    ];
    coins = 0;
    amoebaPrices = {};
    discoveredLevels = new Set([1]);
    spawnTimer = 0;
    spawnInterval = 15000;
    
    upgrades = {
        moreCoins: { name: "Mais moedas por peixe", level: 0, max: 10, baseCost: 50, effect: 1 },
        fasterSpawn: { name: "Spawn mais rápido", level: 0, max: 5, baseCost: 100, effect: 0.9 },
        higherStart: { name: "Peixes começam mais fortes", level: 0, max: 5, baseCost: 200, effect: 0 },
        ima: { name: "Ímã mágico", level: 0, max: 3, baseCost: 1000, effect: 5 }
    };
    
    document.getElementById("coins").innerText = `💰 ${coins}`;
}

// ======== SISTEMA DE DESCOBERTAS PARA PEIXES ========
function saveDiscovered() {
    localStorage.setItem("discoveredPeixes", JSON.stringify([...discoveredLevels]));
    
    // Salvar também as datas de descoberta
    const discoveries = JSON.parse(localStorage.getItem("peixeDiscoveries")) || {};
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    discoveredLevels.forEach(level => {
        if (!discoveries[level]) {
            discoveries[level] = {
                date: currentDate,
                level: level,
                name: PEIXES_INFO[level]?.name || `Peixe Nível ${level}`
            };
        }
    });
    
    localStorage.setItem("peixeDiscoveries", JSON.stringify(discoveries));
}

// Modifique a função showInfoPopup para salvar a data de descoberta
function showInfoPopup(level) {
    const info = PEIXES_INFO[level] || {
        name: `Peixe Nível ${level}`, 
        img: "assets/images/peixe1.jpg", 
        date: `📅 Descoberta: ${1800 + level * 30}`,
        habitat: "🌊 Habitat: Oceanos", 
        desc: `Peixe nível ${level}: espécie aquática em estudo.`
    };

    const popup = document.getElementById("info-popup");
    document.getElementById("info-image").src = info.img;
    document.getElementById("info-date").textContent = info.date;
    document.getElementById("info-habitat").textContent = info.habitat;
    document.getElementById("info-description").textContent = info.desc;

    popup.classList.remove("hidden");
    popup.style.display = "block";
    
    // Salvar descoberta
    saveDiscovered();
    saveGame();
}

// ======== VERIFICAÇÃO DO NOVO NÍVEL TERRESTRE ========
function checkNewLevelTerrestre() {
    const hasLevel15 = amoebas.some(a => a.level >= 15);
    const terrestreBtn = document.getElementById("newlevelbtn");
    
    if (hasLevel15) {
        terrestreBtn.classList.remove("hidden");
        terrestreBtn.style.display = "block";
        terrestreBtn.textContent = "🌳 Novo Nível Terrestre";
        terrestreBtn.onclick = function() { window.location.href = 'terrestre.html'; };
        // Salvar que o nível foi desbloqueado
        localStorage.setItem("nivel_terrestre_desbloqueado", "true");
    }
}

// Modifique o game loop no peixes.js para incluir esta verificação:
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    updateAmoebas(deltaTime);
    updateMoneyAnimations();
    
    // ✅ ADICIONAR VERIFICAÇÃO DO NOVO NÍVEL TERRESTRE
    checkNewLevelTerrestre();
    
    drawBackground();
    drawAmoebas();
    drawMoneyAnimations();
    drawSpawnBar();

    requestAnimationFrame(gameLoop);
}

// ======== VERIFICAÇÃO DO NOVO NÍVEL CÉU ========
function checkNewLevelCeu() {
    const hasLevel15 = amoebas.some(a => a.level >= 15);
    const ceuBtn = document.getElementById("newlevelbtn");
    
    if (hasLevel15) {
        ceuBtn.classList.remove("hidden");
        ceuBtn.style.display = "block";
        ceuBtn.textContent = "🌳 Novo Nível Terrestre ";
        ceuBtn.onclick = function() { window.location.href = 'terrestre.html'; };
        localStorage.setItem("nivel_ceu_desbloqueado", "true");
    }
}

// Modifique o game loop no peixes.js para incluir esta verificação:
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