// library-peixes.js

// Lista de peixes com nomes e imagens
const peixesLibrary = [
  { 
    level: 1, 
    name: "Celacanto", 
    img: "assets/images/peixe1.jpg",
    habitat: "Águas profundas do Oceano Índico (100-500m de profundidade)",
    desc: "Considerado um 'fóssil vivo', o celacanto era tido como extinto há 66 milhões de anos até seu redescobrimento em 1938. Possui barbatanas lobadas que se articulam de maneira similar a membros, fornecendo pistas cruciais sobre a transição evolutiva da água para a terra.",
    idade: "🕰️ 400 milhões de anos",
    curiosidade: "🔍 O celacanto pode viver até 60 anos e atingir 2 metros. Seu redescobrimento foi tão impactante que é chamado de 'a descoberta zoológica mais importante do século 20'."
  },
  { 
    level: 2, 
    name: "Esturjão", 
    img: "assets/images/peixe2.jpg",
    habitat: "Rios e mares do Hemisfério Norte, principalmente Europa e Ásia",
    desc: "Um dos peixes mais antigos ainda existentes, com escudos ósseos ao longo do corpo em vez de escamas. Pode viver mais de 100 anos e atingir tamanhos impressionantes, sendo fonte do valioso caviar.",
    idade: "🕰️ 200 milhões de anos",
    curiosidade: "🥚 O caviar de esturjão-beluga pode custar até US$ 3.500/kg! Esturjões são tão antigos que nadavam com dinossauros e sobreviveram a 5 eventos de extinção em massa."
  },
  { 
    level: 3, 
    name: "Tubarão-cobra", 
    img: "assets/images/peixe3.jpg",
    habitat: "Águas profundas (50-1.200m) em oceanos mundialmente",
    desc: "Fóssil vivo com corpo de enguia e 300 dentes tricúspides. Caça enrolando-se e saltando sobre presas como uma cobra. Raramente visto vivo, sendo uma das espécies mais misteriosas dos oceanos.",
    idade: "🕰️ 150 milhões de anos",
    curiosidade: "🐍 Chamado de 'fóssil vivo' porque mudou pouco desde os dinossauros. Tem a gestação mais longa do reino animal - incríveis 3.5 anos!"
  },
  { 
    level: 4, 
    name: "Peixe-pulmonado", 
    img: "assets/images/peixe4.jpg",
    habitat: "Rios e lagos da África, América do Sul e Austrália",
    desc: "Respira ar através de pulmões primitivos além de brânquias. Sobrevive a secas enterrando-se no lodo e entrando em estivação. Ancestral direto dos anfíbios, representando a transição água-terra.",
    idade: "🕰️ 100 milhões de anos",
    curiosidade: "🌬️ Pode sobreviver até 4 anos enterrado no lodo seco! Seus 'pulmões' são tão eficientes que se afogam se não tiverem acesso ao ar."
  },
  { 
    level: 5, 
    name: "Gar", 
    img: "assets/images/peixe5.jpg",
    habitat: "Águas doces da América do Norte e Central",
    desc: "Peixe primitivo com escamas de ganoína (material similar ao esmalte dental) que formam uma armadura impenetrável. Nadador lento mas predador eficiente com focinho alongado cheio de dentes afiados.",
    idade: "🕰️ 80 milhões de anos",
    curiosidade: "🛡️ Suas escamas são tão resistentes que nativos americanos as usavam como pontas de flecha! Podem respirar ar engolindo-o na superfície."
  },
  { 
    level: 6, 
    name: "Arowana", 
    img: "assets/images/peixe6.jpg",
    habitat: "Rios e lagos de água doce da Ásia, Austrália e América do Sul",
    desc: "Conhecida como 'peixe-dragão' por suas escamas grandes e brilhantes. Excelente saltadora, capaz de capturar insetos e pequenos animais sobre a água. Considerada símbolo de sorte na cultura asiática.",
    idade: "🕰️ 60 milhões de anos",
    curiosidade: "🐉 A arowana asiática pode custar até US$ 300.000! São tão valiosas que criadouros usam vigilância 24h e microchips para evitar roubos."
  },
  { 
    level: 7, 
    name: "Tubarão-elefante", 
    img: "assets/images/peixe7.jpg",
    habitat: "Oceanos temperados mundialmente, desde a superfície até 1.000m",
    desc: "Segundo maior peixe existente (até 12 metros), é um filtrador completamente inofensivo que se alimenta de plâncton. Sua enorme boca aberta enquanto nada cria um efeito de filtragem impressionante.",
    idade: "🕰️ 50 milhões de anos",
    curiosidade: "🦈 Apesar do tamanho assustador, o tubarão-elefante é completamente inofensivo para humanos. Pode filtrar até 2.000 toneladas de água por hora em busca de plâncton!"
  },
  { 
    level: 8, 
    name: "Mero-gigante", 
    img: "assets/images/peixe8.jpg",
    habitat: "Recifes de coral tropicais do Indo-Pacífico e Atlântico",
    desc: "Um dos maiores peixes de recife, podendo atingir 2.7 metros e 400 kg. São hermafroditas protogínicos - começam como fêmeas e tornam-se machos quando atingem grande tamanho.",
    idade: "🕰️ 40 milhões de anos",
    curiosidade: "⚧️ Todos os meros nascem fêmeas e alguns se tornam machos depois! Podem viver mais de 50 anos e são tão curiosos que frequentemente seguem mergulhadores."
  },
  { 
    level: 9, 
    name: "Peixe-lua", 
    img: "assets/images/peixe9.jpg",
    habitat: "Oceanos tropicais e temperados mundialmente",
    desc: "O maior peixe ósseo do mundo, podendo atingir 3 metros e 2.300 kg. Seu corpo achatado e desengonçado esconde uma incrível capacidade de mergulho - já foram registrados a 600m de profundidade.",
    idade: "🕰️ 35 milhões de anos",
    curiosidade: "🌊 O peixe-lua detém o recorde de maior postura de ovos entre vertebrados - uma fêmea pode liberar até 300 milhões de ovos de uma vez! São os 'gigantes gentis' dos oceanos."
  },
  { 
    level: 10, 
    name: "Peixe-voador", 
    img: "assets/images/peixe10.jpg",
    habitat: "Oceanos tropicais e subtropicais mundialmente",
    desc: "Desenvolveu barbatanas peitorais enormes que funcionam como asas, permitindo planar acima da água para escapar de predadores. Pode planar por até 200 metros e atingir alturas de 6 metros.",
    idade: "🕰️ 30 milhões de anos",
    curiosidade: "✈️ Os peixes-voadores podem atingir 60 km/h no ar! Batem a cauda na água 70 vezes por segundo para ganhar impulso antes de 'decolar'."
  },
  { 
    level: 11, 
    name: "Barracuda", 
    img: "assets/images/peixe11.jpg",
    habitat: "Oceanos tropicais e subtropicais mundialmente",
    desc: "Predador rápido e agressivo com corpo alongado e dentes afiados como facas. Caça em emboscadas, acelerando rapidamente para capturar presas desprevenidas.",
    idade: "🕰️ 25 milhões de anos",
    curiosidade: "⚡ Podem acelerar de 0 a 60 km/h em 2 segundos! Sua visão é tão aguçada que podem detectar movimentos a mais de 30 metros de distância."
  },
  { 
    level: 12, 
    name: "Atum-azul", 
    img: "assets/images/peixe12.jpg",
    habitat: "Oceanos Atlântico e Mediterrâneo",
    desc: "Um dos nadadores mais rápidos e eficientes do oceano. Mantém temperatura corporal acima da água ambiente, permitindo atividade em águas frias. Realiza migrações transoceânicas impressionantes.",
    idade: "🕰️ 20 milhões de anos",
    curiosidade: "💙 Podem cruzar o Oceano Atlântico em 60 dias! Um atum-azul do Atlântico foi vendido por US$ 3.1 milhões no Japão - o preço mais alto já pago por um peixe."
  },
  { 
    level: 13, 
    name: "Peixe-palhaço", 
    img: "assets/images/peixe13.jpg",
    habitat: "Recifes de coral do Indo-Pacífico",
    desc: "Famosa relação simbiótica com anêmonas-do-mar. Desenvolveu imunidade ao veneno dos cnidoblastos através de um muco especial que recobre suas escamas. Vive em pequenos grupos hierárquicos.",
    idade: "🕰️ 15 milhões de anos",
    curiosidade: "🎭 Todos os peixes-palhaço nascem machos! Quando a fêmea dominante morre, o macho maior muda de sexo em apenas 2 semanas - um dos processos de transição sexual mais rápidos do reino animal."
  },
  { 
    level: 14, 
    name: "Cirurgião-azul", 
    img: "assets/images/peixe14.jpg",
    habitat: "Recifes de coral do Indo-Pacífico",
    desc: "Conhecido por suas cores vibrantes e espinhos caudais afiados como bisturis (que dão o nome 'cirurgião'). Alimenta-se principalmente de algas, ajudando a controlar seu crescimento nos recifes.",
    idade: "🕰️ 12 milhões de anos",
    curiosidade: "🔪 Os espinhos caudais são tão afiados que podem causar cortes profundos. O personagem Dory de 'Procurando Nemo' é uma cirurgião-azul!"
  },
  { 
    level: 15, 
    name: "Peixe-mandarim", 
    img: "assets/images/peixe15.jpg",
    habitat: "Lagunas rasas protegidas e recifes do Pacífico Oeste",
    desc: "Considerado por muitos o peixe mais bonito do mundo, o mandarim exibe padrões psicodélicos de azul, laranja e verde. Suas cores não vêm de pigmentos, mas de células especiais que criam efeitos de iridescência.",
    idade: "🕰️ 10 milhões de anos",
    curiosidade: "🌈 Diferente da maioria dos peixes coloridos, o mandarim não obtém suas cores de algas ou dieta. Sua coloração é estrutural - criada pela refração da luz em células cutâneas especiais chamadas cromatóforas."
  },
  { 
    level: 16, 
    name: "Peixe-papagaio", 
    img: "assets/images/peixe16.jpg",
    habitat: "Recifes de coral tropicais mundialmente",
    desc: "Tem dentes fundidos formando um bico parecido com o de papagaios, usado para raspar algas e coral. Contribui significativamente para a produção de areia branca dos recifes através de seus excrementos.",
    idade: "🕰️ 8 milhões de anos",
    curiosidade: "🏖️ Um único peixe-papagaio pode produzir até 100 kg de areia por ano! Dormem envoltos em um casulo de muco que esconde seu cheiro de predadores noturnos."
  },
  { 
    level: 17, 
    name: "Peixe-anjo", 
    img: "assets/images/peixe17.jpg",
    habitat: "Recifes de coral tropicais do Atlântico, Índico e Pacífico",
    desc: "Conhecidos por suas cores vibrantes e padrões complexos, muitos com marcas que lembram olhos falsos para confundir predadores. Juvenis frequentemente têm cores completamente diferentes dos adultos.",
    idade: "🕰️ 6 milhões de anos",
    curiosidade: "👁️ Muitas espécies têm 'olhos falsos' perto da cauda que distraem predadores de atacar a cabeça vital. Alguns mudam de sexo durante a vida conforme necessidades reprodutivas."
  },
  { 
    level: 18, 
    name: "Peixe-borboleta", 
    img: "assets/images/peixe18.jpg",
    habitat: "Recifes de coral tropicais mundialmente",
    desc: "Conhecido por suas cores vibrantes e formato corporal comprimido, o peixe-borboleta é um nadador ágil que se alimenta de coral, anêmonas e pequenos invertebrados. Desenvolveu relações complexas com o ecossistema de recifes.",
    idade: "🕰️ 4 milhões de anos",
    curiosidade: "🦋 Muitas espécies de peixe-borboleta têm padrões de cores que funcionam como 'óculos de sol' naturais, reduzindo o brilho da água e melhorando a visão para detectar presas e predadores."
  },
  { 
    level: 19, 
    name: "Peixe-palhaço-tomate", 
    img: "assets/images/peixe19.jpg",
    habitat: "Recifes de coral do Indo-Pacífico",
    desc: "Variedade do peixe-palhaço com coloração laranja vibrante e uma única faixa branca. Como todos os peixes-palhaço, vive em simbiose com anêmonas e tem hierarquia social complexa.",
    idade: "🕰️ 2 milhões de anos",
    curiosidade: "🍅 O popular 'Nemo' é baseado nesta espécie! Machos cuidam zelosamente dos ovos, ventilando-os com suas barbatanas para garantir oxigenação adequada."
  },
  { 
    level: 20, 
    name: "Cardeal-de-Bangai", 
    img: "assets/images/peixe20.jpg",
    habitat: "Recifes rasos das Ilhas Banggai, Indonésia",
    desc: "Peixe pequeno mas impressionante com listras pretas e brancas marcantes e barbatanas alongadas e elegantes. Uma das poucas espécies de peixe marinho onde o macho incuba os ovos na boca.",
    idade: "🕰️ 1 milhão de anos",
    curiosidade: "👨‍🍼 O macho incuba os ovos na boca por 20-30 dias sem se alimentar! São endêmicos de uma pequena área na Indonésia e estão criticamente ameaçados de extinção."
  }
];

