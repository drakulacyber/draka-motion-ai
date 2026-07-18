@echo off
echo ============================================
echo    DRAKA MOTION AI - Build APK
echo ============================================
echo.

echo [1/3] Building Next.js static export...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo.

echo [2/3] Syncing web assets to Android...
call npx cap sync android
if %ERRORLEVEL% neq 0 (
    echo ERROR: Sync failed!
    pause
    exit /b 1
)
echo.

echo [3/3] Building Android APK...
cd android
call .\gradlew.bat assembleDebug
if %ERRORLEVEL% neq 0 (
    echo ERROR: APK build failed!
    echo.
    echo Pastikan sudah install:
    echo   1. Java JDK 17: https://adoptium.net/temurin/releases/
    echo   2. Android Studio: https://developer.android.com/studio
    echo.
    pause
    exit /b 1
)
cd ..

echo.
echo ============================================
echo    BUILD BERHASIL!
echo ============================================
echo.
echo APK lokasi:
echo   android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Transfer file APK ke HP Android lalu install.
echo.
pause
