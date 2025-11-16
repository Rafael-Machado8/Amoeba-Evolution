// shared.js - SISTEMA RADICAL DE POPUPS

// ======== VARIÁVEIS GLOBAIS ========
let inventory = JSON.parse(localStorage.getItem("skinInventory")) || {
    amoebas: {}, peixes: {}, terrestre: {}, ceu: {}
};

let equippedSkin = JSON.parse(localStorage.getItem("equippedSkin")) || {
    amoebas: null, peixes: null, terrestre: null, ceu: null
};

// ======== SISTEMA DE POPUPS RADICAL ========
let currentPopup = null;
let popupBackground = null;

function createPopupRadical(type, content) {
    // Destruir popups existentes
    destroyAllPopups();
    
    // Criar background
    popupBackground = document.createElement('div');
    popupBackground.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: rgba(0, 0, 0, 0.8) !important;
        z-index: 9998 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    `;
    popupBackground.onclick = destroyAllPopups;
    
    // Criar popup
    currentPopup = document.createElement('div');
    currentPopup.style.cssText = `
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        background: white !important;
        border-radius: 20px !important;
        padding: 30px !important;
        box-shadow: 0 15px 40px rgba(0,0,0,0.5) !important;
        border: 4px solid #333 !important;
        z-index: 9999 !important;
        max-width: 90vw !important;
        max-height: 90vh !important;
        overflow-y: auto !important;
        font-family: Arial, sans-serif !important;
        color: #333 !important;
    `;
    
    // Conteúdo base
    let popupContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0 0 20px 0; color: #333;">${type === 'shop' ? '🛒 Loja' : type === 'inventory' ? '🎒 Inventário' : '🎉 Recompensa'}</h2>
    `;
    
    // Conteúdo específico
    if (type === 'shop') {
        popupContent += createShopContent();
    } else if (type === 'inventory') {
        popupContent += createInventoryContent();
    } else if (type === 'reward') {
        popupContent += content;
    }
    
    // Botão fechar
    popupContent += `
        <button onclick="destroyAllPopups()" style="
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 20px;
            font-size: 16px;
        ">Fechar</button>
        </div>
    `;
    
    currentPopup.innerHTML = popupContent;
    
    // Adicionar ao body
    document.body.appendChild(popupBackground);
    document.body.appendChild(currentPopup);
    
    console.log("✅ Popup radical criado:", type);
}

function createShopContent() {
    return `
        <div style="margin: 20px 0;">
            <div style="
                display: flex !important;
                flex-direction: row !important;
                justify-content: center !important;
                align-items: stretch !important;
                gap: 20px !important;
                margin: 20px 0 !important;
                flex-wrap: wrap !important;
            ">
                <!-- Caixa Comum -->
                <div style="
                    background: #f5f5f5;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                    border: 3px solid #b0b0b0;
                    min-width: 200px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                ">
                    <div>
                        <div style="font-size: 48px; margin-bottom: 15px;">📦</div>
                        <h4 style="margin: 10px 0; color: #333;">Caixa Comum</h4>
                        <p style="margin: 8px 0; font-size: 14px; color: #666;">
                            • 60% Comum<br>• 30% Rara<br>• 10% Épica
                        </p>
                        <p style="font-size: 18px; font-weight: bold; color: #FFD700; margin: 15px 0;">💰 500</p>
                    </div>
                    <button onclick="buyLootboxRadical('common')" style="
                        background: #4CAF50;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: bold;
                        margin-top: 15px;
                        font-size: 14px;
                    ">Comprar</button>
                </div>
                
                <!-- Caixa Rara -->
                <div style="
                    background: #f5f5f5;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                    border: 3px solid #4CAF50;
                    min-width: 200px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                ">
                    <div>
                        <div style="font-size: 48px; margin-bottom: 15px;">🎁</div>
                        <h4 style="margin: 10px 0; color: #333;">Caixa Rara</h4>
                        <p style="margin: 8px 0; font-size: 14px; color: #666;">
                            • 30% Comum<br>• 50% Rara<br>• 20% Épica
                        </p>
                        <p style="font-size: 18px; font-weight: bold; color: #FFD700; margin: 15px 0;">💰 5.000</p>
                    </div>
                    <button onclick="buyLootboxRadical('rare')" style="
                        background: #4CAF50;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: bold;
                        margin-top: 15px;
                        font-size: 14px;
                    ">Comprar</button>
                </div>
                
                <!-- Caixa Épica -->
                <div style="
                    background: #f5f5f5;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                    border: 3px solid #9C27B0;
                    min-width: 200px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                ">
                    <div>
                        <div style="font-size: 48px; margin-bottom: 15px;">💎</div>
                        <h4 style="margin: 10px 0; color: #333;">Caixa Épica</h4>
                        <p style="margin: 8px 0; font-size: 14px; color: #666;">
                            • 10% Comum<br>• 30% Rara<br>• 60% Épica
                        </p>
                        <p style="font-size: 18px; font-weight: bold; color: #FFD700; margin: 15px 0;">💰 50.000</p>
                    </div>
                    <button onclick="buyLootboxRadical('epic')" style="
                        background: #4CAF50;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: bold;
                        margin-top: 15px;
                        font-size: 14px;
                    ">Comprar</button>
                </div>
            </div>
        </div>
    `;
}