class EnhancedPeixesLibrary {
  constructor() {
    this.container = document.getElementById('libraryGrid');
    this.peixesUnlocked = JSON.parse(localStorage.getItem("discoveredPeixes")) || [];
    this.peixesUnlocked = [...new Set(this.peixesUnlocked)].sort((a,b) => a-b);
    this.discoveries = JSON.parse(localStorage.getItem("peixeDiscoveries")) || {};
    this.filters = {
      search: '',
      sort: 'level',
      showLocked: true
    };
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = this.generateLibraryHTML();
  }

  generateLibraryHTML() {
    const unlockedCount = this.peixesUnlocked.length;
    const totalCount = peixesLibrary.length;
    const percentage = Math.round((unlockedCount / totalCount) * 100);

    return `
      <div class="library-container library-peixes">
        ${this.generateHeaderStats(unlockedCount, totalCount, percentage)}
        ${this.generateFilters()}
        <div class="library-grid">
          ${this.generatePeixeCards()}
        </div>
      </div>
    `;
  }

  generateHeaderStats(unlocked, total, percentage) {
    return `
      <div class="library-header">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-number">${unlocked}/${total}</div>
            <div class="stat-label">Peixes Descobertos</div>
          </div>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="progress-text">${percentage}% completo</div>
          </div>
        </div>
      </div>
    `;
  }

