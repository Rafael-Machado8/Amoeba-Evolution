# Amoeba Evolution

Jogo de fusão e descoberta em quatro habitats. Interface em português, controles por mouse, toque e teclado, áudio opcional e progresso local.

## Jogar localmente

Com Node.js instalado, execute `node serve.cjs` nesta pasta e abra http://127.0.0.1:4173. Nenhuma dependência ou instalação adicional é necessária.

Combine duas criaturas do mesmo nível. Elas produzem energia para cultivar novas formas e melhorar o laboratório. O nível 8 libera o habitat seguinte; cada habitat tem 20 formas e comporta 32 criaturas.

## Verificação

Execute `node --test tests/evolution.test.cjs` e `node --check js/evolution.js`.

## Organização

As oito páginas utilizam `js/evolution.js`, `js/evolution-core.js` e `css/evolution.css`. Os scripts e estilos antigos permanecem como referência e não são carregados. As páginas de biblioteca abrem a coleção do habitat correspondente, respeitando os desbloqueios.

O save atual usa a chave `amoeba-evolution-v2`. Na primeira execução, importa criaturas, energia e descobertas dos saves antigos sem apagar suas chaves. As opções permitem exportar e importar JSON. Sem acesso ao armazenamento, a interface avisa que é necessário exportar. A simulação pausa em janelas e em segundo plano; não há ganhos offline.

## Antes de publicar

Esta versão é uma base web jogável, não um pacote pronto para Steam ou Play Store. Ainda precisam ser feitos testes em aparelhos reais, avaliação de ritmo com jogadores, revisão de autoria/licença das imagens herdadas da coleção, ícones e materiais de loja, empacotamento e integração com a plataforma escolhida. As criaturas do tabuleiro são desenhos procedurais; a coleção mantém as imagens anteriores. A progressão é ficcional e não pretende ensinar uma sequência científica de evolução.