function createInventoryContent() {
    let content = `
        <div style="margin-bottom: 20px;">
            <div style="display: flex; gap: 10px; margin-bottom: 20px; justify-content: center;">
                <button onclick="renderInventoryRadical('amoebas')" style="
                    padding: 10px 15px;
                    border: 2px solid #ccc;
                    border-radius: 5px;
                    background: #f0f0f0;
                    cursor: pointer;
                ">🦠 Amoebas</button>
                <button onclick="renderInventoryRadical('peixes')" style="
                    padding: 10px 15px;
                    border: 2px solid #ccc;
                    border-radius: 5px;
                    background: #f0f0f0;
                    cursor: pointer;
                ">🐟 Peixes</button>
                <button onclick="renderInventoryRadical('terrestre')" style="
                    padding: 10px 15px;
                    border: 2px solid #ccc;
                    border-radius: 5px;
                    background: #f0f0f0;
                    cursor: pointer;
                ">🌳 Terrestre</button>
                <button onclick="renderInventoryRadical('ceu')" style="
                    padding: 10px 15px;
                    border: 2px solid #ccc;
                    border-radius: 5px;
                    background: #f0f0f0;
                    cursor: pointer;
                ">☁️ Céu</button>
            </div>
            <div id="inventory-content-radical" style="max-height: 400px; overflow-y: auto; padding: 10px;">
                <!-- Conteúdo será carregado aqui -->
            </div>
        </div>
    `;
    
    // Renderizar conteúdo inicial
    setTimeout(() => renderInventoryRadical('amoebas'), 0);
    
    return content;
}

function renderInventoryRadical(tab = 'amoebas') {
    const container = document.getElementById('inventory-content-radical');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!inventory[tab] || Object.keys(inventory[tab]).length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Nenhuma skin desbloqueada ainda!</p>';
        return;
    }
    
    for (let level in inventory[tab]) {
        const levelSkins = inventory[tab][level];
        const levelSection = document.createElement('div');
        levelSection.style.marginBottom = '25px';
        levelSection.innerHTML = `<h4 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 5px;">Nível ${level}</h4>`;
        
        const skinsGrid = document.createElement('div');
        skinsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; margin-top: 15px;';
        
        levelSkins.forEach(skin => {
            const isEquipped = equippedSkin[tab] === skin.id;
            const skinElement = document.createElement('div');
            skinElement.style.cssText = `
                background: #f9f9f9;
                border-radius: 8px;
                padding: 12px;
                text-align: center;
                border: 2px solid ${isEquipped ? '#2196F3' : '#ddd'};
            `;
            
            skinElement.innerHTML = `
                <div style="width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 8px; border: 2px solid #333; background: ${skin.color}"></div>
                <h5 style="margin: 5px 0; font-size: 14px;">${skin.name}</h5>
                <p style="margin: 5px 0; font-size: 12px; color: #666;">${getRarityName(skin.rarity)}</p>
                ${isEquipped ? 
                    `<button onclick="unequipSkinRadical('${tab}')" style="background: #2196F3; color: white; border: none; padding: 6px 12px; border-radius: 15px; cursor: pointer; font-size: 12px; margin-top: 8px;">✅ Equipada</button>` :
                    `<button onclick="equipSkinRadical('${skin.id}', '${tab}')" style="background: #4CAF50; color: white; border: none; padding: 6px 12px; border-radius: 15px; cursor: pointer; font-size: 12px; margin-top: 8px;">Equipar</button>`
                }
            `;
            skinsGrid.appendChild(skinElement);
        });
        
        levelSection.appendChild(skinsGrid);
        container.appendChild(levelSection);
    }
}