  generateFilters() {
    return `
      <div class="library-filters">
        <div class="search-box">
          <input type="text" id="searchPeixes" placeholder="🔍 Buscar por nome, habitat ou descrição..." 
                 class="search-input" value="${this.filters.search}">
        </div>
        <div class="filter-buttons">
          <button class="filter-btn ${this.filters.sort === 'level' ? 'active' : ''}" 
                  data-sort="level">Nível ↑</button>
          <button class="filter-btn ${this.filters.sort === 'level-desc' ? 'active' : ''}" 
                  data-sort="level-desc">Nível ↓</button>
          <button class="filter-btn ${this.filters.sort === 'name' ? 'active' : ''}" 
                  data-sort="name">Nome A-Z</button>
          <button class="filter-btn ${!this.filters.showLocked ? 'active' : ''}" 
                  data-filter="unlocked">Apenas Desbloqueadas</button>
        </div>
      </div>
    `;
  }

  generatePeixeCards() {
    const filteredPeixes = this.getFilteredPeixes();
    
    return filteredPeixes.map(peixe => {
      const isUnlocked = this.peixesUnlocked.includes(peixe.level);
      const discoveryDate = this.discoveries[peixe.level]?.date || "Descoberta recente";
      
      return `
        <div class="creature-card ${isUnlocked ? 'unlocked' : 'locked'}" 
             data-level="${peixe.level}" 
             data-name="${peixe.name.toLowerCase()}">
          ${isUnlocked ? this.generateUnlockedCard(peixe, discoveryDate) : this.generateLockedCard(peixe)}
        </div>
      `;
    }).join('');
  }

