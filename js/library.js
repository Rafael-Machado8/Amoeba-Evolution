// library.js - VERSÃO MELHORADA

// Lista de amoebas com nomes e imagens
const amoebaLibrary = [
  { 
    level: 1, 
    name: "Amoeba proteus", 
    img: "assets/images/amoeba1.jpg",
    habitat: "Água doce de lagos, rios e poças em todo o mundo",
    desc: "Conhecida como a 'proteína cambiante', esta ameba é um dos maiores protozoários existentes, podendo atingir até 1 mm de diâmetro - visível a olho nu. Move-se através de pseudópodes que se estendem e retraem continuamente, demonstrando uma das formas mais primitivas de locomoção celular.",
    idade: "🕰️ 1.2 bilhão de anos",
    curiosidade: "🔬 Pode se alongar até 5 vezes seu comprimento original! Sua capacidade de fagocitose inspirou estudos em robótica biomimética e sistemas de entrega de medicamentos."
  },
  { 
    level: 2, 
    name: "Entamoeba histolytica", 
    img: "assets/images/amoeba2.jpg",
    habitat: "Intestino grosso humano e de outros primatas",
    desc: "Parasita especializado que causa a amebíase, uma doença que afeta 50 milhões de pessoas anualmente. Possui enzimas poderosas que dissolvem tecidos humanos, permitindo a invasão da mucosa intestinal e formação de abscessos hepáticos.",
    idade: "🕰️ 1 bilhão de anos",
    curiosidade: "⚠️ Descoberta pelo médico russo Fédor Lösch, esta ameba é responsável por ~100.000 mortes/ano. Desenvolveu mecanismos sofisticados para evadir o sistema imunológico humano."
  },
  { 
    level: 3, 
    name: "Naegleria fowleri", 
    img: "assets/images/amoeba3.jpg",
    habitat: "Águas doces mornas em todo o mundo, especialmente lagos e piscinas mal tratadas",
    desc: "Conhecida como 'ameba comedora de cérebro', pode causar meningoencefalite primária fatal em humanos. Tem ciclo de vida único com três formas distintas: trofozoíta, flagelada e cisto.",
    idade: "🕰️ 900 milhões de anos",
    curiosidade: "🧠 A infecção é extremamente rara (1 em 10 milhões) mas 97% fatal. A ameba migra do nariz para o cérebro seguindo nervos olfatórios, destruindo tecido cerebral rapidamente."
  },
  { 
    level: 4, 
    name: "Acanthamoeba", 
    img: "assets/images/amoeba4.jpg",
    habitat: "Solo, água doce, sistemas de ar condicionado e lentes de contato contaminadas",
    desc: "Ameba de vida livre que pode causar ceratite (infecção ocular grave) em usuários de lentes de contato. Forma cistos extremamente resistentes que sobrevivem em condições ambientais adversas.",
    idade: "🕰️ 850 milhões de anos",
    curiosidade: "👁️ Pode hospedar bactérias como Legionella pneumophila, servindo como 'cavalo de Troia' para patógenos humanos. Sobrevive a cloro e outros desinfetantes."
  },
  { 
    level: 5, 
    name: "Difflugia", 
    img: "assets/images/amoeba5.jpg",
    habitat: "Fundos de lagos, rios e zonas úmidas de água doce em todo o mundo",
    desc: "Arquiteta microscópica que constrói casinhas (testas) usando grãos de areia, partículas de sílica e espículas de esponjas. Seleciona meticulosamente materiais do ambiente para criar estruturas únicas que protegem seu citoplasma.",
    idade: "🕰️ 800 milhões de anos",
    curiosidade: "🏗️ Cada Difflugia tem uma 'casa' única - como impressão digital! Algumas espécies usam até 200 grãos de areia individuais. Fósseis de Difflugia são usados em paleoecologia para reconstruir ecossistemas antigos."
  },
  { 
    level: 6, 
    name: "Arcella", 
    img: "assets/images/amoeba6.jpg",
    habitat: "Águas doces paradas, pântanos, lagoas e zonas úmidas em todo o globo",
    desc: "Ameba que vive dentro de uma carapaça quitinosa em forma de cúpula ou disco. A carapaça possui poros estratégicos por onde estende seus pseudópodes para capturar alimento enquanto mantém proteção contra predadores.",
    idade: "🕰️ 750 milhões de anos",
    curiosidade: "🛡️ A carapaça da Arcella é tão resistente que pode ser preservada por milhões de anos em sedimentos. São bioindicadores importantes - sua presença indica água de boa qualidade."
  },
  { 
    level: 7, 
    name: "Euglypha", 
    img: "assets/images/amoeba7.jpg",
    habitat: "Musgos, solos úmidos e águas doces em regiões temperadas e tropicais",
    desc: "Ameba que constrói escudos elaborados de placas de sílica sobrepostas, formando estruturas que lembram armaduras medievais. As placas são produzidas internamente e montadas com precisão.",
    idade: "🕰️ 700 milhões de anos",
    curiosidade: "⚔️ Produz suas próprias 'escamas' de sílica internamente, ao contrário de Difflugia que coleta materiais externos. Suas estruturas fossilizadas são importantes para datação de sedimentos."
  },
  { 
    level: 8, 
    name: "Vampyrella", 
    img: "assets/images/amoeba8.jpg",
    habitat: "Águas doces ricas em algas, especialmente em lagos e riachos europeus",
    desc: "Ameba laranja impressionante que perfura paredes celulares de algas para sugar seu conteúdo. Não engole a presa inteira, mas extrai o citoplasma através do orifício criado.",
    idade: "🕰️ 650 milhões de anos",
    curiosidade: "🧛 Apelidada de 'vampira' por seu método de alimentação. Pode dizear populações inteiras de algas em poucos dias, controlando blooms algais naturalmente."
  },
  { 
    level: 9, 
    name: "Gromia", 
    img: "assets/images/amoeba9.jpg",
    habitat: "Fundos marinhos e oceânicos, desde águas rasas até abissais",
    desc: "Ameba gigante que pode atingir vários centímetros de diâmetro. Deixa rastros característicos no fundo do mar que se assemelham a trilhas de minhocas, desafiando teorias sobre quando animais começaram a se mover.",
    idade: "🕰️ 600 milhões de anos",
    curiosidade: "🔄 Suas trilhas no fundo oceânico são idênticas a fósseis de 1.8 bilhão de anos, sugerindo que amebas gigantes podem ter sido os primeiros organismos a se mover no planeta!"
  },
  { 
    level: 10, 
    name: "Foraminífero", 
    img: "assets/images/amoeba10.jpg",
    habitat: "Oceanos mundiais, desde a superfície até zonas abissais",
    desc: "Protozoário com concha calcária complexa, geralmente multicamarada. Componente crucial do plâncton e bentos marinhos. Suas conchas formam extensos depósitos de calcário e são ferramentas essenciais em datação geológica.",
    idade: "🕰️ 550 milhões de anos",
    curiosidade: "🌍 São tão abundantes que suas conchas formam rochas como a calcária. A Grande Pirâmide de Gizé foi construída com blocos contendo trilhões de fósseis de foraminíferos!"
  },
  { 
    level: 11, 
    name: "Radiolária", 
    img: "assets/images/amoeba11.jpg",
    habitat: "Oceanos tropicais e temperados, principalmente em águas profundas e correntes marinhas",
    desc: "Protozoário com esqueleto interno de sílica (SiO₂) formando estruturas geométricas complexas e belas. São componentes importantes do zooplâncton e suas estruturas são verdadeiras obras de arte naturais.",
    idade: "🕰️ 500 milhões de anos",
    curiosidade: "💎 Ernst Haeckel, no século 19, ficou tão fascinado com suas formas que publicou desenhos detalhados que influenciaram a arte e arquitetura da Art Nouveau. Seus esqueletos formam depósitos de 'terra de diatomáceas'."
  },
  { 
    level: 12, 
    name: "Heliozoa", 
    img: "assets/images/amoeba12.jpg",
    habitat: "Águas doces e marinhas em todo o mundo, especialmente em zonas com vegetação aquática",
    desc: "Conhecidas como 'amebas solares' devido aos seus pseudópodes radiais que se assemelham a raios de sol. Os pseudópodes são reforçados por microtúbulos que os mantêm rígidos para capturar presas.",
    idade: "🕰️ 450 milhões de anos",
    curiosidade: "☀️ Seus pseudópodes axopódios contêm microtúbulos organizados em padrões geométricos precisos. Quando uma presa toca os pseudópodes, é instantaneamente imobilizada e digerida."
  },
  { 
    level: 13, 
    name: "Chlamydophrys", 
    img: "assets/images/amoeba13.jpg",
    habitat: "Solos úmidos, musgos e detritos vegetais em florestas temperadas",
    desc: "Ameba que forma colônias complexas onde indivíduos se agregam e coordenam movimentos. Demonstra comportamento social incomum para protozoários, com comunicação química entre células.",
    idade: "🕰️ 400 milhões de anos",
    curiosidade: "👥 Uma das poucas amebas que mostra comportamento social verdadeiro. As colônias podem se mover coordenadamente em busca de alimento, lembrando organismos multicelulares primitivos."
  },
  { 
    level: 14, 
    name: "Paulinella", 
    img: "assets/images/amoeba14.jpg",
    habitat: "Águas marinhas costeiras e estuários em regiões temperadas",
    desc: "Ameba extraordinária que realizou endossimbiose secundária independente, 'roubando' cianobactérias que se tornaram organelas fotossintéticas chamadas cianelas. Evento evolutivo raro e significativo.",
    idade: "🕰️ 350 milhões de anos",
    curiosidade: "🌿 Realizou independentemente o mesmo processo que deu origem aos cloroplastos das plantas! Oferece insights únicos sobre como a célula eucariótica moderna pode ter evoluído."
  },
  { 
    level: 15, 
    name: "Filamoeba", 
    img: "assets/images/amoeba15.jpg",
    habitat: "Solos ricos em matéria orgânica e águas contaminadas com detritos",
    desc: "Ameba que forma pseudópodes filamentosos e ramificados, criando redes complexas para capturar bactérias e partículas orgânicas. Transição entre formas ameboides e fungos.",
    idade: "🕰️ 300 milhões de anos",
    curiosidade: "🕸️ Seus pseudópodes formam redes que podem cobrir vários centímetros quadrados. Representam um 'elo perdido' evolutivo entre protozoários e fungos."
  },
  { 
    level: 16, 
    name: "Vannella", 
    img: "assets/images/amoeba16.jpg",
    habitat: "Águas marinhas e estuarinas em todo o mundo, especialmente em sedimentos",
    desc: "Ameba marinha com formato característico de leque ou coração quando em repouso. Pseudópodes se estendem como uma saia ao redor da célula, criando grande área superficial para alimentação.",
    idade: "🕰️ 250 milhões de anos",
    curiosidade: "🎭 Muda dramaticamente de formato entre as fases de movimento e repouso. Na fase de 'coração', pode flutuar na coluna d'água como plâncton."
  },
  { 
    level: 17, 
    name: "Cochliopodium", 
    img: "assets/images/amoeba17.jpg",
    habitat: "Águas doces e solos úmidos em regiões temperadas",
    desc: "Ameba coberta por escamas orgânicas minúsculas que formam uma carapaça flexível. As escamas são produzidas internamente e montadas na superfície celular como uma armadura.",
    idade: "🕰️ 200 milhões de anos",
    curiosidade: "🛡️ Produz mais de 10 tipos diferentes de escamas, cada uma com formato e composição únicos. A armadura é flexível o suficiente para permitir movimento mas protege contra predadores."
  },
  { 
    level: 18, 
    name: "Mayorella", 
    img: "assets/images/amoeba18.jpg",
    habitat: "Águas doces em todo o mundo, especialmente em lagos e riachos com vegetação",
    desc: "Ameba com pseudópodes largos e achatados que se estendem como ondas. Movimento característico 'em esteira' onde o citoplasma flui continuamente para frente.",
    idade: "🕰️ 150 milhões de anos",
    curiosidade: "🌊 Seu movimento é tão fluido que inspirou modelos matemáticos de fluxo citoplasmático. Pode mudar de direção instantaneamente sem parar o movimento."
  },
  { 
    level: 19, 
    name: "Thecamoeba", 
    img: "assets/images/amoeba19.jpg",
    habitat: "Solos, musgos e águas com baixo nutrientes em regiões temperadas",
    desc: "Ameba com ectoplasma rígido que forma dobras e sulcos característicos. Movimento mais lento que outras amebas, mas com maior resistência a condições ambientais adversas.",
    idade: "🕰️ 100 milhões de anos",
    curiosidade: "📏 Mantém formato consistente devido ao ectoplasma espesso. As dobras na superfície funcionam como 'impressão digital' para identificação de espécies."
  },
  { 
    level: 20, 
    name: "Saccamoeba", 
    img: "assets/images/amoeba20.jpg",
    habitat: "Águas doces ricas em bactérias e solos úmidos mundialmente",
    desc: "Ameba que forma bolsas ou sacos temporários para envolver e digerir presas maiores. Estratégia alimentar intermediária entre fagocitose e digestão externa.",
    idade: "🕰️ 50 milhões de anos",
    curiosidade: "🎒 Cria 'sacos de alimentação' temporários que podem conter várias presas simultaneamente. Representa uma inovação evolutiva na eficiência alimentar entre protozoários."
  }
];