function destroyAllPopups() {
    if (currentPopup) {
        currentPopup.remove();
        currentPopup = null;
    }
    if (popupBackground) {
        popupBackground.remove();
        popupBackground = null;
    }
}

// Fechar com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        destroyAllPopups();
    }
});

// ======== FUNÇÕES DO SISTEMA ORIGINAL (adaptadas) ========
function buyLootboxRadical(lootboxType) {
    console.log("💰 Comprando lootbox:", lootboxType);
    
    const coinsElement = document.getElementById("coins");
    let coins = 0;
    
    if (coinsElement) {
        coins = parseInt(coinsElement.textContent.replace('💰', '').trim()) || 0;
    }
    
    const price = getLootboxPrice(lootboxType);
    
    if (coins >= price) {
        coins -= price;
        if (coinsElement) {
            coinsElement.textContent = `💰 ${coins}`;
        }
        
        const skin = openLootbox(lootboxType);
        const isNew = addToInventory(skin);
        showRewardPopupRadical(skin, isNew);
        updateCoinsInStorage(coins);
        
        console.log("✅ Lootbox comprada!");
    } else {
        alert("Moedas insuficientes!");
    }
}

function showRewardPopupRadical(skin, isNew) {
    const rewardContent = `
        <div style="text-align: center; padding: 20px;">
            <div style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 15px; border: 3px solid #333; background: ${skin.color}"></div>
            <h3>${skin.name}</h3>
            <p style="font-weight: bold; color: ${getRarityColor(skin.rarity)}">${getRarityName(skin.rarity)}</p>
            <p><strong>Categoria:</strong> ${getCategoryName(skin.category)}</p>
            <p><strong>Nível:</strong> ${skin.level}</p>
            ${isNew ? 
                '<p style="color: #4CAF50; font-weight: bold;">✨ Nova Skin Desbloqueada!</p>' : 
                '<p style="color: #FF9800; font-weight: bold;">🔄 Skin Duplicada + 💰 100</p>'
            }
        </div>
    `;
    
    createPopupRadical('reward', rewardContent);
}

function equipSkinRadical(skinId, category) {
    equippedSkin[category] = skinId;
    localStorage.setItem("equippedSkin", JSON.stringify(equippedSkin));
    renderInventoryRadical(category);
    
    if (typeof forceUpdateColors === 'function') {
        forceUpdateColors();
    }
}

function unequipSkinRadical(category) {
    equippedSkin[category] = null;
    localStorage.setItem("equippedSkin", JSON.stringify(equippedSkin));
    renderInventoryRadical(category);
    
    if (typeof forceUpdateColors === 'function') {
        forceUpdateColors();
    }
}

// ======== FUNÇÕES UTILITÁRIAS ========
function getLootboxPrice(lootboxType) {
    const prices = { common: 500, rare: 5000, epic: 50000 };
    return prices[lootboxType] || 500;
}

