# Сборка образов с явным указанием Dockerfile (обход ограничения podman-compose)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "Building api image..." -ForegroundColor Cyan
podman build -f Dockerfile.api -t calor-craft-api .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Building web image..." -ForegroundColor Cyan
podman build -f Dockerfile.web -t calor-craft-web .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Starting stack..." -ForegroundColor Cyan
podman-compose up