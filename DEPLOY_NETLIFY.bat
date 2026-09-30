@echo off
title DEPLOY MUHAMMAD JABIR JALAL PORTFOLIO TO NETLIFY
color 0C

echo ========================================================
echo   🌸  MUHAMMAD JABIR JALAL PORTFOLIO — NETLIFY DEPLOY
echo ========================================================
echo.
echo Step 1: Building optimized production bundle...
echo.
call npm run build

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo [ERROR] Build failed. Please check errors above.
  pause
  exit /b %ERRORLEVEL%
)

echo.
echo ========================================================
echo   ✅ BUILD READY IN 'dist' FOLDER!
echo ========================================================
echo.
echo Select your deployment method:
echo.
echo [1] Deploy automatically via Netlify CLI (npx netlify deploy --prod)
echo [2] Open 'dist' folder to Drag-and-Drop onto app.netlify.com/drop
echo [3] Exit
echo.
set /p choice="Enter choice (1, 2, or 3): "

if "%choice%"=="1" (
  echo.
  echo Running Netlify CLI deploy...
  call npx --yes netlify-cli deploy --prod --dir=dist
  pause
  exit /b
)

if "%choice%"=="2" (
  echo.
  echo Opening Netlify Drop in browser and opening dist folder...
  start https://app.netlify.com/drop
  explorer dist
  echo.
  echo Simply drag the contents or the 'dist' folder into your browser window!
  pause
  exit /b
)

echo Done.
pause
