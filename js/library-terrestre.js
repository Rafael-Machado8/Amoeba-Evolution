// library-terrestre.js

// Lista de animais terrestres
const terrestreLibrary = [
  { 
    level: 1, 
    name: "Musaranho-pigmeu", 
    img: "assets/images/animal1.jpg",
    habitat: "Florestas, pastagens e jardins da Europa e Ásia",
    desc: "O menor mamífero do mundo por massa, pesando apenas 1,8-3 gramas. Tem um metabolismo tão acelerado que deve comer o equivalente ao seu peso corporal a cada hora para sobreviver. Seu coração bate até 1.200 vezes por minuto.",
    idade: "🕰️ 45 milhões de anos",
    curiosidade: "💓 Se um musaranho-pigmeu ficar 3 horas sem comer, pode morrer de fome! Eles desenvolvem 'Deckel's fenômeno' - seu crânio e órgãos internos encolhem no inverno para economizar energia."
  },
  { 
    level: 2, 
    name: "Tâmara", 
    img: "assets/images/animal2.jpg",
    habitat: "Desertos e regiões áridas das Américas do Norte e Sul",
    desc: "Roedor especializado em ambientes áridos, com pernas traseiras poderosas para saltos de até 2 metros. Suas orelhas enormes funcionam como radiadores para dissipar calor, e obtém toda a água necessária de sementes e plantas.",
    idade: "🕰️ 40 milhões de anos",
    curiosidade: "🌵 As tâmaras nunca bebem água na natureza! Obtêm hidratação metabolizando carboidratos de sementes. Suas orelhas têm densa vascularização que regula temperatura corporal em desertos escaldantes."
  },
  { 
    level: 3, 
    name: "Heterocefalo", 
    img: "assets/images/animal3.jpg",
    habitat: "Desertos da África Oriental (Etiópia, Somália, Quênia)",
    desc: "Único mamífero eusocial conhecido, vive em colônias como insetos com uma rainha reprodutora. Praticamente não sente dor e é resistente ao câncer. Trabalhadores escavam túneis com dentes especializados.",
    idade: "🕰️ 35 milhões de anos",
    curiosidade: "👑 A rainha pode viver 30 anos - incrível para roedor! Trabalhadores dormem em turnos para manter ventilação nos túneis. São imunes a muitas formas de dor e raramente desenvolvem câncer."
  },
  { 
    level: 4, 
    name: "Lóris-lento", 
    img: "assets/images/animal4.jpg",
    habitat: "Florestas tropicais do Sudeste Asiático",
    desc: "Primata noturno com olhos enormes adaptados à visão noturna. É um dos poucos mamíferos venenosos - secreta toxina das glândulas do braço que, quando misturada com saliva, pode causar choque anafilático em predadores.",
    idade: "🕰️ 30 milhões de anos",
    curiosidade: "☠️ O lóris-lento é venenoso! Lambe glândulas de veneno no braço e sua mordida pode ser fatal para pequenos animais. Movem-se tão devagar que são praticamente imperceptíveis na floresta."
  },
  { 
    level: 5, 
    name: "Pangolim", 
    img: "assets/images/animal5.jpg",
    habitat: "Savanas, florestas e áreas arbustivas da África e Ásia",
    desc: "Único mamífero completamente coberto por escamas de queratina. Quando ameaçado, enrola-se em uma bola impenetrável. Sua língua pode ser maior que seu corpo e é usada para capturar formigas e cupins.",
    idade: "🕰️ 25 milhões de anos",
    curiosidade: "🛡️ O pangolim é o mamífero mais traficado do mundo - mais de 1 milhão foram capturados na última década. Uma única pangolim pode consumir 70 milhões de insetos anualmente, sendo crucial para controle de pragas."
  },
  { 
    level: 6, 
    name: "Tamanduá-bandeira", 
    img: "assets/images/animal6.jpg",
    habitat: "Savanas, florestas e cerrados da América do Sul e Central",
    desc: "Maior espécie de tamanduá, com focinho alongado e língua de 60 cm que pode entrar e sair 160 vezes por minuto. Garras dianteiras poderosas são usadas para abrir formigueiros e se defender.",
    idade: "🕰️ 20 milhões de anos",
    curiosidade: "👅 Sua língua é ancorada no esterno, não na garganta! Consome até 30.000 formigas/ cupins diariamente. As garras são tão fortes que podem quebrar concreto."
  },
  { 
    level: 7, 
    name: "Coala", 
    img: "assets/images/animal7.jpg",
    habitat: "Florestas de eucalipto do leste e sudeste da Austrália",
    desc: "Marsupial especializado que se alimenta quase exclusivamente de folhas de eucalipto. Dorme até 20 horas por dia para conservar energia, já que as folhas são pobres em nutrientes e tóxicas para a maioria dos animais.",
    idade: "🕰️ 15 milhões de anos",
    curiosidade: "🌿 Os coalas têm impressões digitais quase idênticas às humanas! Seu sistema digestório contém bactérias especiais que neutralizam as toxinas do eucalipto."
  },
  { 
    level: 8, 
    name: "Diabo-da-tasmânia", 
    img: "assets/images/animal8.jpg",
    habitat: "Florestas e áreas costeiras da Tasmânia",
    desc: "Maior marsupial carnívoro existente, com mandíbula extremamente poderosa capaz de triturar ossos. Conhecido por seus gritos assustadores e comportamento agressivo durante a alimentação.",
    idade: "🕰️ 10 milhões de anos",
    curiosidade: "😈 Tem a mordida mais poderosa proporcional ao tamanho entre mamíferos! Podem comer 40% de seu peso corporal em 30 minutos. Desenvolvem um câncer facial contagioso que ameaça a espécie."
  },
  { 
    level: 9, 
    name: "Ornitorrinco", 
    img: "assets/images/animal9.jpg",
    habitat: "Rios, lagos e córregos do leste da Austrália e Tasmânia",
    desc: "Mamífero que bota ovos, com bico de pato, cauda de castor e patas palmípedes. Machos possuem esporões venenosos nas patas traseiras. Usa eletrorrecepção para caçar sob a água com os olhos fechados.",
    idade: "🕰️ 8 milhões de anos",
    curiosidade: "🔌 Detecta campos elétricos gerados pelas contrações musculares de presas! Quando foi descoberto, cientistas pensaram que era uma farsa - um animal 'costurado' de várias espécies."
  },
  { 
    level: 10, 
    name: "Suricato", 
    img: "assets/images/animal10.jpg",
    habitat: "Desertos e savanas do sul da África",
    desc: "Pequeno mangusto que vive em grupos sociais complexos de até 50 indivíduos. Desenvolveu sistema de sentinelas onde um indivíduo fica de guarda enquanto outros se alimentam, alertando sobre predadores.",
    idade: "🕰️ 6 milhões de anos",
    curiosidade: "👀 As sentinelas usam vocalizações específicas para diferentes predadores! Filhotes recebem 'aulas' de como manusear presas perigosas como escorpiões venenosos."
  },
  { 
    level: 11, 
    name: "Lêmure", 
    img: "assets/images/animal11.jpg",
    habitat: "Florestas de Madagascar",
    desc: "Primata endêmico de Madagascar com olhos grandes adaptados à vida noturna. Vive em grupos matriarcais onde as fêmeas dominam. Muitas espécies estão criticamente ameaçadas devido ao desmatamento.",
    idade: "🕰️ 5 milhões de anos",
    curiosidade: "💃 Realizam 'danças do sol' sentados de pernas abertas meditando ao nascer do sol. Madagascar abriga 100+ espécies de lêmures encontradas em nenhum outro lugar do mundo."
  },
  { 
    level: 12, 
    name: "Jaguatirica", 
    img: "assets/images/animal12.jpg",
    habitat: "Florestas tropicais, savanas e manguezais das Américas",
    desc: "Gato selvagem de médio porte com pelagem marcada por rosetas e listras características. Excelente escaladora e nadadora, caça desde pequenos roedores até macacos e aves.",
    idade: "🕰️ 4 milhões de anos",
    curiosidade: "🐆 Consegue pular 3 metros verticalmente para capturar aves em pleno voo! Suas rosetas funcionam como impressões digitais - cada padrão é único."
  },
  { 
    level: 13, 
    name: "Lobo-vermelho", 
    img: "assets/images/animal13.jpg",
    habitat: "Florestas, pântanos e áreas costeiras do sudeste dos EUA",
    desc: "Canídeo raro considerado uma das espécies de mamíferos mais ameaçadas da América do Norte. Menor que o lobo-cinzento, com coloração característica vermelha-canela e orelhas proporcionalmente maiores.",
    idade: "🕰️ 3 milhões de anos",
    curiosidade: "🔴 Foi declarado extinto na natureza em 1980, mas programas de reprodução reintroduziram populações! São 'superpais' - machos ajudam ativamente a criar os filhotes."
  },
  { 
    level: 14, 
    name: "Urso-polar", 
    img: "assets/images/animal14.jpg",
    habitat: "Regiões árticas do Círculo Polar Ártico, principalmente no gelo marinho",
    desc: "Maior urso terrestre e superpredador do Ártico. Sua pele é preta (para absorver calor) sob pelagem translúcida que parece branca. Excelente nadador, pode percorrer 100km sem descanso em água gelada.",
    idade: "🕰️ 2 milhões de anos",
    curiosidade: "🎯 Os ursos polares são praticamente invisíveis às câmeras de calor infravermelho! Sua espessa camada de gordura e pelagem isolam tão bem que quase não emitem calor detectável."
  },
  { 
    level: 15, 
    name: "Gorila", 
    img: "assets/images/animal15.jpg",
    habitat: "Florestas tropicais da África Central",
    desc: "Maior primata vivo, com os machos atingindo 1,8m de altura e 200kg. Vive em grupos familiares liderados por um macho dominante (costas prateadas). Compartilha 98% do DNA com humanos.",
    idade: "🕰️ 1.5 milhão de anos",
    curiosidade: "🧠 Os gorilas criam 'camas' de folhas todas as noites! Koko, uma gorila famosa, aprendeu mais de 1.000 sinais de linguagem e entendia 2.000 palavras em inglês."
  },
  { 
    level: 16, 
    name: "Tigre", 
    img: "assets/images/animal16.jpg",
    habitat: "Florestas, savanas e manguezais da Ásia",
    desc: "Maior felino do mundo, com os machos atingindo 3,3m de comprimento e 300kg. Predador de topo solitário com listras únicas que funcionam como camuflagem. Excelente nadador, ao contrário da maioria dos felinos.",
    idade: "🕰️ 1 milhão de anos",
    curiosidade: "🐅 Cada tigre tem padrão de listras único - como impressão digital! Podem imitar os chamados de outros animais para atrair presas. Um único tigre precisa de 50-60 cervos por ano."
  },
  { 
    level: 17, 
    name: "Leão", 
    img: "assets/images/animal17.jpg",
    habitat: "Savanas e pastagens da África Subsaariana e pequena população na Índia",
    desc: "Único felino verdadeiramente social, vive em grupos chamados pride (alcateias). Machos são reconhecíveis pela juba, que escurece com a idade e indica saúde aos possíveis parceiros.",
    idade: "🕰️ 800 mil anos",
    curiosidade: "🦁 As leoas fazem 90% da caça do grupo! Os rugidos podem ser ouvidos a 8km de distância. Um leão pode dormir até 20 horas por dia."
  },
  { 
    level: 18, 
    name: "Elefante-africano", 
    img: "assets/images/animal18.jpg",
    habitat: "Savanas, florestas e desertos da África Subsaariana",
    desc: "Maior animal terrestre vivo, com os machos atingindo 4m de altura e 10 toneladas. Possui a maior massa encefálica terrestre, memória excepcional e complexas estruturas sociais. Sua tromba tem ~40.000 músculos.",
    idade: "🕰️ 700 mil anos",
    curiosidade: "🧠 Elefantes se reconhecem no espelho, choram seus mortos e têm rituais de luto. Comunicam-se por infrassons que viajam 10km através do solo. Suas presas são dentes incisivos alongados que crescem continuamente."
  },
  { 
    level: 19, 
    name: "Rinoceronte", 
    img: "assets/images/animal19.jpg",
    habitat: "Savanas, florestas e zonas úmidas da África e Ásia",
    desc: "Herbívoro pesado com pele espessa que funciona como armadura natural. Seu 'chifre' é feito de queratina (o mesmo material das unhas humanas). Possui visão fraca mas olfato e audição excelentes.",
    idade: "🕰️ 500 mil anos",
    curiosidade: "🦏 O chifre do rinoceronte não está ligado ao crânio - é feito de pelos compactados! São os 'jardineiros da savana' - controlam o crescimento de plantas lenhosas, mantendo o equilíbrio do ecossistema."
  },
  { 
    level: 20, 
    name: "Hipopótamo", 
    img: "assets/images/animal20.jpg",
    habitat: "Rios, lagos e pântanos da África Subsaariana",
    desc: "Terceiro maior mamífero terrestre, passando a maior parte do dia na água para se manter fresco. Surpreendentemente ágil na água, pode correr no fundo dos rios. Considerado o animal mais perigoso da África para humanos.",
    idade: "🕰️ 300 mil anos",
    curiosidade: "💦 Sua 'transpiração' é vermelha e funciona como protetor solar e antibiótico! Podem fechar narinas e ouvidos para ficar submersos por 5 minutos. Matam mais humanos na África que leões, elefantes e búfalos juntos."
  }
];

