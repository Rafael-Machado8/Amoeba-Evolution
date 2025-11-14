// library-ceu.js

// Lista de aves com nomes e imagens
const ceuLibrary = [
  { 
    level: 1, 
    name: "Beija-flor-abelha", 
    img: "assets/images/ave1.jpg",
    habitat: "Florestas, bosques e jardins de Cuba",
    desc: "A menor ave do mundo, medindo 5-6 cm e pesando 1,6-2 gramas (menos que uma moeda de 1 centavo). Seus ovos são do tamanho de uma ervilha. Bate asas 80 vezes por segundo, consumindo enormes quantias de energia que exigem visitar ~1.500 flores diariamente.",
    idade: "🕰️ 1 milhão de anos",
    curiosidade: "🍯 É o único pássaro capaz de voar para trás e de cabeça para baixo! Seu metabolismo é tão rápido que entra em estado de torpor noturno para não morrer de fome enquanto dorme."
  },
  { 
    level: 2, 
    name: "Andorinhão-preto", 
    img: "assets/images/ave2.jpg",
    habitat: "Todo o mundo, exceto regiões polares extremas",
    desc: "Ave que passa até 10 meses consecutivos no ar sem pousar. Alimenta-se, acasala e até dorme durante o voo planado. Suas asas longas e corpo aerodinâmico são otimizados para vida aérea permanente, pousando apenas para nidificar.",
    idade: "🕰️ 50 milhões de anos",
    curiosidade: "✈️ Podem voar mais de 500 km diariamente e atingir 112 km/h. Estudos com monitores mostraram que alguns indivíduos voam continuamente por 10 meses, percorrendo distâncias equivalentes à ida e volta à Lua durante sua vida!"
  },
  { 
    level: 3, 
    name: "Beija-flor-cauda-de-andorinha", 
    img: "assets/images/ave3.jpg",
    habitat: "Florestas de nuvens dos Andes (Venezuela ao Peru)",
    desc: "Beija-flor com cauda extraordinariamente longa que pode exceder o comprimento do corpo. As penas da cauda são usadas em rituais de acasalamento complexos, criando sons especiais durante voos de exibição.",
    idade: "🕰️ 5 milhões de anos",
    curiosidade: "💃 Os machos realizam 'shows aéreos' com loops e mergulhos, criando sons com penas da cauda para impressionar fêmeas. As penas caudais podem medir até 15 cm - mais que o dobro do corpo!"
  },
  { 
    level: 4, 
    name: "Pica-pau-anão", 
    img: "assets/images/ave4.jpg",
    habitat: "Florestas úmidas da América do Sul",
    desc: "Menor pica-pau do mundo (7-8 cm). Tamborila em troncos com bico minúsculo, alimentando-se de pequenos insetos e larvas. Cava ninhos em galhos finos que outras espécies não conseguem utilizar.",
    idade: "🕰️ 10 milhões de anos",
    curiosidade: "🥁 Seu tamborilamento é tão suave que humanos raramente o ouvem! Criam ninhos em galhos de apenas 2 cm de diâmetro - uma proeza de engenharia aviária."
  },
  { 
    level: 5, 
    name: "Corvo-da-nova-caledônia", 
    img: "assets/images/ave5.jpg",
    habitat: "Florestas densas da Nova Caledônia (Pacífico Sul)",
    desc: "Considerada a ave mais inteligente do mundo, demonstra capacidades cognitivas comparáveis a primatas superiores. Fabrica e usa ferramentas complexas - cria ganchos de galhos, usa folhas como serras e compreende causalidade em problemas.",
    idade: "🕰️ 2 milhões de anos",
    curiosidade: "🧠 Em experimentos, estes corvos resolveram quebra-cabeças de 8 etapas sequenciais, planejaram tarefas futuras e ensinaram técnicas de fabricação de ferramentas para seus filhotes - comportamento antes considerado exclusivamente humano."
  },
  { 
    level: 6, 
    name: "Arara-azul", 
    img: "assets/images/ave6.jpg",
    habitat: "Florestas e cerrados do Brasil, Bolívia e Paraguai",
    desc: "Maior papagaio do mundo, atingindo 1 metro de comprimento. Vive em casais monogâmicos que permanecem juntos por toda a vida. Alimenta-se principalmente de cocos de palmeiras, quebrando-os com seu bico extremamente forte.",
    idade: "🕰️ 5 milhões de anos",
    curiosidade: "💙 Podem viver até 50 anos na natureza! Sua língua é seca e escamosa, perfeita para manipular alimentos duros. São tão inteligentes que conseguem resolver problemas complexos para obter comida."
  },
  { 
    level: 7, 
    name: "Falcão-peregrino", 
    img: "assets/images/ave7.jpg",
    habitat: "Todo o mundo, exceto Antártida - prefere áreas abertas e penhascos",
    desc: "Animal mais rápido do planeta, atingindo 389 km/h durante mergulhos de caça. Suas narinas têm cones que direcionam o ar, permitindo respirar durante mergulhos supersônicos. Visão 8x melhor que humana.",
    idade: "🕰️ 8 milhões de anos",
    curiosidade: "⚡ Durante mergulhos, suas narinas especiais reduzem a pressão do ar em 90%! Podem detectar uma pomba a 8 km de distância. Foram usados na Segunda Guerra Mundial para interceptar pombos-correio."
  },
  { 
    level: 8, 
    name: "Coruja-das-neves", 
    img: "assets/images/ave8.jpg",
    habitat: "Tundra ártica da América do Norte, Europa e Ásia",
    desc: "Uma das maiores corujas, adaptada à vida no Ártico. Plumagem branca proporciona camuflagem perfeita na neve. Caça durante dia e noite, aproveitando o sol da meia-noite no verão ártico.",
    idade: "🕰️ 3 milhões de anos",
    curiosidade: "🦉 São nômades - seguem as populações de lemming (sua presa principal). Podem girar a cabeça 270 graus! Suas penas são tão macias que o voo é completamente silencioso."
  },
  { 
    level: 9, 
    name: "Águia-real", 
    img: "assets/images/ave9.jpg",
    habitat: "Montanhas, penhascos e áreas abertas do Hemisfério Norte",
    desc: "Uma das maiores aves de rapina, com envergadura de 2,3m. Predadora de topo com visão 8x mais aguçada que humana, capaz de detectar uma lebre a 3km de distância. Forma casais permanentes que defendem territórios extensos.",
    idade: "🕰️ 2 milhões de anos",
    curiosidade: "👁️ Suas retinas têm 1 milhão de cones por mm² (humanos: 200.000). Podem mergulhar a 320 km/h! Ninhos (aeries) são usados por gerações - um no Ohio media 2,5m de diâmetro e pesava 2 toneladas após 34 anos de uso."
  },
  { 
    level: 10, 
    name: "Condor-californiano", 
    img: "assets/images/ave10.jpg",
    habitat: "Montanhas e cânions da Califórnia, Arizona e Utah",
    desc: "Maior ave terrestre da América do Norte, com envergadura de 3m. Urubu especializado em carniça de grandes animais. Foi salvo da extinção por um programa de reprodução em cativeiro que reintroduziu a espécie.",
    idade: "🕰️ 10 milhões de anos",
    curiosidade: "💀 Podem voar 250 km em um dia em busca de carniça! Sua cabeça careca evita que penas acumulem bactérias de cadáveres em decomposição. Foram reduzidos a apenas 22 indivíduos em 1982 antes do programa de recuperação."
  },
  { 
    level: 11, 
    name: "Cegonha-branca", 
    img: "assets/images/ave11.jpg",
    habitat: "Pântanos, pastagens e áreas agrícolas da Europa, Ásia e África",
    desc: "Ave migratória conhecida por seus ninhos grandes em estruturas humanas. Realiza uma das migrações mais longas entre aves, voando da Europa para a África Subsaariana. Simboliza o nascimento de bebês no folclore europeu.",
    idade: "🕰️ 15 milhões de anos",
    curiosidade: "👶 O mito de que cegonhas trazem bebês surgiu porque migram no verão - época de nascimentos humanos! Podem voar 400 km sem parar cruzando o Mediterrâneo. Seus ninhos podem pesar até 500 kg."
  },
  { 
    level: 12, 
    name: "Pelicano", 
    img: "assets/images/ave12.jpg",
    habitat: "Lagos, rios e costas marinhas em todos os continentes exceto Antártida",
    desc: "Ave aquática com bolsa no bico que pode armazenar até 11 litros de água e peixes. Caça em grupo, formando semicírculos para encurralar cardumes. O esqueleto é extremamente leve - apenas 10% do peso corporal.",
    idade: "🕰️ 30 milhões de anos",
    curiosidade: "🎒 A bolsa não é usada para armazenar comida, mas como rede de pesca! Grupos coordenam ataques batendo asas na água para dirigir peixes para águas rasas. Podem consumir 1,5 kg de peixe por dia."
  },
  { 
    level: 13, 
    name: "Albatroz-errante", 
    img: "assets/images/ave13.jpg",
    habitat: "Oceanos do Hemisfério Sul, desde a Antártida até trópicos",
    desc: "Ave com maior envergadura do mundo (até 3,5m). Passa 85% da vida sobre o oceano, planando por horas sem bater asas usando correntes de ar dinâmicas. Pode circunnavegar a Antártida em 46 dias e viver mais de 50 anos.",
    idade: "🕰️ 20 milhões de anos",
    curiosidade: "🌪️ Usam uma técnica chamada 'dynamic soaring' - aproveitam gradientes de vento sobre ondas para voar quase sem gastar energia. Um único albatroz já foi registrado voando 6.000 km em 12 dias sem tocar terra ou água!"
  },
  { 
    level: 14, 
    name: "Pinguim-imperador", 
    img: "assets/images/ave14.jpg",
    habitat: "Gelo marinho da Antártida",
    desc: "Maior pinguim, adaptado às condições mais extremas da Terra. Machos incubam os ovos durante o inverno antártico, suportando temperaturas de -60°C e ventos de 200 km/h sem comer por 115 dias.",
    idade: "🕰️ 40 milhões de anos",
    curiosidade: "🐧 Os machos formam 'creches' compactas onde se revezam na borda (mais fria) e centro (mais quente). Podem mergulhar a 500m de profundidade e segurar a respiração por 20 minutos! A temperatura no centro das creches pode ser 30°C mais alta que o exterior."
  },
  { 
    level: 15, 
    name: "Avestruz", 
    img: "assets/images/ave15.jpg",
    habitat: "Savanas e desertos da África",
    desc: "Maior ave viva, incapaz de voar mas excelente corredora. Atinge 70 km/h com passadas de 5m. Possui o maior olho de qualquer animal terrestre (5cm de diâmetro) e pés com apenas 2 dedos - adaptação única para corrida.",
    idade: "🕰️ 25 milhões de anos",
    curiosidade: "🥚 Seus ovos são os maiores do mundo (1,4kg) e a casca é tão resistente que um humano adulto pode pisar nela sem quebrar. Avestruzes engolem pedras (até 1kg) para ajudar na digestão - prática chamada de gastrólito."
  },
  { 
    level: 16, 
    name: "Ema", 
    img: "assets/images/ave16.jpg",
    habitat: "Campos, savanas e cerrados da América do Sul",
    desc: "Maior ave das Américas e segunda maior do mundo. Excelente corredora, atingindo 50 km/h. Possui três dedos (diferente da avestruz com dois) e asas vestigiais usadas para equilíbrio durante corridas.",
    idade: "🕰️ 15 milhões de anos",
    curiosidade: "👨‍🍼 Os machos são pais dedicados - incubam os ovos por 40 dias e cuidam dos filhotes por 6 meses! Durante o acasalamento, fêmeas brigam ferozmente pelos machos - comportamento raro no reino animal."
  },
  { 
    level: 17, 
    name: "Casuar", 
    img: "assets/images/ave17.jpg",
    habitat: "Florestas tropicais da Nova Guiné e nordeste da Austrália",
    desc: "Considerada a ave mais perigosa do mundo, com garras de 12 cm que podem abrir um humano com um único golpe. O 'capacete' na cabeça é feito de queratina e ajuda a navegar pela densa vegetação.",
    idade: "🕰️ 10 milhões de anos",
    curiosidade: "⚔️ Suas garras são tão letais que foram usadas como pontas de lança por nativos! Podem pular 1,5m verticalmente e correr a 50 km/h através de florestas densas. São extremamente territoriais e atacam sem aviso."
  },
  { 
    level: 18, 
    name: "Kiwi", 
    img: "assets/images/ave18.jpg",
    habitat: "Florestas da Nova Zelândia",
    desc: "Ave noturna incapaz de voar, com narinas na ponta do bico (única ave com esta característica). Põe o maior ovo em relação ao tamanho corporal - até 20% do peso da fêmea. Possui ossos com medula como mamíferos.",
    idade: "🕰️ 8 milhões de anos",
    curiosidade: "👃 Tem o melhor olfato entre aves - consegue detectar minhocas a 10cm sob o solo! Os ossos pesados permitem que caminhe silenciosamente. São tão icônicos que neozelandeses são chamados de 'Kiwis'."
  },
  { 
    level: 19, 
    name: "Kakapo", 
    img: "assets/images/ave19.jpg",
    habitat: "Florestas da Nova Zelândia",
    desc: "Maior papagaio do mundo incapaz de voar e o único noturno. Criticamente ameaçado, com apenas ~200 indivíduos restantes. Emite chamados de acasalamento de baixa frequência que viajam até 5 km.",
    idade: "🕰️ 5 milhões de anos",
    curiosidade: "🦜 Pode viver mais de 90 anos - um dos vertebrados mais longevos! Os machos inflam como balões para amplificar seus chamados de acasalamento. São tão raros que cada indivíduo tem nome próprio."
  },
  { 
    level: 20, 
    name: "Dodô", 
    img: "assets/images/ave20.jpg",
    habitat: "Ilhas Maurício (extinto)",
    desc: "Ave não voadora que evoluiu sem predadores naturais nas Ilhas Maurício. Desapareceu menos de 100 anos após a chegada humana devido à caça e introdução de espécies invasoras. Símbolo da extinção causada pelo homem.",
    idade: "🕰️ 4 milhões de anos",
    curiosidade: "💀 O último avistamento confirmado foi em 1662! Tinha medo zero de humanos, facilitando sua caça. A árvore tambalacoque quase foi extinta junto - suas sementes só germinavam após passar pelo sistema digestório do dodô."
  }
];

