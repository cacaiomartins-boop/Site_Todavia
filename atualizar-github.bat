@echo off
cd /d "%~dp0"

if not exist ".git" (
    echo Primeira vez: configurando o Git nesta pasta...
    git init
    git remote add origin https://github.com/cacaiomartins-boop/Site_Todavia.git
    git branch -M main
    git config user.email "cacaio.martins@gmail.com"
    git config user.name "Caio"
    git add -A
    git commit -m "Atualizacao via Claude"
    git push -u origin main --force
    goto fim
)

echo Enviando atualizacoes para o GitHub...
git add -A
git commit -m "Atualizacao via Claude"
git push

:fim
echo.
echo Concluido. Esta janela fecha sozinha.
timeout /t 4 >nul
