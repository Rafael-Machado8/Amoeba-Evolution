# Amoeba Evolution · 0.5.0

Jogo de fusão e exploração em oito habitats, da primeira célula ao cosmos. 160 formas, cinco tarefas por habitat, 100 conquistas e novos ciclos. Interface em Português e English, mouse, toque, teclado e controle básico. Arte e áudio procedurais, sem anúncios ou compras.

## Jogar

Execute `npm start` e abra http://127.0.0.1:4173. O menu inicial oferece continuar, novo jogo, opções, ajuda e idioma. No Windows, abra `release/0.5.0/Amoeba Evolution-win32-x64/Amoeba Evolution.exe` mantendo os arquivos da pasta.

Arraste formas iguais ou toque em duas para combiná-las. Cada evolução muda a aparência: silhuetas, cílios, núcleos, nadadeiras, tentáculos, folhas, asas, anéis e estruturas cósmicas variam com o nível. Fusões têm aproximação, deformação, nascimento, partículas e som.

Teclado: setas selecionam, Enter combina, C cultiva, Q pulsa, Esc pausa. Controle: direcional seleciona, A combina, X cultiva, Y pulsa e Start pausa. Movimento reduzido está nas opções. Controle físico e aplicativos móveis ainda precisam de testes em hardware real.

## Progressão

A produção começa em 0,8 energia/s e cresce pela raiz quadrada da massa viva. Para abrir outro habitat, alcance a descoberta indicada e pague a viagem com energia daquele habitat. Os custos sobem a cada etapa.

Criaturas antigas continuam úteis: selecione uma para cultivar um par do seu nível. A cada terceiro nascimento automático, um nível antigo sem par tem prioridade. Combos de cinco aceleram o cultivo, centelhas recarregam o pulso e três adaptações favorecem combos, produção ou nascimentos.

Ganhos fora do jogo: 10% da produção por até duas horas. Menus pausam a partida. Ao terminar o oitavo habitat, um novo ciclo preserva a coleção e concede +15% de produção.

## Conquistas na versão 0.5.0

Abra **Jornada → Pequenas grandes conquistas** para consultar as 100 metas, filtrar por habitat ou estado e acompanhar o progresso. A platina exige as outras 99, sem cheats. Os desafios incluem 10.000 fusões, dez ciclos, todas as descobertas e uma criatura viva de nível 20 em cada habitat no mesmo ciclo.

As conquistas antigas são preservadas. A partir desta versão, fusões, pulsos, centelhas e recordes acumulados também sobrevivem aos próximos ciclos e reinícios de habitat. Dados de ciclos antigos que não foram registrados não podem ser recuperados. Laboratórios e criaturas vivas exigem progresso no mesmo ciclo.

## Cheats

Digite durante a partida ou abra **Opções → Códigos de experimento** no celular:

| Código | Efeito |
| --- | --- |
| HESOYAM / VITALIS | +1.000 energia |
| ORBITA | Abre e visita o próximo habitat |
| EVOLUIR | Evolui uma criatura em um nível |
| PULSAR | Carrega o pulso |

Cheats marcam a jornada e desativam novas conquistas nela. Novo jogo inicia uma jornada sem a marca.

## Desenvolvimento

Node.js 22+. Instale com `npm ci`. Teste com `npm test`, simule a economia com `npm run balance`, gere a web com `npm run build` e o Windows com `npm run package:windows`. Use `npm run android:sync` / `npm run ios:sync` para sincronizar os projetos nativos.

Android requer JDK 21 e SDK 36. iOS requer Mac e Xcode 26+. Instruções, assinatura e pendências estão em [docs/RELEASE.md](docs/RELEASE.md). O pacote iOS de fontes não é um IPA instalável.

## Save e distribuição

A chave atual é `amoeba-evolution-v4`, com backup separado. Saves v2/v3 e formatos originais são migrados sem apagar as chaves anteriores. Saldos e mundos já abertos são preservados; use Novo jogo para experimentar o balanceamento desde o início. Exporte JSON antes de trocar de dispositivo.

O build usa uma lista explícita de arquivos; imagens e scripts antigos não entram na aplicação distribuída. Páginas antigas abrem a mesma aplicação e o save determina o habitat ao continuar. Avisos de terceiros ficam em `THIRD_PARTY_NOTICES.txt`; o pacote Windows também mantém as licenças do Electron/Chromium.

35 testes automatizados passaram, além dos fluxos de navegador em tamanho de computador/celular. As simulações terminaram a campanha em aproximadamente 48 e 71 minutos; não substituem sessões com jogadores. Os projetos Android/iOS estão preparados, mas não há APK/AAB/IPA assinado ou aprovação de loja. Esta versão é uma candidata a testes.



