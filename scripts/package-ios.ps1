$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskStage = Join-Path $taskRoot 'release/ios-source-0.5.0'
$taskArchive = Join-Path $taskRoot 'release/Amoeba-Evolution-iOS-source-0.5.0.zip'
New-Item -ItemType Directory -Path $taskStage -Force | Out-Null
foreach ($taskName in @('ios','dist','css','docs','tests')) {
    Copy-Item -LiteralPath (Join-Path $taskRoot $taskName) -Destination $taskStage -Recurse -Force
}
foreach ($taskName in @('package.json','package-lock.json','capacitor.config.json','index.html','manifest.webmanifest','README.md','THIRD_PARTY_NOTICES.txt','serve.cjs')) {
    Copy-Item -LiteralPath (Join-Path $taskRoot $taskName) -Destination $taskStage -Force
}
New-Item -ItemType Directory -Path (Join-Path $taskStage 'js'),(Join-Path $taskStage 'assets'),(Join-Path $taskStage 'scripts') -Force | Out-Null
foreach ($taskName in @('content.js','i18n.js','evolution-core.js','achievements.js','storage.js','art.js','audio.js','evolution.js','native-entry.js','native.js')) {
    Copy-Item -LiteralPath (Join-Path $taskRoot "js/$taskName") -Destination (Join-Path $taskStage 'js') -Force
}
foreach ($taskName in @('icon.svg','icon-192.png','icon-512.png','icon-maskable.png')) {
    Copy-Item -LiteralPath (Join-Path $taskRoot "assets/$taskName") -Destination (Join-Path $taskStage 'assets') -Force
}
Copy-Item -LiteralPath (Join-Path $taskRoot 'scripts/build.cjs') -Destination (Join-Path $taskStage 'scripts') -Force
Copy-Item -LiteralPath (Join-Path $taskRoot 'scripts/balance.cjs') -Destination (Join-Path $taskStage 'scripts') -Force
Compress-Archive -Path (Join-Path $taskStage '*') -DestinationPath $taskArchive -Force
Write-Output $taskArchive