class EnhancedTerrestreLibrary {
  constructor() {
    this.container = document.getElementById('libraryGrid');
    this.terrestreUnlocked = JSON.parse(localStorage.getItem("discoveredTerrestre")) || [];
    this.terrestreUnlocked = [...new Set(this.terrestreUnlocked)].sort((a,b) => a-b);
    this.discoveries = JSON.parse(localStorage.getItem("terrestreDiscoveries")) || {};
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
    const unlockedCount = this.terrestreUnlocked.length;
    const totalCount = terrestreLibrary.length;
    const percentage = Math.round((unlockedCount / totalCount) * 100);

    return `
      <div class="library-container library-terrestre">
        ${this.generateHeaderStats(unlockedCount, totalCount, percentage)}
        ${this.generateFilters()}
        <div class="library-grid">
          ${this.generateAnimalCards()}
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
            <div class="stat-label">Animais Descobertos</div>
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
          <input type="text" id="searchTerrestre" placeholder="🔍 Buscar por nome, habitat ou descrição..." 
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
                  data-filter="unlocked">Apenas Desbloqueados</button>
        </div>
      </div>
    `;
  }

  generateAnimalCards() {
    const filteredAnimais = this.getFilteredAnimais();
    
    return filteredAnimais.map(animal => {
      const isUnlocked = this.terrestreUnlocked.includes(animal.level);
      const discoveryDate = this.discoveries[animal.level]?.date || "Descoberta recente";
      
      return `
        <div class="creature-card ${isUnlocked ? 'unlocked' : 'locked'}" 
             data-level="${animal.level}" 
             data-name="${animal.name.toLowerCase()}">
          ${isUnlocked ? this.generateUnlockedCard(animal, discoveryDate) : this.generateLockedCard(animal)}
        </div>
      `;
    }).join('');
  }

