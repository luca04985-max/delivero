# Percorso dell'eseguibile (Verificato per la tua utenza luca0)
$emulatorExe = "C:\Users\luca0\AppData\Local\Android\Sdk\emulator\emulator.exe"

# I tuoi 3 emulatori
$emus = @("Pixel_5", "Pixel_5_Manager", "Pixel_5_Rider")

Write-Host "🚀 Avvio del laboratorio Android (3 schermi)..." -ForegroundColor Cyan

foreach ($emu in $emus) {
    Write-Host "Inizializzazione: $emu..." -ForegroundColor Yellow
    # Avvia in background senza bloccare il terminale
    Start-Process $emulatorExe -ArgumentList "-avd $emu -netdelay none -netspeed full"
}

Write-Host "✅ Tutti gli emulatori sono in fase di avvio." -ForegroundColor Green
Write-Host "⏳ Attendi che siano accesi, poi lancia 'npx expo start' nel terminale." -ForegroundColor White