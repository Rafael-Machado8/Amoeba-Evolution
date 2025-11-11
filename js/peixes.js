// peixes.js - Código específico para o nível dos peixes

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Fundo aquático
const bg = new Image();
bg.src = "assets/images/fundo-aquatico.jpg";

// ======== INFORMAÇÕES DOS PEIXES ========
const PEIXES_INFO = {
  1: { name: "Peixe Palhaço", img: "assets/images/peixe1.jpg", date: "📅 Descoberta: 1830", habitat: "🌊 Habitat: Recifes de coral", desc: "Peixe nível 1: colorido e adaptado à vida em anêmonas." },
  2: { name: "Peixe Cirurgião", img: "assets/images/peixe2.jpg", date: "📅 Descoberta: 1855", habitat: "🌊 Habitat: Oceanos tropicais", desc: "Peixe nível 2: conhecido pela lâmina caudal característica." },
  3: { name: "Peixe Mandarim", img: "assets/images/peixe3.jpg", date: "📅 Descoberta: 1880", habitat: "🌊 Habitat: Águas rasas", desc: "Peixe nível 3: um dos mais coloridos do oceano." },
  4: { name: "Peixe Leão", img: "assets/images/peixe4.jpg", date: "📅 Descoberta: 1905", habitat: "🌊 Habitat: Recifes rochosos", desc: "Peixe nível 4: venenoso e com espinhos impressionantes." },
  5: { name: "Tubarão Baleia", img: "assets/images/peixe5.jpg", date: "📅 Descoberta: 1828", habitat: "🌊 Habitat: Oceanos abertos", desc: "Peixe nível 5: maior peixe do mundo, completamente inofensivo." },
  6: { name: "Peixe Legendário", img: "assets/images/peixe1.jpg", date: "📅 Descoberta: 2024", habitat: "🌊 Habitat: Abissal", desc: "Peixe nível 6: espécie raríssima das profundezas." }
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
