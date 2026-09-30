@echo off
title Jabir Jalal - Samurai Portfolio Server
cls
echo ========================================================
echo   JABIR JALAL - SAMURAI PORTFOLIO LOCAL DEPLOYMENT
echo ========================================================
echo.
echo Launching portfolio in your default browser...
start http://localhost:3000
echo.
echo Starting local production server on port 3000...
node server.cjs
pause
