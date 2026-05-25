# Move o projeto BORDERLESS para D:\Projects\499-karen
# Feche o Cursor antes de executar este script.
#
# Uso (PowerShell como Administrador NAO e necessario):
#   .\scripts\migrate-to-d-drive.ps1

$ErrorActionPreference = "Stop"

$source = "C:\Users\Franklyn\Documents\499-karen"
$target = "D:\Projects\499-karen"

if (-not (Test-Path "D:\Projects")) {
  New-Item -ItemType Directory -Force -Path "D:\Projects" | Out-Null
}

if (Test-Path $target) {
  Write-Host "Destino ja existe: $target" -ForegroundColor Yellow
  Write-Host "Remova ou renomeie a pasta antes de continuar."
  exit 1
}

Write-Host "Copiando projeto para $target ..." -ForegroundColor Cyan
Write-Host "Isso pode levar alguns minutos."

robocopy $source $target /E /XD node_modules .git /NFL /NDL /NJH /NJS /nc /ns /np
if ($LASTEXITCODE -ge 8) {
  Write-Host "Erro na copia (codigo $LASTEXITCODE)" -ForegroundColor Red
  exit $LASTEXITCODE
}

Write-Host ""
Write-Host "Copia concluida!" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "  1. Abra o Cursor em: $target"
Write-Host "  2. No terminal do novo workspace, rode:"
Write-Host "       npm install"
Write-Host "       cd mobile; npm install"
Write-Host "  3. Inicie o mobile: npm run dev:mobile"
Write-Host "  4. Depois de confirmar que tudo funciona, apague a pasta antiga em C: para liberar espaco:"
Write-Host "       Remove-Item '$source' -Recurse -Force"
Write-Host ""