  generateUnlockedCard(peixe, discoveryDate) {
    return `
      <div class="card-header">
        <div class="creature-level">Nível ${peixe.level}</div>
        <h3 class="creature-name">${peixe.name}</h3>
      </div>

      <div class="card-image">
        <img src="${peixe.img}" alt="${peixe.name}" 
             class="creature-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
        <div class="image-placeholder" style="display: none;">
          <div class="lock-icon">🔬</div>
          <div class="lock-text">Imagem Indisponível</div>
        </div>
        <div class="discovery-badge">
          <span class="discovery-icon">📅</span>
          <span class="discovery-date">${discoveryDate}</span>
        </div>
      </div>

      <div class="card-info">
        <div class="info-section">
          <div class="info-item">
            <span class="info-icon">🌊</span>
            <div class="info-content">
              <strong>Habitat:</strong> ${peixe.habitat}
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">🕰️</span>
            <div class="info-content">
              <strong>Idade Evolutiva:</strong> ${peixe.idade}
            </div>
          </div>
        </div>

        <div class="description-section">
          <p class="creature-description">${peixe.desc}</p>
        </div>

        <div class="curiosity-section">
          <div class="curiosity-header">
            <span class="curiosity-icon">💡</span>
            <strong>Curiosidade Científica</strong>
          </div>
          <p class="curiosity-text">${peixe.curiosidade}</p>
        </div>
      </div>

      <div class="card-footer">
        <div class="unlock-status">
          <span class="status-icon">✅</span>
          <span class="status-text">Desbloqueado</span>
        </div>
      </div>
    `;
  }

