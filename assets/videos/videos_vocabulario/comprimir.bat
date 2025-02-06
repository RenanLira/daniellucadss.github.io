@echo off
mkdir compressos
for %%a in (*.mp4) do (
    ffmpeg -i "%%a" -vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 128k "compressos\%%~na.mp4"
)
pause
