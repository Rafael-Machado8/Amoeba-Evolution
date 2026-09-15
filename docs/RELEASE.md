# Entrega 0.5.0

## Arquivos

- `dist/`: aplicação web offline com cache versionado e licenças.
- `release/0.5.0/Amoeba Evolution-win32-x64/`: aplicativo Windows portátil. Executar `Amoeba Evolution.exe` mantendo todos os arquivos da pasta.
- `android/`: projeto Android, API 36, minSdk 24, versão 0.5.0 / código 5.
- `ios/App/App.xcodeproj`: projeto iOS com Swift Package Manager, iOS 15+, versão 0.5.0 / build 5.
- `release/Amoeba-Evolution-iOS-source-0.5.0.zip`: projeto iOS e fontes web para abrir em um Mac. **Não é um IPA instalável.**

## O que foi validado

35 testes cobrem fusões, compras, limites, migração de saves, viagens pagas, reposição de pares antigos, adaptações, eventos, cheats e PT/EN. A campanha completou os oito habitats nas duas simulações de ritmo, em aproximadamente 48 e 71 minutos. Os números não substituem testes com jogadores.

No navegador foram exercitados novo jogo, continuar, tutorial, fusão, cheats por sequência e campo de texto, cultura avançada, compra de par antigo, bloqueio/pagamento de viagem, chegada e persistência de idioma. A interface foi verificada em tela de computador e a 390 × 844, sem rolagem horizontal. Nenhum erro de console foi observado no fluxo testado. Isso não equivale a teste em aparelhos reais.

Projetos Android/iOS sincronizados. Auditoria npm após inclusão do iOS reportou zero vulnerabilidades. Pacote Windows gerado; ainda exige teste em máquina limpa e assinatura opcional Authenticode.

## Android

Este computador tinha Java 8 e não tinha Android SDK. Não foi possível compilar APK/AAB. Instalar JDK 21 e Android Studio/SDK 36; configurar JAVA_HOME e o SDK pelo Android Studio.

```sh
npm ci
npm run android:sync
cd android
./gradlew assembleDebug
./gradlew bundleRelease
```

No Windows usar `gradlew.bat`. Para assinar release, definir no ambiente `AMOEBA_KEYSTORE` (caminho absoluto), `AMOEBA_STORE_PASSWORD`, `AMOEBA_KEY_ALIAS` e `AMOEBA_KEY_PASSWORD`. Sem essas variáveis o release não recebe assinatura. O proprietário deve criar e guardar a chave de upload; não versionar certificados/senhas.

Confirmar `com.amoebaevolution.game` antes do primeiro envio. Testar toque/arraste, rotação, botão Voltar, barras do sistema, áudio, retomada e exportação/importação de save em aparelho real. Gerar AAB assinado, configurar Play App Signing, ficha, classificação e teste interno antes de publicar.

## iOS — gerar a build instalável

O projeto foi preparado no Windows. **Um IPA exige Mac com Xcode 26+ e a equipe Apple do proprietário.** Não há IPA assinado nem teste no simulador iOS nesta entrega.

No Mac, extrair o pacote de fontes e executar:

```sh
npm ci
npm run ios:sync
npm run ios:open
```

No Xcode, selecionar a equipe em Signing & Capabilities, confirmar Bundle ID e resolver os pacotes. Executar em simulador e dispositivo; depois usar Product → Archive e validar o archive antes do envio ao TestFlight/App Store.

O projeto usa SPM e abre por `ios/App/App.xcodeproj`. O manifesto `PrivacyInfo.xcprivacy` está incluído no target e declara C617.1 conforme a orientação do plugin Filesystem. Revisar o relatório de privacidade agregado do archive final. Testar áreas seguras, orientação, interrupções de áudio, retomada, Arquivos e compartilhamento do save.

## Windows e Steam

```sh
npm ci
npm test
npm run package:windows
```

Distribuir a pasta completa, incluindo licenças Electron/Chromium. Não há Steamworks, Steam Cloud ou conquistas Steam; saves e conquistas são locais. Não anunciar essas integrações como prontas.

Antes da publicação: testar o executável em máquina limpa, controle físico, áudio, resolução e sessões longas; configurar app/depot e materiais da loja, classificação, preço e revisão. Nada foi enviado a lojas e nenhuma conta/certificado foi inventado.

## Pendências de lançamento

Fazer sessões com jogadores para avaliar compreensão das fusões, variedade, espera por energia e conforto das animações. Preparar screenshots reais, trailer, cápsulas/banners, suporte e identificação do publicador. Conferir a política de privacidade da versão efetivamente enviada. Esta é uma versão para testes, não uma garantia de ausência de defeitos.

Referências oficiais: [Capacitor iOS](https://capacitorjs.com/docs/ios), [ambiente Capacitor](https://capacitorjs.com/docs/getting-started/environment-setup), [API Google Play](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en), [revisão Steam](https://partner.steamgames.com/doc/store/review_process).