  generateLockedCard(peixe) {
    return `
      <div class="card-header">
        <div class="creature-level">Nível ${peixe.level}</div>
        <h3 class="creature-name">Espécie Desconhecida</h3>
      </div>

      <div class="card-image">
        <div class="image-placeholder">
          <div class="lock-icon">🔒</div>
          <div class="lock-text">Embarque Científico</div>
        </div>
      </div>

      <div class="card-info">
        <div class="locked-message">
          <div class="mystery-icon">❓</div>
          <h4>Descoberta Pendente</h4>
          <p>Continue sua jornada evolutiva para revelar os segredos deste peixe misterioso!</p>
          <div class="progress-requirement">
            <span class="requirement-icon">🎯</span>
            <span class="requirement-text">Alcance o nível ${peixe.level} nos Peixes</span>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div class="unlock-status locked">
          <span class="status-icon">🔒</span>
          <span class="status-text">A Ser Descoberto</span>
        </div>
      </div>
    `;
  }

  getFilteredPeixes() {
    let filtered = [...peixesLibrary];

    // Filtro de busca
    if (this.filters.search) {
      const searchTerm = this.filters.search.toLowerCase();
      filtered = filtered.filter(peixe =>
        peixe.name.toLowerCase().includes(searchTerm) ||
        peixe.habitat.toLowerCase().includes(searchTerm) ||
        peixe.desc.toLowerCase().includes(searchTerm) ||
        peixe.curiosidade.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro de desbloqueio
    if (!this.filters.showLocked) {
      filtered = filtered.filter(peixe => 
        this.peixesUnlocked.includes(peixe.level)
      );
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (this.filters.sort) {
        case 'level-desc':
          return b.level - a.level;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'level':
        default:
          return a.level - b.level;
      }
    });

    return filtered;
  }

  attachEventListeners() {
    // Busca com input e enter
    const searchInput = document.getElementById('searchPeixes');
    if (searchInput) {
      // Pesquisa enquanto digita (com debounce para performance)
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.filters.search = e.target.value;
          this.render();
        }, 300);
      });

      // Pesquisa ao pressionar Enter
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.filters.search = e.target.value;
          this.render();
        }
      });

      // Foca no input quando a página carrega
      searchInput.focus();
    }

    // Botões de filtro
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        const sort = e.target.dataset.sort;
        const filter = e.target.dataset.filter;
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        e.target.classList.add('active');

        if (sort) {
          this.filters.sort = sort;
        }
        if (filter === 'unlocked') {
          this.filters.showLocked = false;
        } else {
          this.filters.showLocked = true;
        }
        
        this.render();
      }
    });
  }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  const library = new EnhancedPeixesLibrary();
  library.init();
});