class EnhancedCeuLibrary {
  constructor() {
    this.container = document.getElementById('libraryGrid');
    this.ceuUnlocked = JSON.parse(localStorage.getItem("discoveredCeu")) || [];
    this.ceuUnlocked = [...new Set(this.ceuUnlocked)].sort((a,b) => a-b);
    this.discoveries = JSON.parse(localStorage.getItem("ceuDiscoveries")) || {};
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
    const unlockedCount = this.ceuUnlocked.length;
    const totalCount = ceuLibrary.length;
    const percentage = Math.round((unlockedCount / totalCount) * 100);

    return `
      <div class="library-container library-ceu">
        ${this.generateHeaderStats(unlockedCount, totalCount, percentage)}
        ${this.generateFilters()}
        <div class="library-grid">
          ${this.generateAveCards()}
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
            <div class="stat-label">Aves Descobertas</div>
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
          <input type="text" id="searchCeu" placeholder="🔍 Buscar por nome, habitat ou descrição..." 
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

  generateAveCards() {
    const filteredAves = this.getFilteredAves();
    
    return filteredAves.map(ave => {
      const isUnlocked = this.ceuUnlocked.includes(ave.level);
      const discoveryDate = this.discoveries[ave.level]?.date || "Descoberta recente";
      
      return `
        <div class="creature-card ${isUnlocked ? 'unlocked' : 'locked'}" 
             data-level="${ave.level}" 
             data-name="${ave.name.toLowerCase()}">
          ${isUnlocked ? this.generateUnlockedCard(ave, discoveryDate) : this.generateLockedCard(ave)}
        </div>
      `;
    }).join('');
  }

  generateUnlockedCard(ave, discoveryDate) {
    return `
      <div class="card-header">
        <div class="creature-level">Nível ${ave.level}</div>
        <h3 class="creature-name">${ave.name}</h3>
      </div>

      <div class="card-image">
        <img src="${ave.img}" alt="${ave.name}" 
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
            <span class="info-icon">🌤️</span>
            <div class="info-content">
              <strong>Habitat:</strong> ${ave.habitat}
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">🕰️</span>
            <div class="info-content">
              <strong>Idade Evolutiva:</strong> ${ave.idade}
            </div>
          </div>
        </div>

        <div class="description-section">
          <p class="creature-description">${ave.desc}</p>
        </div>

        <div class="curiosity-section">
          <div class="curiosity-header">
            <span class="curiosity-icon">💡</span>
            <strong>Curiosidade Científica</strong>
          </div>
          <p class="curiosity-text">${ave.curiosidade}</p>
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

  generateLockedCard(ave) {
    return `
      <div class="card-header">
        <div class="creature-level">Nível ${ave.level}</div>
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
          <p>Continue sua jornada evolutiva para revelar os segredos desta ave misteriosa!</p>
          <div class="progress-requirement">
            <span class="requirement-icon">🎯</span>
            <span class="requirement-text">Alcance o nível ${ave.level} no Céu</span>
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

  getFilteredAves() {
    let filtered = [...ceuLibrary];

    // Filtro de busca
    if (this.filters.search) {
      const searchTerm = this.filters.search.toLowerCase();
      filtered = filtered.filter(ave =>
        ave.name.toLowerCase().includes(searchTerm) ||
        ave.habitat.toLowerCase().includes(searchTerm) ||
        ave.desc.toLowerCase().includes(searchTerm) ||
        ave.curiosidade.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro de desbloqueio
    if (!this.filters.showLocked) {
      filtered = filtered.filter(ave => 
        this.ceuUnlocked.includes(ave.level)
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
    const searchInput = document.getElementById('searchCeu');
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
  const library = new EnhancedCeuLibrary();
  library.init();
});