function openLootbox(lootboxType) {
    const probabilities = {
        common: { common: 0.60, rare: 0.30, epic: 0.10 },
        rare: { common: 0.30, rare: 0.50, epic: 0.20 },
        epic: { common: 0.10, rare: 0.30, epic: 0.60 }
    };

    const random = Math.random();
    const prob = probabilities[lootboxType] || probabilities.common;
    
    let selectedRarity;
    if (random < prob.common) selectedRarity = 'common';
    else if (random < prob.common + prob.rare) selectedRarity = 'rare';
    else selectedRarity = 'epic';

    const allSkins = JSON.parse(localStorage.getItem("allSkins")) || {};
    const categories = ['amoebas', 'peixes', 'terrestre', 'ceu'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    const availableSkins = [];
    
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
    
    if (availableSkins.length > 0) {
        return availableSkins[Math.floor(Math.random() * availableSkins.length)];
    } else {
        return {
            id: 'fallback_skin',
            name: 'Skin Básica',
            rarity: 'common',
            color: '#FFFFFF',
            category: 'amoebas',
            level: 1
        };
    }
}

function addToInventory(skin) {
    if (!inventory[skin.category]) inventory[skin.category] = {};
    if (!inventory[skin.category][skin.level]) inventory[skin.category][skin.level] = [];
    
    const skinExists = inventory[skin.category][skin.level].some(s => s.id === skin.id);
    
    if (!skinExists) {
        inventory[skin.category][skin.level].push(skin);
        localStorage.setItem("skinInventory", JSON.stringify(inventory));
        return true;
    }
    return false;
}

function getRarityName(rarity) {
    const names = { common: 'Comum', rare: 'Rara', epic: 'Épica', legendary: 'Lendária' };
    return names[rarity] || rarity;
}

function getRarityColor(rarity) {
    const colors = { common: '#808080', rare: '#0070DD', epic: '#A335EE', legendary: '#FF8000' };
    return colors[rarity] || '#808080';
}

function getCategoryName(category) {
    const names = { amoebas: 'Amoebas', peixes: 'Peixes', terrestre: 'Terrestre', ceu: 'Céu' };
    return names[category] || category;
}

function updateCoinsInStorage(coins) {
    const saves = ['gameState', 'gameState_amoebas', 'gameState_peixes', 'gameState_terrestre', 'gameState_ceu'];
    saves.forEach(saveKey => {
        const saved = localStorage.getItem(saveKey);
        if (saved) {
            try {
                const state = JSON.parse(saved);
                state.coins = coins;
                localStorage.setItem(saveKey, JSON.stringify(state));
            } catch (e) {
                console.log("❌ Erro ao atualizar moedas:", saveKey);
            }
        }
    });
}

// ======== INICIALIZAÇÃO ========
function initializeShopAndInventoryRadical() {
    console.log("🛍️ Inicializando Sistema Radical...");
    
    // Shop
    const shopBtn = document.getElementById("shopBtn");
    if (shopBtn) {
        shopBtn.addEventListener("click", () => {
            createPopupRadical('shop');
        });
    }

    // Inventário
    const inventoryBtn = document.getElementById("inventoryBtn");
    if (inventoryBtn) {
        inventoryBtn.addEventListener("click", () => {
            createPopupRadical('inventory');
        });
    }

    console.log("✅ Sistema Radical inicializado!");
}

// Inicializar skins padrão se não existirem
function initializeAllSkins() {
    if (!localStorage.getItem("allSkins")) {
        const allSkins = {
            amoebas: {
                1: [
                    { id: 'amoeba_1_1', name: 'Amoeba Verde', rarity: 'common', color: '#4CAF50' },
                    { id: 'amoeba_1_2', name: 'Amoeba Azul', rarity: 'common', color: '#2196F3' },
                    { id: 'amoeba_1_3', name: 'Amoeba Dourada', rarity: 'rare', color: '#FFD700' }
                ]
            },
            peixes: {
                1: [
                    { id: 'peixe_1_1', name: 'Peixe Laranja', rarity: 'common', color: '#FFA500' },
                    { id: 'peixe_1_2', name: 'Peixe Azul', rarity: 'common', color: '#1E90FF' }
                ]
            },
            terrestre: {
                1: [
                    { id: 'terrestre_1_1', name: 'Animal Marrom', rarity: 'common', color: '#8B4513' }
                ]
            },
            ceu: {
                1: [
                    { id: 'ceu_1_1', name: 'Ave Cinza', rarity: 'common', color: '#808080' }
                ]
            }
        };
        localStorage.setItem("allSkins", JSON.stringify(allSkins));
    }
}

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 DOM Carregado - Sistema Radical...");
    initializeShopAndInventoryRadical();
    initializeAllSkins();
});