class EnhancedAmoebaLibrary {
  constructor() {
    this.container = document.getElementById('libraryGrid');
    // 🔹 CORREÇÃO: Declarações movidas para dentro do constructor
    this.amoebasUnlocked = JSON.parse(localStorage.getItem("discoveredAmoebas")) || [];
    this.amoebasUnlocked = [...new Set(this.amoebasUnlocked)].sort((a,b) => a-b);
    this.discoveries = JSON.parse(localStorage.getItem("amoebaDiscoveries")) || {};
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
    const unlockedCount = this.amoebasUnlocked.length;
    const totalCount = amoebaLibrary.length;
    const percentage = Math.round((unlockedCount / totalCount) * 100);

    return `
      <div class="library-container library-amoebas">
        ${this.generateHeaderStats(unlockedCount, totalCount, percentage)}
        ${this.generateFilters()}
        <div class="library-grid">
          ${this.generateAmoebaCards()}
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
            <div class="stat-label">Amoebas Descobertas</div>
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
          <input type="text" id="searchAmoebas" placeholder="🔍 Buscar por nome, habitat ou descrição..." 
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

  generateAmoebaCards() {
    const filteredAmoebas = this.getFilteredAmoebas();
    
    return filteredAmoebas.map(amoeba => {
      const isUnlocked = this.amoebasUnlocked.includes(amoeba.level);
      const discoveryDate = this.discoveries[amoeba.level]?.date || "Descoberta recente";
      
      return `
        <div class="creature-card ${isUnlocked ? 'unlocked' : 'locked'}" 
             data-level="${amoeba.level}" 
             data-name="${amoeba.name.toLowerCase()}">
          ${isUnlocked ? this.generateUnlockedCard(amoeba, discoveryDate) : this.generateLockedCard(amoeba)}
        </div>
      `;
    }).join('');
  }

  generateUnlockedCard(amoeba, discoveryDate) {
    return `
      <div class="card-header">
        <div class="creature-level">Nível ${amoeba.level}</div>
        <h3 class="creature-name">${amoeba.name}</h3>
      </div>

      <div class="card-image">
        <img src="${amoeba.img}" alt="${amoeba.name}" 
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
            <span class="info-icon">🌍</span>
            <div class="info-content">
              <strong>Habitat:</strong> ${amoeba.habitat}
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">🕰️</span>
            <div class="info-content">
              <strong>Idade Evolutiva:</strong> ${amoeba.idade}
            </div>
          </div>
        </div>

        <div class="description-section">
          <p class="creature-description">${amoeba.desc}</p>
        </div>

        <div class="curiosity-section">
          <div class="curiosity-header">
            <span class="curiosity-icon">💡</span>
            <strong>Curiosidade Científica</strong>
          </div>
          <p class="curiosity-text">${amoeba.curiosidade}</p>
        </div>
      </div>

      <div class="card-footer">
        <div class="unlock-status">
          <span class="status-icon">✅</span>
          <span class="status-text">Desbloqueada</span>
        </div>
      </div>
    `;
  }

  generateLockedCard(amoeba) {
    return `
      <div class="card-header">
        <div class="creature-level">Nível ${amoeba.level}</div>
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
          <p>Continue sua jornada evolutiva para revelar os segredos desta ameba misteriosa!</p>
          <div class="progress-requirement">
            <span class="requirement-icon">🎯</span>
            <span class="requirement-text">Alcance o nível ${amoeba.level} nas Amoebas</span>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div class="unlock-status locked">
          <span class="status-icon">🔒</span>
          <span class="status-text">A Ser Descoberta</span>
        </div>
      </div>
    `;
  }

  getFilteredAmoebas() {
    let filtered = [...amoebaLibrary];

    // Filtro de busca
    if (this.filters.search) {
      const searchTerm = this.filters.search.toLowerCase();
      filtered = filtered.filter(amoeba =>
        amoeba.name.toLowerCase().includes(searchTerm) ||
        amoeba.habitat.toLowerCase().includes(searchTerm) ||
        amoeba.desc.toLowerCase().includes(searchTerm) ||
        amoeba.curiosidade.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro de desbloqueio
    if (!this.filters.showLocked) {
      filtered = filtered.filter(amoeba => 
        this.amoebasUnlocked.includes(amoeba.level)
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
    const searchInput = document.getElementById('searchAmoebas');
    if (searchInput) {
      // Pesquisa enquanto digita (com debounce para performance)
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.filters.search = e.target.value;
          this.render();
        }, 300); // Delay de 300ms
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
  const library = new EnhancedAmoebaLibrary();
  library.init();
});

// Compatibilidade com outras bibliotecas
if (window.location.href.includes('library-peixes.html')) {
    document.querySelector('h1').textContent = '🐠 Biblioteca dos Peixes';
    document.querySelector('.back-btn').href = 'peixes.html';
}