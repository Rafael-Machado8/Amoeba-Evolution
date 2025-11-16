// peixes.js - Código específico para o nível dos peixes

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
      console.log("🎯 Nível máximo dos peixes alcançado!");
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
  const hasLevel20 = amoebas.some(a => a.level >= 20); // ✅ MUDAR PARA 20
  const terrestreBtn = document.getElementById("newlevelbtn");
  
  if (hasLevel20) {
      terrestreBtn.classList.remove("hidden");
      terrestreBtn.style.display = "block";
      terrestreBtn.textContent = "🌳 Novo Nível Terrestre";
      terrestreBtn.onclick = function() { window.location.href = 'terrestre.html'; };
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
  console.log("🎨 Forçando atualização de cores dos peixes...");
  // Esta função será chamada quando uma skin for equipada
  // O game loop vai atualizar automaticamente na próxima frame
}