  generateUnlockedCard(animal, discoveryDate) {
    return `
      <div class="card-header">
        <div class="creature-level">Nível ${animal.level}</div>
        <h3 class="creature-name">${animal.name}</h3>
      </div>

      <div class="card-image">
        <img src="${animal.img}" alt="${animal.name}" 
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
            <span class="info-icon">🌳</span>
            <div class="info-content">
              <strong>Habitat:</strong> ${animal.habitat}
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">🕰️</span>
            <div class="info-content">
              <strong>Idade Evolutiva:</strong> ${animal.idade}
            </div>
          </div>
        </div>

        <div class="description-section">
          <p class="creature-description">${animal.desc}</p>
        </div>

        <div class="curiosity-section">
          <div class="curiosity-header">
            <span class="curiosity-icon">💡</span>
            <strong>Curiosidade Científica</strong>
          </div>
          <p class="curiosity-text">${animal.curiosidade}</p>
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

  generateLockedCard(animal) {
    return `
      <div class="card-header">
        <div class="creature-level">Nível ${animal.level}</div>
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
          <p>Continue sua jornada evolutiva para revelar os segredos deste animal misterioso!</p>
          <div class="progress-requirement">
            <span class="requirement-icon">🎯</span>
            <span class="requirement-text">Alcance o nível ${animal.level} no Terrestre</span>
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

  getFilteredAnimais() {
    let filtered = [...terrestreLibrary];

    // Filtro de busca
    if (this.filters.search) {
      const searchTerm = this.filters.search.toLowerCase();
      filtered = filtered.filter(animal =>
        animal.name.toLowerCase().includes(searchTerm) ||
        animal.habitat.toLowerCase().includes(searchTerm) ||
        animal.desc.toLowerCase().includes(searchTerm) ||
        animal.curiosidade.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro de desbloqueio
    if (!this.filters.showLocked) {
      filtered = filtered.filter(animal => 
        this.terrestreUnlocked.includes(animal.level)
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
    const searchInput = document.getElementById('searchTerrestre');
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
  const library = new EnhancedTerrestreLibrary();
  library.init();
});